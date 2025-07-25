using Microsoft.EntityFrameworkCore;
using Netflix.API.Data;
using Netflix.API.DTOs.ChatDtos;
using Netflix.API.Services.Interfaces;
using System.Text;
using System.Text.Json;

namespace Netflix.API.Services
{
    public class AiService : IAiService
    {
        private readonly HttpClient _httpClient;
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AiService> _logger;

        public AiService(HttpClient httpClient, ApplicationDbContext context, IConfiguration configuration, ILogger<AiService> logger)
        {
            _httpClient = httpClient;
            _context = context;
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<string> GenerateResponseAsync(string userMessage, List<ChatMessageDto> conversationHistory, string? userContext = null)
        {
            try
            {
                var apiKey = _configuration["OpenAI:ApiKey"];
                var model = _configuration["OpenAI:Model"] ?? "gpt-3.5-turbo";

                _httpClient.DefaultRequestHeaders.Clear();
                _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");

                var messages = new List<object>
                {
                    new
                    {
                        role = "system",
                        content = GetSystemPrompt(userContext)
                    }
                };

                // Add conversation history (last 10 messages)
                foreach (var msg in conversationHistory.TakeLast(10))
                {
                    messages.Add(new
                    {
                        role = msg.Role.ToLower(),
                        content = msg.Content
                    });
                }

                // Add current user message
                messages.Add(new
                {
                    role = "user",
                    content = userMessage
                });

                var requestBody = new
                {
                    model = model,
                    messages = messages,
                    max_tokens = 500,
                    temperature = 0.7
                };

                var json = JsonSerializer.Serialize(requestBody);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync("https://api.openai.com/v1/chat/completions", content);
                
                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogError($"OpenAI API error: {response.StatusCode} - {await response.Content.ReadAsStringAsync()}");
                    return "I'm sorry, I'm having trouble processing your request right now. Please try again later.";
                }

                var responseJson = await response.Content.ReadAsStringAsync();
                var openAiResponse = JsonSerializer.Deserialize<OpenAiResponse>(responseJson);

                return openAiResponse?.choices?.FirstOrDefault()?.message?.content ?? 
                       "I'm sorry, I couldn't generate a response. Please try again.";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating AI response");
                return "I'm experiencing technical difficulties. Please try again later.";
            }
        }

        public async Task<List<MovieRecommendation>> GenerateMovieRecommendationsAsync(string userId, string userMessage)
        {
            try
            {
                var watchHistoryAnalysis = await AnalyzeWatchHistoryAsync(userId);
                var topMovies = await GetTopRatedMoviesByUserPreferencesAsync(userId);

                var prompt = $@"
                Based on the user's watch history analysis: {watchHistoryAnalysis}

                User message: {userMessage}

                Available top-rated movies: {JsonSerializer.Serialize(topMovies)}

                Please recommend 3-5 movies from the available list that best match the user's preferences. 
                For each recommendation, provide a brief reason why it matches their taste.
                Respond in JSON format:
                {{
                  ""recommendations"": [
                    {{
                      ""movieId"": 1,
                      ""reason"": ""explanation""
                    }}
                  ]
                }}";

                var aiResponse = await GenerateResponseAsync(prompt, new List<ChatMessageDto>(), "movie_recommendation");
                
                return ParseMovieRecommendations(aiResponse, topMovies);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating movie recommendations");
                return new List<MovieRecommendation>();
            }
        }

        public async Task<string> AnalyzeWatchHistoryAsync(string userId)
        {
            try
            {
                var watchHistory = await _context.WatchHistories
                    .Include(wh => wh.Video)
                    .ThenInclude(v => v.Category)
                    .Include(wh => wh.Video)
                    .ThenInclude(v => v.Ratings)
                    .Where(wh => wh.Profile.UserId == userId)
                    .OrderByDescending(wh => wh.WatchedAt)
                    .Take(50)
                    .ToListAsync();

                if (!watchHistory.Any())
                {
                    return "User has no watch history. Recommend popular movies across different genres.";
                }

                var categoryStats = watchHistory
                    .GroupBy(wh => wh.Video.Category.Name)
                    .Select(g => new
                    {
                        Category = g.Key,
                        Count = g.Count(),
                        AverageRating = g.Average(wh => wh.Video.Ratings.Any() ? wh.Video.Ratings.Average(r => r.Stars) : 0)
                    })
                    .OrderByDescending(cs => cs.Count)
                    .ToList();

                var topCategory = categoryStats.FirstOrDefault();
                var recentMovies = watchHistory.Take(10).Select(wh => wh.Video.Title).ToList();

                return $@"
                User's top category: {topCategory?.Category} ({topCategory?.Count} movies watched)
                Recent movies: {string.Join(", ", recentMovies)}
                Category preferences: {string.Join(", ", categoryStats.Take(3).Select(cs => $"{cs.Category} ({cs.Count})"))}
                Average rating preference: {categoryStats.Average(cs => cs.AverageRating):F1}/5
                ";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error analyzing watch history for user {UserId}", userId);
                return "Unable to analyze watch history. Recommend popular movies.";
            }
        }

