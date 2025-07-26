# Netflix

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.4.

## AI Chatbot System

This Netflix clone includes a complete AI-powered chatbot system with the following features:

### Backend Features (ASP.NET Core)
- **OpenAI Integration**: Uses GPT-3.5-turbo for intelligent responses
- **Conversation Persistence**: Stores all chat conversations and messages in SQL Server
- **Movie Recommendations**: AI analyzes user watch history to suggest personalized content
- **Rate Limiting**: Prevents API abuse with built-in .NET 8 rate limiting
- **JWT Authentication**: Secure access to chat endpoints
- **Comprehensive Logging**: Tracks AI usage, token consumption, and errors

### Frontend Features (Angular)
- **Global Chatbot**: Floating AI assistant available on all pages (except login/signup/admin)
- **Conversation History**: Users can view and resume previous chat sessions
- **Movie Recommendations**: Visual movie cards with AI-generated reasons
- **Real-time Typing Indicators**: Shows when AI is processing
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Netflix-style UI**: Consistent with the overall app design

### Setup Instructions

1. **Configure OpenAI API Key**:
   - Add your OpenAI API key to `appsettings.json` in the `OpenAI:ApiKey` section
   - The key is already configured in the provided code

2. **Run Database Migration**:
   ```bash
   cd Netflix.API
   dotnet ef database update
   ```

3. **Start the Backend**:
   ```bash
   cd Netflix.API/Netflix.API
   dotnet run
   ```

4. **Start the Frontend**:
   ```bash
   cd Netflix
   npm install
   npm start
   ```

### API Endpoints
- `POST /api/chat/message` - Send message to AI chatbot
- `POST /api/chat/recommend` - Get personalized movie recommendations
- `GET /api/chat/conversations` - Get user's chat history
- `GET /api/chat/conversations/{id}` - Get specific conversation
- `POST /api/chat/conversations` - Create new conversation

### Rate Limiting
- 10 requests per minute per user for chat endpoints
- Queue limit of 5 pending requests
- Automatic 429 responses when limits exceeded

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
