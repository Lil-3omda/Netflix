🎬 Netflix-like Streaming Platform
A full-stack streaming platform inspired by Netflix, built with ASP.NET Core Web API and Angular, supporting video streaming, user subscriptions, and a comprehensive admin panel.

🌟 Key Features
👤 User Features
Secure Authentication & Authorization using JWT

Video Streaming with category-based filtering

Subscription Plans: Basic, Standard, Premium

Watchlists, Profiles, and Personalized Experience

Reviews & Ratings system for videos

AI-powered Chat Support

🛠️ Admin Features
Category Management: Full CRUD, search, filter, and statistics

Review Moderation: View, delete, and flag inappropriate content

Subscription Management: Admin actions + metrics

Analytics Dashboard: User statistics and revenue tracking

User Management: View and manage all registered users

🧱 Tech Stack
Backend (ASP.NET Core 8.0)
ASP.NET Core Web API

Entity Framework Core + SQL Server

ASP.NET Identity + JWT Auth

AutoMapper

Repository Pattern + Unit of Work

Swagger / OpenAPI

Frontend (Angular 20.0)
Angular with TypeScript

Bootstrap 5.3

RxJS (reactive programming)

Chart.js for charts and analytics


⚙️ Prerequisites
.NET 8 SDK

Node.js 18+

SQL Server (LocalDB or Full)

Visual Studio 2022 or VS Code

🚀 Getting Started
1. Clone the Repository

git clone (https://github.com/Lil-3omda/Netflix)


2. Setup Backend (API)
bash
Copy
Edit
cd Netflix.API/Netflix.API
dotnet restore

# Update connection string in appsettings.json:
# "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=NetflixDB;Trusted_Connection=true"

dotnet ef database update
dotnet run  # Runs on https://localhost:7140
3. Setup Frontend (Angular)
bash
Copy
Edit
cd Netflix
npm install
npm start  # Runs on http://localhost:4200
4. Access the Application
🔗 Frontend: http://localhost:4200

🔗 API: https://localhost:7140

🔗 Swagger UI: https://localhost:7140/swagger

⚙️ Configuration
Backend (appsettings.json)
json
Copy
Edit
"ConnectionStrings": {
  "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=NetflixDB;Trusted_Connection=true"
},
"JWT": {
  "Secret": "your-super-secret-key-here-at-least-32-characters",
  "Issuer": "NetflixAPI",
  "Audience": "NetflixApp",
  "ExpirationInDays": 7
}
Frontend (src/environments/environment.ts)
ts
Copy
Edit
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7140/api'
};
📊 Admin Dashboard Highlights
✅ Categories
Full CRUD + search/filter

Video count & status badges

Statistics endpoint

✅ Reviews
Paginated table with full review info

Includes video titles, user data, star ratings

Content moderation + flagged content detection

✅ Subscriptions
Full user subscription table

Plan details, status, and expiration dates

Admin actions: extend, cancel

Revenue and churn analytics

🗂️ Project Structure Overview
bash
Copy
Edit
├── Netflix.API/                 # ASP.NET Core Web API
│   ├── Controllers/
│   ├── Data/
│   ├── DTOs/
│   ├── Models/
│   ├── Repositories/
│   ├── Services/
│   ├── Mappings/
│   └── Program.cs
│
├── Netflix/                    # Angular App
│   ├── src/app/
│   │   ├── admin/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   └── models/
│   │   ├── core/
│   │   ├── shared/
│   │   └── features/
│   └── src/environments/
│
└── TECHNICAL_DOCUMENTATION.md
🔐 Authentication & Roles
JWT Authentication

Admin Role: Full access to admin panel

User Role: Access to video streaming, subscriptions

Role-based access with token validation and expiration

🔐 You can register a new admin account and manually assign the "Admin" role to get started.

📡 API Endpoints Overview
Categories
GET /api/admin/Categories

POST /api/admin/Categories

PUT /api/admin/Categories/{id}

DELETE /api/admin/Categories/{id}

GET /api/admin/Categories/statistics

Reviews
GET /api/admin/Reviews

DELETE /api/admin/Reviews/{id}

GET /api/admin/Reviews/statistics

GET /api/admin/Reviews/flagged

Subscriptions
GET /api/admin/Subscriptions/users

GET /api/admin/Subscriptions/statistics

POST /api/admin/Subscriptions/users/{userId}/extend

POST /api/admin/Subscriptions/users/{userId}/cancel



📄 License
This project is licensed under the MIT License. See the LICENSE file for details.



Contact the dev team directly

✨ Built with passion using ASP.NET Core and Angular
