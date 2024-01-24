# ShareScribe 

## Description
shareScribe is backend for a note taking app. It allows users to create, read, update, and delete notes and share them with other users.


## Table of Contents
* [TechStack](#techstack)
* [Installation](#installation)

## TechStack

- Node.js
- Express
- PostgreSQL
- TypeORM
- TypeScript

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
- Run `npm run db:create` to create the database 
- Run `npm run migrations:run` to run the migrations 
- Run `npm run dev-run` to run the server in development mode


## Contributing
Contributions are welcome! Please create an issue if you find a bug you'd like to fix or a feature you think should be added. If you'd like to contribute code, please create a pull request and I will review it as soon as I can.