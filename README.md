#  Flavor Exchange – Recipe Sharing Platform

**Live Demo**: [flavor-exchange.vercel.app](https://flavor-exchange.vercel.app)

---

##  Overview

Flavor Exchange is a modern web application that enables users to discover, share, and manage recipes. Built with Next.js and styled using Tailwind CSS, it offers a seamless user experience with features like GitHub OAuth authentication and a personalized favorites system.

---

##  Key Features

- **Recipe Feed**: Browse a dynamic list of recipes with search functionality.
- **Recipe Details**: View comprehensive information, including ingredients and instructions.
- **User Authentication**: Secure login via GitHub OAuth using NextAuth.js.
- **CRUD Operations**: Authenticated users can create, read, update, and delete their recipes.
- **Favorites System**: Save and manage favorite recipes for quick access.

---

## ⚙️ Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Authentication**: NextAuth.js with GitHub OAuth
- **State Management**: React Context API
- **Database**: MongoDB
- **Deployment**: Vercel

---

##  Installation & Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/gitPirate12/flavor-exchange.git
   cd flavor-exchange
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory and add:
   ```env
   MONGODB_URI=your-mongodb-uri
   NEXTAUTH_SECRET=your-nextauth-secret
   GITHUB_ID=your-github-client-id
   GITHUB_SECRET=your-github-client-secret
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

##  API Endpoints

- **Recipes**:
  - `GET /api/recipes` – Fetch all recipes
  - `GET /api/recipes/[id]` – Get recipe details
  - `POST /api/recipes` – Create a new recipe
  - `PUT /api/recipes/[id]` – Update a recipe
  - `DELETE /api/recipes/[id]` – Delete a recipe

- **Favorites**:
  - `GET /api/users/favorites` – Retrieve favorite recipes
  - `POST /api/users/favorites` – Add a recipe to favorites
  - `DELETE /api/users/favorites/[id]` – Remove a recipe from favorites

- **User Recipes**:
  - `GET /api/users/my-recipes` – Fetch recipes created by the authenticated user

For comprehensive API documentation, refer to the [Flavor Exchange Postman Docs](https://documenter.getpostman.com/view/26831435/2sB2cX91gb).

---


