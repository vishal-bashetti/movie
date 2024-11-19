# Movie App Project

A React-based movie application built with Vite, showcasing movies with filters, expandable details, and smooth loading states.

## Features

- **Filter Movies:** Filter movies based on title, genre, and year.
- **Expandable Details:** View detailed information about movies, including plot, genre, director, and year.
- **Skeleton Loading:** Smooth loading experience using skeleton loaders.
- **Responsive Design:** Optimized UI for various screen sizes.
- **Modern UI Components:** Built using Material UI for a sleek and user-friendly interface.

---

## Prerequisites

- **Node.js**: `v18.x` or higher
- **npm**: `v9.x` or higher (or `pnpm`/`yarn` as alternatives)

---

## Tech Stack

- **Vite**: For fast development and production builds.
- **React**: Frontend library.
- **Material UI**: UI components for React.
- **Lucide-react**: Icon library for React.
- **Framer Motion**: For animations.

---

## Setup and Installation

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**:
   ````bash
   npm install
   # OR
   pnpm install```
   ````
3. **Create an Environment File**: Create a .env file in the project root and include the following variables:

   ```bash
   VITE_OMDB_API_KEY=<OMDB_API_KEY>
   VITE_API_BASE_URL=<API_BASE_URL>
   ```

4. **Run the Application:**

   ```bash
   npm run dev
   # OR  
   pnpm run dev
   ```
