# 🎬 Netflix-like Streaming Platform

A **full-stack streaming platform** inspired by Netflix, built with **ASP.NET Core Web API** and **Angular**, supporting video streaming, user subscriptions, and a powerful admin panel.

---

## 🌟 Key Features

### 👤 User Features
- 🔐 Secure Authentication & Authorization (JWT)
- 🎞️ Video Streaming with category-based filtering
- 💳 Subscription Plans: Basic, Standard, Premium
- 📺 Watchlists, Profiles, and Personalized Experience
- ⭐ Reviews & Ratings system for videos
- 🤖 AI-powered Chat Support

### 🛠️ Admin Features
- 📂 Category Management (CRUD, search, filter, statistics)
- 🚫 Review Moderation (view, delete, flag content)
- 🧾 Subscription Management (actions + metrics)
- 📊 Analytics Dashboard (users, revenue, churn)
- 👥 User Management

---

## 🧱 Tech Stack

### 🔧 Backend (ASP.NET Core 8.0)
- ASP.NET Core Web API
- Entity Framework Core + SQL Server
- ASP.NET Identity + JWT Auth
- AutoMapper
- Repository Pattern + Unit of Work
- Swagger / OpenAPI

### 💻 Frontend (Angular 20.0)
- Angular with TypeScript
- Bootstrap 5.3 + TailwindCSS
- RxJS for reactive programming
- Chart.js for analytics visualization
- Bootstrap Icons

---

## ⚙️ Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 18+](https://nodejs.org/)
- [SQL Server (LocalDB or Full)](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- [Visual Studio 2022](https://visualstudio.microsoft.com/) or [VS Code](https://code.visualstudio.com/)

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Lil-3omda/Netflix
cd Netflix

```

### 2. Setup Backend (API)
```bash

cd Netflix.API/Netflix.API
dotnet restore

# Update connection string in appsettings.json:
# "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=NetflixDB;Trusted_Connection=true"

dotnet ef database update
dotnet run
```
- Runs on: https://localhost:7140

### 3. Setup Frontend (Angular)
```bash
cd Netflix
npm install
npm start
```
- Runs on: http://localhost:4200

---
## 🔗 Access the App
- 🖥️ Frontend: http://localhost:4200

- 🔌 API: https://localhost:7140

- 📃 Swagger UI: https://localhost:7140/swagger

---
## ⚙️ Configuration
Backend (appsettings.json)
```bash
"ConnectionStrings": {
  "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=NetflixDB;Trusted_Connection=true"
},
"JWT": {
  "Secret": "your-super-secret-key-here-at-least-32-characters",
  "Issuer": "NetflixAPI",
  "Audience": "NetflixApp",
  "ExpirationInDays": 7
}
```

## Frontend (src/environments/environment.ts)
```bash
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7140/api'
};
```
---

## 📊 Admin Dashboard Highlights
### ✅ Categories
Full CRUD operations

Real-time search & filtering

Video count + status indicators


### ✅ Movies
Full CRUD operations

Real-time search & filtering

Statistics endpoint


### ✅ Subscriptions
Complete user subscription table

Plan details, expiration status

Admin actions: Extend, Cancel

Revenue + churn metrics

---

## 🗂️ Project Structure
```bash
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
```
---
## 🔐 Authentication & Roles
- JWT-based authentication

- Admin Role: Full access to all features

- User Role: Access to streaming & subscriptions

- Role-based token validation and expiration handling

---
---
## 📄 License
- This project is licensed under the MIT License. See the LICENSE file for more information.
