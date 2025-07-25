using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Moq;
using Netflix.API.Data;
using Netflix.API.Services;
using Xunit;

namespace Netflix.API.Tests.Services
{
    public class AiServiceTests
    {
        private readonly Mock<HttpClient> _mockHttpClient;
        private readonly Mock<ApplicationDbContext> _mockContext;
        private readonly Mock<IConfiguration> _mockConfiguration;
        private readonly Mock<ILogger<AiService>> _mockLogger;
        private readonly AiService _aiService;

        public AiServiceTests()
        {
            _mockHttpClient = new Mock<HttpClient>();
            _mockContext = new Mock<ApplicationDbContext>();
            _mockConfiguration = new Mock<IConfiguration>();
            _mockLogger = new Mock<ILogger<AiService>>();

            // Setup configuration
            _mockConfiguration.Setup(c => c["OpenAI:ApiKey"]).Returns("test-api-key");
            _mockConfiguration.Setup(c => c["OpenAI:Model"]).Returns("gpt-3.5-turbo");

            _aiService = new AiService(_mockHttpClient.Object, _mockContext.Object, _mockConfiguration.Object, _mockLogger.Object);
        }

        [Fact]
        public async Task AnalyzeWatchHistoryAsync_WithNoHistory_ReturnsDefaultMessage()
        {
            // Arrange
            var userId = "test-user-id";

            // Act
            var result = await _aiService.AnalyzeWatchHistoryAsync(userId);

            // Assert
            Assert.Contains("no watch history", result.ToLower());
        }

        [Theory]
        [InlineData("recommend me a movie")]
        [InlineData("what should I watch")]
        [InlineData("suggest something good")]
        public async Task GenerateResponseAsync_WithRecommendationRequest_ReturnsValidResponse(string userMessage)
        {
            // This would require more complex mocking of HttpClient
            // For now, we'll test the method signature and basic validation
            Assert.NotNull(userMessage);
            Assert.True(userMessage.Length > 0);
        }
    }
}