        private async Task<List<dynamic>> GetTopRatedMoviesByUserPreferencesAsync(string userId)
        {
            var userCategories = await _context.WatchHistories
                .Include(wh => wh.Video)
                .ThenInclude(v => v.Category)
                .Where(wh => wh.Profile.UserId == userId)
                .Select(wh => wh.Video.Category.Name)
                .Distinct()
                .ToListAsync();

            var query = _context.Videos
                .Include(v => v.Category)
                .Include(v => v.Ratings)
                .Where(v => !v.IsDeleted);

            if (userCategories.Any())
            {
                query = query.Where(v => userCategories.Contains(v.Category.Name));
            }

            var movies = await query
                .Select(v => new
                {
                    v.Id,
                    v.Title,
                    v.Description,
                    v.ImageUrl,
                    Category = v.Category.Name,
                    Rating = v.Ratings.Any() ? v.Ratings.Average(r => r.Stars) : 0,
                    RatingCount = v.Ratings.Count()
                })
                .Where(m => m.RatingCount >= 3) // Only movies with at least 3 ratings
                .OrderByDescending(m => m.Rating)
                .ThenByDescending(m => m.RatingCount)
                .Take(20)
                .ToListAsync();

            return movies.Cast<dynamic>().ToList();
        }

        private List<MovieRecommendation> ParseMovieRecommendations(string aiResponse, List<dynamic> availableMovies)
        {
            try
            {
                var jsonResponse = JsonSerializer.Deserialize<JsonElement>(aiResponse);
                var recommendations = new List<MovieRecommendation>();

                if (jsonResponse.TryGetProperty("recommendations", out var recsArray))
                {
                    foreach (var rec in recsArray.EnumerateArray())
                    {
                        if (rec.TryGetProperty("movieId", out var movieIdElement) &&
                            rec.TryGetProperty("reason", out var reasonElement))
                        {
                            var movieId = movieIdElement.GetInt32();
                            var reason = reasonElement.GetString();

                            var movie = availableMovies.FirstOrDefault(m => m.Id == movieId);
                            if (movie != null)
                            {
                                recommendations.Add(new MovieRecommendation
                                {
                                    Id = movie.Id,
                                    Title = movie.Title,
                                    Description = movie.Description,
                                    ImageUrl = movie.ImageUrl,
                                    Rating = movie.Rating,
                                    Category = movie.Category,
                                    Reason = reason ?? "Recommended based on your preferences"
                                });
                            }
                        }
                    }
                }

                // Fallback: if parsing fails, return top 3 movies
                if (!recommendations.Any())
                {
                    recommendations = availableMovies.Take(3).Select(m => new MovieRecommendation
                    {
                        Id = m.Id,
                        Title = m.Title,
                        Description = m.Description,
                        ImageUrl = m.ImageUrl,
                        Rating = m.Rating,
                        Category = m.Category,
                        Reason = "Highly rated movie that matches your viewing preferences"
                    }).ToList();
                }

                return recommendations;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error parsing movie recommendations");
                return new List<MovieRecommendation>();
            }
        }

        private string GetSystemPrompt(string? context = null)
        {
            var basePrompt = @"
                You are a helpful Netflix customer support assistant. You can help users with:
                - Account and billing questions
                - Technical issues with streaming
                - Content recommendations
                - General Netflix features

                Be friendly, concise, and helpful. If you don't know something, admit it and suggest contacting human support.
                ";

            if (context == "movie_recommendation")
            {
                basePrompt += @"
                    You are specifically helping with movie recommendations. Analyze the provided data and suggest movies that match the user's viewing patterns and preferences.
                    ";
            }

            return basePrompt;
        }

        // OpenAI API response models
        private class OpenAiResponse
        {
            public Choice[]? choices { get; set; }
        }

        private class Choice
        {
            public Message? message { get; set; }
        }

        private class Message
        {
            public string? content { get; set; }
        }
    }
}