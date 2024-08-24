
# ShareScribe

## Description

ShareScribe is a robust backend for a note-taking app that allows users to seamlessly create, read, update, delete, and share notes with others. It leverages modern web technologies to provide a secure, scalable, and efficient API.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Contributing](#contributing)

## Tech Stack

- **Node.js** - JavaScript Runtime
- **Express** - Web Framework for Node.js
- **PostgreSQL** - Relational Database Management System
- **TypeORM** - ORM for TypeScript and JavaScript
- **TypeScript** - Typed JavaScript at Any Scale

## Features

- ✅ **User Authentication** - Secure user login and registration with JWT.
- ✅ **CRUD Operations for Notes** - Users can create, read, update, and delete notes.
- ✅ **Note Sharing** - Share notes with other users easily.
- ✅ **Database Migrations** - Seamless database migrations with TypeORM.
- ✅ **API Documentation** - Swagger UI Express and tsoa for API documentation.
- ✅ **Containerization** - Docker support for consistent development and deployment.
- ⬜ **Unit Testing** - Planned unit tests with Jest.
- ⬜ **CI/CD** - Continuous Integration and Deployment with GitHub Actions.
- ⬜ **Deployment** - Future deployment plans to AWS.

## Installation

### Prerequisites

- **Node.js** v18.0.0 or higher
- **PostgreSQL** v15.0.0 or higher

### Running Without Docker Compose

1. **Fork and Clone the Repository:**
   
   ```bash
   git clone https://github.com/your-repo/shareScribe.git
   ```

2. **Navigate to the Root Directory and Install Dependencies:**

   ```bash
   npm install
   ```

3. **Environment Configuration:**
   - Copy `.env.example` to `.env`.
   - Update the `.env` file with your database credentials.

4. **Database Setup:**
   - Create a PostgreSQL database with the name specified in your `.env` file.
   - Generate migration files with:

     ```bash
     npm run db:generate
     ```

   - Run the migrations:

     ```bash
     npm run migrations:run
     ```

5. **Start the Server:**

   ```bash
   npm run dev-run
   ```

6. **Access the Swagger Documentation:**

   Visit [http://localhost:3000/api-docs](http://localhost:3000/api-docs) in your browser to view the API documentation.

### Running With Docker Compose

1. **Ensure Docker and Docker Compose Are Installed:**

   Install Docker from the [official website](https://docs.docker.com/get-docker/).

2. **Navigate to the Root Directory:**

   ```bash
   cd shareScribe
   ```

3. **Environment Configuration:**

   - Copy `.env.example` to `.env`.
   - Ensure the PostgreSQL service name in `.env` matches the service name in `docker-compose.yml`.

4. **Build and Run the Services:**

   ```bash
   docker-compose up --build
   ```

5. **Stop the Containers:**

   ```bash
   docker-compose down
   ```

6. **Access the Swagger Documentation:**

   Visit [http://localhost:3000/api-docs](http://localhost:3000/api-docs) in your browser to view the API documentation.

## Contributing

Contributions are highly appreciated! If you encounter any bugs or have suggestions for new features, please open an issue. If you wish to contribute code, feel free to fork the repository, create a new branch, and submit a pull request. All contributions will be reviewed promptly.

