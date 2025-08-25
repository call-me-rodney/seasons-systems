# Project: Seasons Systems

## Project Overview

This project is a comprehensive agribusiness management platform called "Seasons Systems." It's designed to streamline and digitize the operations of agricultural enterprises. The platform is a full-stack application with a modular architecture, including features for HR, procurement, equipment and inventory management, sales, and field management. It also includes role-based access control, analytics, an AI-powered seasons planner, and in-app communication.

The application is containerized using Docker and orchestrated with Docker Compose.

**Key Technologies:**

*   **Frontend:** React, Vite, Tailwind CSS, shadcn/ui, Axios, React Router
*   **Backend:** Node.js, Express, Sequelize, Redis
*   **Database:** PostgreSQL
*   **AI:** Ollama
*   **DevOps:** Docker, Docker Compose

## Building and Running

The project is designed to be run with Docker Compose.

**Prerequisites:**

*   Node.js 20.19+ or 22.12+
*   Docker and Docker Compose
*   Git

**Quick Start:**

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd seasons-systems
    ```

2.  **Set up environment variables:**
    ```bash
    # Backend
    cp backend/.env.example backend/.env
    # Edit backend/.env with your configuration
    ```

3.  **Start all services:**
    ```bash
    docker-compose up --build
    ```

**Accessing the application:**

*   **Frontend:** `http://localhost:3000`
*   **Backend API:** `http://localhost:4000`
*   **Database:** `localhost:5432`
*   **Redis:** `localhost:6379`
*   **Ollama AI:** `http://localhost:11434`

**Manual Setup (Development):**

**Backend:**

```bash
cd backend
npm install
# Create .env file with your configuration
npx sequelize-cli db:migrate
npm run dev
```

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

## Development Conventions

*   **Code Style:** The project uses ESLint for code standards and Prettier for consistent formatting.
*   **Testing:** The project has a testing setup, which can be run with `npm test` in both the `frontend` and `backend` directories.
*   **Database Migrations:** Database migrations are managed with `sequelize-cli`.
    ```bash
    cd backend
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all
    ```
*   **API Documentation:** API documentation is intended to be maintained in the `API_DOCS.md` file.
*   **Contributing:** The project has a contribution guide in the `README.md` file.

## Redis

Redis is used for:

*   Real-time chat functionality
*   Session management
*   Caching
*   Real-time notifications for Seasons Planner

**Configuration Details:**

*   Persistence enabled (AOF mode)
*   Memory limit of 512MB with LRU eviction
*   Optimized for real-time operations
*   Keyspace notifications enabled for real-time features
*   Connection limit of 10,000 clients

**Environment Variables:**

*   `REDIS_PASSWORD`: Password for Redis authentication

**Health Checks:**

The Redis service includes health checks that verify:

*   The service is running
*   Authentication is working
*   The service can accept connections

**Monitoring:**

Redis metrics can be monitored through:

*   Redis `INFO` command
*   Redis `MONITOR` command
*   Container health checks
*   `docker stats`
