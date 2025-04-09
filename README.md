# Flavor Exchange

Flavor Exchange is a modern recipe-sharing platform built with [Next.js](https://nextjs.org/), bootstrapped using `create-next-app`. It allows users to explore, create, and manage recipes while fostering a community of food enthusiasts.

The app leverages **GitHub OAuth** for authentication, **Tailwind CSS** for a sleek UI, and the **Context API** for state management.  
Deployed on Vercel at 👉 [flavor-exchange.vercel.app](https://flavor-exchange.vercel.app), it’s designed to be fast, responsive, and user-friendly.

---

## 🌟 Core Features

### 1. Recipe Feed
- **Dynamic Grid/List** of recipes fetched from a mock API or backend.
- Each card includes:
  - Title
  - Cooking Time
  - Rating (1–5 stars)
  - Image thumbnail
- **Live Search**: Filter by title or ingredients in real-time.

### 2. Recipe Details Page
- Click a card to view the dedicated page.
- Displays:
  - Ingredients
  - Instructions
  - Save to Favorites

### 3. User Authentication
- Auth via **GitHub OAuth** using NextAuth.js.
- Features:
  - Secure login/logout
  - Personalized sessions tied to GitHub

### 4. CRUD for Recipes
- **Create**: Add recipes (title, ingredients, instructions, image URL).
- **Read**: View all or user-specific recipes.
- **Update**: Edit own recipes.
- **Delete**: Remove recipes.

### 5. Favorites System
- Save or unsave recipes to a personal list.
- Access all favorites via a dedicated endpoint.

---

## ⚙️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Context API
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 📢 API Documentation

Explore all endpoints via Postman:  
📬 **[Flavor Exchange Postman Docs](https://documenter.getpostman.com/view/26831435/2sB2cX91gb)**

### Endpoints:

#### Recipes
- `GET /api/recipes` – Fetch all recipes  
- `GET /api/recipes/[id]` – Get recipe details  
- `POST /api/recipes` – Create a new recipe  
- `PUT /api/recipes/[id]` – Update recipe  
- `DELETE /api/recipes/[id]` – Delete recipe  

#### Ratings
- `POST /api/recipes/[id]/rate` – Submit a rating  
- `PUT /api/recipes/[id]/rate` – Update a rating  

#### Favorites
- `GET /api/users/favorites` – Get favorite recipes  
- `POST /api/users/favorites` – Add to favorites  
- `DELETE /api/users/favorites/[id]` – Remove from favorites  

#### User Recipes
- `GET /api/users/my-recipes` – Recipes authored by logged-in user

---

## 🚀 Deployment

Flavor Exchange is deployed at:  
🔗 [https://flavor-exchange.vercel.app](https://flavor-exchange.vercel.app)

---

## 💠 Getting Started

Follow these steps to set up and run Flavor Exchange locally.

### 📋 Prerequisites
- Node.js v18 or later
- npm, yarn, pnpm, or bun
- A GitHub OAuth App ([Setup Guide](https://docs.github.com/en/developers/apps))

### 📦 Installation

#### 1. Clone the repo:
```bash
git clone https://github.com/gitPirate12/flavor-exchange.git
cd flavor-exchange
```

#### 2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

#### 3. Set environment variables:

Create a `.env.local` file in the root directory and add:
```env
MONGODB_URI=your-mongodb-url
NEXTAUTH_SECRET=your-secret-here # Generate using: openssl rand -base64 32
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
```

#### 4. Configure GitHub OAuth:

Set your GitHub OAuth App’s callback URL to:
```
http://localhost:3000/api/auth/callback/github
```

#### 5. Run the dev server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

---

## 📂 Source Code
  
👉 [GitHub Repo](https://github.com/gitPirate12/flavor-exchange)

---


