# Araray - Song API

Araray is a RESTful API for managing a song library. It provides endpoints for creating, reading, updating, and deleting songs, as well as uploading song files and retrieving statistics. The API is built with Node.js, Express, and TypeScript, and it uses MongoDB for data storage and AWS S3 for file storage in production.

## Features

-   CRUD operations for songs
-   Song file uploads (to AWS S3 in production, local storage in development)
-   API for song statistics
-   Docker support for easy setup and deployment

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v14 or later)
-   pnpm
-   Docker (optional, for running MongoDB)

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username/araray.git
    ```
2.  Install NPM packages
    ```sh
    pnpm install
    ```
3.  Create a `.env` file in the root directory and add the environment variables listed in the [Environment Variables](#environment-variables) section.
4.  Start the development server
    ```sh
    pnpm run dev
    ```

## API Endpoints

All endpoints are prefixed with `/api/v1`.

| Method | Endpoint          | Description                                |
| ------ | ----------------- | ------------------------------------------ |
| POST   | `/songs`          | Create a new song.                         |
| POST   | `/songs/upload`   | Upload a song file.                        |
| GET    | `/songs`          | Get a list of all songs.                   |
| GET    | `/songs/stats`    | Get statistics about the song library.     |
| GET    | `/songs/:id`      | Get a single song by its ID.               |
| PUT    | `/songs/:id`      | Update a song's information.               |
| DELETE | `/songs/:id`      | Delete a song.                             |
| GET    | `/music/:filename`| Serve a song file from local storage.      |

## Technologies Used

-   [Node.js](https://nodejs.org/)
-   [Express](https://expressjs.com/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [MongoDB](https://www.mongodb.com/)
-   [Mongoose](https://mongoosejs.com/)
-   [AWS S3](https://aws.amazon.com/s3/)
-   [Docker](https://www.docker.com/)

## Environment Variables

Create a `.env` file in the root of the project and add the following variables:

```
# Port for the server to run on
PORT=3000

# MongoDB connection URI
MONGODB_URI=mongodb://root:example@localhost:27017/songs?authSource=admin

# AWS credentials for S3
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_BUCKET_NAME=

# Host for the server
HOST=http://localhost:3000
```

## Available Scripts

-   `pnpm run build`: Compiles the TypeScript code to JavaScript.
-   `pnpm run start`: Starts the server in production mode.
-   `pnpm run dev`: Starts the server in development mode with hot-reloading.
-   `pnpm test`: Runs the tests (not yet implemented).

## Docker Support

The project includes a `docker-compose.yml` file that sets up the Node.js application and a MongoDB database. To run the application with Docker, use the following command:

```sh
docker-compose up
```

This will start the API server and a MongoDB instance. The API will be accessible at `http://localhost:3000`.
