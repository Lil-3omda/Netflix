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
                var apiKey = _configuration["HuggingFace:ApiKey"];
                var model = _configuration["HuggingFace:Model"];
                var baseUrl = _configuration["HuggingFace:BaseUrl"] ?? "https://router.huggingface.co/v1/chat/completions";

                _httpClient.DefaultRequestHeaders.Clear();
                _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");

                var messages = new List<object>();

                // Optional: Add system prompt
                var systemPrompt = GetSystemPrompt(userContext);
                if (!string.IsNullOrWhiteSpace(systemPrompt))
                {
                    messages.Add(new
                    {
                        role = "system",
                        content = systemPrompt
                    });
                }

                // Add previous conversation (last 10 messages)
                foreach (var msg in conversationHistory.TakeLast(10))
                {
                    messages.Add(new
                    {
                        role = msg.Role.ToLower(), // "user" or "assistant"
                        content = msg.Content
                    });
                }

                // Add current message
                messages.Add(new
                {
                    role = "user",
                    content = userMessage
                });

                var payload = new
                {
                    model = model,
                    messages = messages,
                    stream = false
                };

                var content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync(baseUrl, content);

                var responseText = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogError("Hugging Face API error {Status}: {Body}", response.StatusCode, responseText);
                    return "I'm sorry, I'm having trouble processing your request right now.";
                }

                var json = JsonDocument.Parse(responseText);
                var reply = json.RootElement
                                .GetProperty("choices")[0]
                                .GetProperty("message")
                                .GetProperty("content")
                                .GetString();

                return reply?.Trim() ?? "No response generated.";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error using Hugging Face Chat API");
                return "Internal error while talking to the AI model.";
            }
        }



        //public async Task<string> GenerateResponseAsync(string userMessage, List<ChatMessageDto> conversationHistory, string? userContext = null)
        //{
        //    try
        //    {
        //        var apiKey = _configuration["HuggingFace:ApiKey"];
        //        var model = _configuration["HuggingFace:Model"];

        //        _httpClient.DefaultRequestHeaders.Clear();
        //        _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");

        //        var inputPrompt = new StringBuilder();

        //        inputPrompt.AppendLine(GetSystemPrompt(userContext));
        //        inputPrompt.AppendLine();

        //        // Add chat history
        //        foreach (var msg in conversationHistory.TakeLast(10))
        //        {
        //            inputPrompt.AppendLine($"{msg.Role}: {msg.Content}");
        //        }

        //        inputPrompt.AppendLine($"User: {userMessage}");
        //        inputPrompt.AppendLine("Assistant:");

        //        var body = JsonSerializer.Serialize(new { inputs = inputPrompt.ToString() });
        //        var content = new StringContent(body, Encoding.UTF8, "application/json");

        //        var response = await _httpClient.PostAsync($"https://api-inference.huggingface.co/models/{model}", content);

        //        if (!response.IsSuccessStatusCode)
        //        {
        //            _logger.LogError("Hugging Face error: {0} - {1}", response.StatusCode, await response.Content.ReadAsStringAsync());
        //            return "I'm sorry, I'm having trouble processing your request right now.";
        //        }

        //        var responseText = await response.Content.ReadAsStringAsync();

        //        using var doc = JsonDocument.Parse(responseText);
        //        var result = doc.RootElement[0].GetProperty("generated_text").GetString();

        //        // Extract response after "Assistant:" if needed
        //        var reply = result?.Split("Assistant:").LastOrDefault()?.Trim();
        //        return string.IsNullOrEmpty(reply) ? "No response generated." : reply;
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError(ex, "Error using Hugging Face API");
        //        return "Internal error while talking to the AI model.";
        //    }
        //}


        //public async Task<string> GenerateResponseAsync(string userMessage, List<ChatMessageDto> conversationHistory, string? userContext = null)
        //{
        //    try
        //    {
        //        var apiKey = _configuration["OpenAI:ApiKey"];
        //        var model = _configuration["OpenAI:Model"] ?? "gpt-3.5-turbo";

        //        _httpClient.DefaultRequestHeaders.Clear();
        //        _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");

        //        var messages = new List<object>
        //        {
        //            new
        //            {
        //                role = "system",
        //                content = GetSystemPrompt(userContext)
        //            }
        //        };

        //        // Add conversation history (last 10 messages)
        //        foreach (var msg in conversationHistory.TakeLast(10))
        //        {
        //            messages.Add(new
        //            {
        //                role = msg.Role.ToLower(),
        //                content = msg.Content
        //            });
        //        }

        //        // Add current user message
        //        messages.Add(new
        //        {
        //            role = "user",
        //            content = userMessage
        //        });

        //        var requestBody = new
        //        {
        //            model = model,
        //            messages = messages,
        //            max_tokens = 500,
        //            temperature = 0.7
        //        };

        //        var json = JsonSerializer.Serialize(requestBody);
        //        var content = new StringContent(json, Encoding.UTF8, "application/json");

        //        //var response = await _httpClient.PostAsync("https://api.openai.com/v1/chat/completions", content);
        //        var response = await _httpClient.PostAsync(
        //            "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct",
        //            content);

        //        if (!response.IsSuccessStatusCode)
        //        {
        //            _logger.LogError($"OpenAI API error: {response.StatusCode} - {await response.Content.ReadAsStringAsync()}");
        //            return "I'm sorry, I'm having trouble processing your request right now. Please try again later.";
        //        }

        //        var responseJson = await response.Content.ReadAsStringAsync();
        //        var openAiResponse = JsonSerializer.Deserialize<OpenAiResponse>(responseJson);

        //        return openAiResponse?.choices?.FirstOrDefault()?.message?.content ?? 
        //               "I'm sorry, I couldn't generate a response. Please try again.";
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError(ex, "Error generating AI response");
        //        return "I'm experiencing technical difficulties. Please try again later.";
        //    }
        //}

        public async Task<List<MovieRecommendation>> GenerateMovieRecommendationsAsync(string userId, string userMessage)
        {
            try
            {
                var watchHistoryAnalysis = await AnalyzeWatchHistoryAsync(userId);
                var topMovies = await GetTopRatedMoviesByUserPreferencesAsync(userId);

                // Log intermediate data for debugging
                _logger.LogInformation($"Watch history analysis: {watchHistoryAnalysis}");
                _logger.LogInformation($"Top movies found: {topMovies.Count}");

                if (!topMovies.Any())
                {
                    _logger.LogWarning("No movies available for recommendations");
                    return new List<MovieRecommendation>();
                }

                var prompt = $@"
        USER PREFERENCES ANALYSIS:
        {watchHistoryAnalysis}

        USER REQUEST:
        {userMessage}

        AVAILABLE MOVIES (ordered by relevance):
        {JsonSerializer.Serialize(topMovies.Select(m => new {
                    m.Id,
                    m.Title,
                    m.Category,
                    Views = m.TotalViews,
                    IsFavorite = m.IsFavorite
                }), new JsonSerializerOptions { WriteIndented = true })}

        INSTRUCTIONS:
        1. Select 3-5 movies from AVAILABLE MOVIES that best match the user's preferences
        2. For each recommendation, include:
           - movieId: The ID from AVAILABLE MOVIES
           - reason: Brief explanation why it matches their taste
        3. Format response as valid JSON with 'recommendations' array

        EXAMPLE RESPONSE:
        {{
          ""recommendations"": [
            {{
              ""movieId"": 123,
              ""reason"": ""You've watched similar movies in this category""
            }}
          ]
        }}

        YOUR RECOMMENDATIONS:";

                var aiResponse = await GenerateResponseAsync(prompt, new List<ChatMessageDto>(), "movie_recommendation");

                _logger.LogInformation($"AI Response: {aiResponse}");

                var recommendations = ParseMovieRecommendations(aiResponse, topMovies);

                if (!recommendations.Any())
                {
                    _logger.LogWarning("No recommendations could be parsed from AI response");
                    // Return popular fallback if parsing fails
                    return GetPopularFallbackRecommendations(topMovies);
                }

                return recommendations;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating movie recommendations");
                return new List<MovieRecommendation>();
            }
        }

        private List<MovieRecommendation> GetPopularFallbackRecommendations(List<dynamic> availableMovies)
        {
            return availableMovies
                .OrderByDescending(m => m.IsFavorite)
                .ThenByDescending(m => m.TotalViews)
                .Take(3)
                .Select(m => new MovieRecommendation
                {
                    Id = m.Id,
                    Title = m.Title,
                    Description = m.Description,
                    ImageUrl = m.ImageUrl,
                    Category = m.Category,
                    Reason = m.IsFavorite ?
                        "You've marked this as a favorite" :
                        $"Popular in {m.Category} category ({m.TotalViews} views)"
                }).ToList();
        }
        public async Task<string> AnalyzeWatchHistoryAsync(string userId)
        {
            try
            {
                var watchHistory = await _context.WatchHistories
                    .Include(wh => wh.Video)
                    .ThenInclude(v => v.Category)
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
                        LastWatched = g.Max(wh => wh.WatchedAt)
                    })
                    .OrderByDescending(cs => cs.Count)
                    .ThenByDescending(cs => cs.LastWatched)
                    .ToList();

                var topCategories = string.Join(", ", categoryStats.Take(3).Select(cs => $"{cs.Category} ({cs.Count} views)"));
                var recentMovies = watchHistory.Take(5).Select(wh => wh.Video.Title).ToList();

                return $@"
                    User's top categories: {topCategories}
                    Recently watched: {string.Join(", ", recentMovies)}
                    Total movies watched: {watchHistory.Count}
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
                    v.CoverUrl,
                    Category = v.Category.Name,
                    TotalViews = v.TotalView,
                    IsFavorite = v.Favorites.Any(f => f.Profile.UserId == userId)
                })
                .OrderByDescending(m => m.IsFavorite) 
                .ThenByDescending(m => m.TotalViews) 
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

                if (!recommendations.Any() && availableMovies.Any())
                {
                    recommendations = availableMovies
                        .OrderByDescending(m => m.IsFavorite)
                        .ThenByDescending(m => m.TotalViews)
                        .Take(3)
                        .Select(m => new MovieRecommendation
                        {
                            Id = m.Id,
                            Title = m.Title,
                            Description = m.Description,
                            ImageUrl = m.ImageUrl,
                            Category = m.Category,
                            Reason = m.IsFavorite ?
                                "You've marked this as a favorite" :
                                $"Popular in {m.Category} category ({m.TotalViews} views)"
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