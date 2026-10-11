# To-Do List — MERN Stack

A full-stack To-Do List application built using MongoDB, Express.js, React.js and Node.js.

## Features

- Add tasks
- View saved tasks
- Mark tasks complete or incomplete
- Delete tasks
- Persist tasks in MongoDB
- REST API with input validation
- React state updates without page reload

## Requirements

- Node.js and npm
- MongoDB Atlas database

## Backend Setup

1. Open a terminal in `backend`.
2. Run `npm install`.
3. Create a `.env` file containing:

   `MONGO_URI=your_mongodb_connection_string`

4. Run `npm start`.

The backend runs at `http://localhost:5000`.

## Frontend Setup

1. Open another terminal in `frontend`.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/tasks` | Fetch all tasks |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

## Environment Variables

The backend requires `MONGO_URI`. See `.env.example` for the placeholder.

## Screenshots

Application screenshots are available in the `screenshots` folder.

## Author

sreeego-collegemail
