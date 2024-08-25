# FitMealAPI

Fit Meal API is an application developed to manage users' daily diet, allowing the registration, editing, and monitoring of meals.

## Table of Contents

- [About the Project](#about-the-project)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Configuration](#database-configuration)
- [Running the Application](#running-the-application)
- [API Testing with Postman](#api-testing-with-postman)
- [Routes](#routes)

## About the Project

Fit Meal API is an application built with [Fastify](https://www.fastify.io/), focusing on managing users' meals, allowing daily diet control and monitoring of food-related metrics.

## Technologies Used

- Node.js
- Fastify
- TypeScript
- SQLite
- Knex.js
- Zod
- bcryptjs

## Features

- User creation
- User authentication
- Meal registration
- Meal editing
- Meal deletion
- Viewing one or all of a user's meals

## Prerequisites

- Node.js >= 14.x
- npm or yarn

## Installation

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/Frankdias92/playground-node/fit-meal-api
cd fit-meal-api
```

Install the dependencies:

```bash
npm install
# or
yarn install
```

## Database Configuration

Set up the SQLite database by creating a `.env` file at the root of the project with the following content:

```env
DATABASE_URL=sqlite://./dev.db
```

Run the migrations to create the tables in the database:

```bash
npm run knex -- migrate:latest
```

## Running the Application

To start the development server:

```bash
npm run start
# or
yarn start
```

The application will be available at `http://localhost:3333`.

## API Testing with Postman

You can test the API routes using Postman. The test routes are attached to the project in the `postman` folder.

1. Import the `FitMealAPI.postman_collection.json` file into Postman.
2. Run the available requests to test the API's functionalities.

## Routes

### Users

- **POST /users**
  - Creates a new user.
  - **Body:**
    ```json
    {
      "username": "UserTest",
      "email": "user@email.com",
      "password": "user_password"
    }
    ```

- **POST /auth/login**
  - Authenticates a user.
  - **Body:**
    ```json
    {
      "email": "user@email.com",
      "password": "user_password"
    }
    ```

### Meals

- **POST /meals**
  - Registers a new meal.
  - **Headers:**
    - `Cookie: session_id=your_session_id`
  - **Body:**
    ```json
    {
      "name": "Lunch",
      "description": "Rice, beans, and salad",
      "isOnDiet": true,
      "date": "2024-08-25T12:00:00.000Z"
    }
    ```

- **GET /meals**
  - Lists all meals of the authenticated user.
  - **Headers:**
    - `Cookie: session_id=your_session_id`

- **GET /meals/:id**
  - Retrieves a single meal by ID.
  - **Headers:**
    - `Cookie: session_id=your_session_id`

- **PUT /meals/:id**
  - Edits an existing meal.
  - **Headers:**
    - `Cookie: session_id=your_session_id`
  - **Body:**
    ```json
    {
      "name": "Dinner",
      "description": "Vegetable soup",
      "isOnDiet": false,
      "date": "2024-08-25T19:00:00.000Z"
    }
    ```

- **DELETE /meals/:id**
  - Deletes a meal by ID.
  - **Headers:**
    - `Cookie: session_id=your_session_id`

## Contribution

Feel free to contribute to this project. Fork the repository, create a branch for your feature, and submit a pull request!

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Light%20Bulb.png" alt="Light Bulb" width="25" height="25" /> License

This project is licensed under the MIT License. See the [LICENSE](./licence.md) file for more details.