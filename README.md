# WanderSwipe

WanderSwipe is a full-stack collaborative travel planner that allows users to create trips, vote on attractions by swiping (like or dislike), and see which activities their group is most excited about. Think of it as a group-friendly travel planning tool inspired by swipe-based apps.

This project is built using the MERN stack with modern tools like Vite and Tailwind CSS, and follows best practices for clean, scalable code.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Core Features](#core-features)
- [API Overview](#api-overview)
- [Authentication](#authentication)
- [Testing with Postman](#testing-with-postman)
- [Contributing](#contributing)
- [License](#license)

## Tech Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB with Mongoose
- Authentication: JWT with bcrypt
- Dev Tools: Postman, Nodemon, dotenv

## Project Structure

```
WanderSwipe/
├── client/             # Frontend (React + Vite)
├── server/             # Backend (Node + Express + MongoDB)
├── .gitignore
├── README.md           # Project documentation
```

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/yourusername/wanderswipe.git
cd wanderswipe
```

### Install Dependencies

```bash
# Install frontend packages
cd client
npm install

# Install backend packages
cd ../server
npm install
```

## Environment Variables

Create a `.env` file inside `/server` with the following:

```
MONGO_URI=your_mongodb_connection_string
PORT=5050
JWT_SECRET=your_jwt_secret
```

## Running the Application

Start the backend and frontend in separate terminals:

```bash
# Start backend
cd server
npm run dev
```

```bash
# Start frontend
cd client
npm run dev
```

App will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:5050

## Core Features

- JWT-based user authentication
- Secure registration and login
- Create, update, delete trips
- Add attractions to trips
- Swipe-style voting (like/dislike)
- Save favorites
- Route protection with middleware

## API Overview

| Method | Endpoint                     | Description                     |
|--------|------------------------------|---------------------------------|
| POST   | /api/auth/register           | Register a user                |
| POST   | /api/auth/login              | Log in a user                  |
| GET    | /api/trips/my-trips          | Get trips for logged-in user   |
| POST   | /api/trips/create            | Create a new trip              |
| GET    | /api/trips/:id               | Get trip by ID                 |
| PUT    | /api/trips/:id               | Update a trip                  |
| DELETE | /api/trips/:id               | Delete a trip                  |
| POST   | /api/attractions/:id/swipe   | Like or dislike an attraction  |
| GET    | /api/favorites               | Get user's favorite attractions |

## Authentication

JWT tokens are issued on login/registration. For protected routes, include the token in the `Authorization` header:

```
Authorization: Bearer <your_token_here>
```

## Testing with Postman

You can test all routes using Postman:

1. Set `Content-Type: application/json`
2. Use `Bearer <token>` for protected routes
3. Example test route: `GET http://localhost:5050/__ping`

## Contributing

1. Fork this repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Open a pull request