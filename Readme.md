# ShareScribe 

## Description
shareScribe is backend for a note taking app. It allows users to create, read, update, and delete notes and share them with other users.


## Table of Contents
* [TechStack](#techstack)
* [CheckList](#checklist)
* [Installation](#installation)

## TechStack

- Node.js
- Express
- PostgreSQL
- TypeORM
- TypeScript

## CheckList

- [x] User authentication with JWT
- [x] Notes can be created, read, updated, and deleted 
- [x] Notes can be shared with other users
- [x] Database migrations and ORM configuration using TypeORM
- [x] Swagger documentation using Swagger UI Express and tsoa
- [ ] Unit tests with Jest
- [ ] CI/CD with GitHub Actions
- [ ] Deployment to AWS

## Installation

### Prerequisites
- Node.js v18.0.0 or higher
- PostgreSQL v15.0.0 or higher

### Instructions
- Fork the repo
- Clone the repo to your local machine
- Navigate to the root directory and run `npm install` to install dependencies
- Copy the `.env.example` file and rename it to `.env`
- Update the `.env` file with your database credentials
- Create a database in PostgreSQL with the name you specified in the `.env` file
- Run `npm run db:generate` to generate the migration files 
- Run `npm run migrations:run` to run the migrations 
- Run `npm run dev-run` to run the server in development mode
- Navigate to `http://localhost:3000/api-docs` to view the Swagger documentation


## Contributing
Contributions are welcome! Please create an issue if you find a bug you'd like to fix or a feature you think should be added. If you'd like to contribute code, please create a pull request and I will review it as soon as I can.