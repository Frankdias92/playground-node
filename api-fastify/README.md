# API Fastify

API Fastify is a Fastify-based RESTful API that manages transaction records. It includes features like user authentication via cookies, database management using Knex.js, and comprehensive testing with Vitest and Supertest.

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Hook.png" alt="Hook" width="25" height="25" /> Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database](#database)
- [API Endpoints](#api-endpoints)
- [Running Tests](#running-tests)
- [Building the Project](#building-the-project)
- [License](#license)

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="25" height="25" /> Features

- **Fastify**: Fast and low overhead web framework for Node.js.
- **Knex.js**: SQL query builder for PostgreSQL and SQLite.
- **Zod**: Type-safe schema validation.
- **Dotenv**: Environment variable management.
- **Cookie-based Authentication**: Secure session management using cookies.
- **Comprehensive Testing**: Unit and integration tests using Vitest and Supertest.
- **Typescript**: Strong typing throughout the project.

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Hammer%20and%20Wrench.png" alt="Hammer and Wrench" width="25" height="25" /> Getting Started

### Prerequisites

- Node.js >= 18.x
- PostgreSQL or SQLite
- [Postman](https://www.postman.com/downloads/) (optional, for API testing)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/api-Fastify.git
   cd api-Fastify
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory and configure it as shown in the [Environment Variables](#environment-variables) section.

4. Run migrations:
   ```bash
   npm run knex migrate:latest
   ```

5. Start the server:
   ```bash
   npm start
   ```

The API should now be running on `http://localhost:3000`.

### Postman Collection

You can import the Postman collection provided in this repository to test the API endpoints easily.

1. Open Postman.
2. Click on "Import" in the top-left corner.
3. Select "Choose Files" and navigate to the `api-fastify/API-Fastify.postman_collection.json` file included in this repository.
4. Once imported, you'll have access to all API endpoints with pre-configured requests.

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Gear.png" alt="Gear" width="25" height="25" /> Environment Variables

The following environment variables are used in this project:

- `NODE_ENV`: The environment in which the app is running (`development`, `test`, `production`).
- `DATABASE_CLIENT`: Database client (`sqlite` or `pg`).
- `DATABASE_URL`: The database connection string or file path for SQLite.
- `PORT`: The port on which the server will run.

Example `.env` file:

```env
NODE_ENV=development
DATABASE_CLIENT=sqlite
DATABASE_URL=./database/app.db
PORT=3000
```

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Card%20File%20Box.png" alt="Card File Box" width="25" height="25" /> Database

The project uses Knex.js for database management. You can configure it to use either SQLite or PostgreSQL by setting the appropriate environment variables. Migrations are stored in the `./database/migrations` directory.

### Running Migrations

```bash
npm run knex migrate:latest
```

### Rolling Back Migrations

```bash
npm run knex migrate:rollback
```
## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Satellite%20Antenna.png" alt="Satellite Antenna" width="45" height="45" /> API Endpoints
The API manages transaction records with the following endpoints:

-  `GET /transactions`: Returns all transactions associated with the user's session.

- `GET /transactions/:id`: Returns a specific transaction by its ID.

- `GET /transactions/summary`: Returns a summary of all transactions (total amount).

- `POST /transactions`: Creates a new transaction. The request body should include:

   - `title`: Transaction title.
   - `amount`: Transaction amount.
   - `type`: Transaction type (`credit` or `debit`).

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Test%20Tube.png" alt="Test Tube" width="25" height="25" /> Running Tests

The project includes unit and integration tests using Vitest and Supertest.

### Run Tests

```bash
npm test
```

### Test Coverage

Tests cover creating transactions, listing them, fetching specific transactions, and generating summaries.

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Package.png" alt="Package" width="25" height="25" /> Building the Project

To build the project, run:

```bash
npm run build
```

This command uses `tsup` to compile TypeScript files and output them to the `build` directory.

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Light%20Bulb.png" alt="Light Bulb" width="25" height="25" /> License

This project is licensed under the MIT License. See the [LICENSE](./licence.md) file for more details.