# API Solid Gym

An API for gym management and user check-ins, developed with **Fastify**, **Prisma**, and using **PostgreSQL** as the database.

## Features

- User registration and authentication.
- Profile and check-in history retrieval.
- Gym search by proximity and name.
- Check-in creation and validation at gyms.
- Gym and check-in management (admin only).

## Requirements

### Functional
- [x] User registration.
- [x] User authentication.
- [x] Logged-in user profile retrieval.
- [x] User check-in history.
- [x] Gym search by proximity and name.
- [x] Check-in creation at gyms.
- [x] Check-in validation (admin only).
- [x] Gym registration (admin only).

### Business Rules
- [x] The user's email must be unique.
- [x] A user cannot check-in more than once per day.
- [x] The user must be near (within 100m) the gym to check-in.
- [x] Check-ins can only be validated after 20 minutes.
- [x] Only admins can validate check-ins and register gyms.

### Non-Functional Requirements
- [x] User passwords are encrypted.
- [x] The app uses PostgreSQL for data persistence.
- [x] Pagination: data lists return 20 items per page.
- [x] JWT-based authentication.

## Technologies Used

- **Node.js**: v18
- **Fastify**: v4
- **Prisma**: ORM to interact with PostgreSQL
- **JWT**: For token-based authentication
- **Zod**: For schema validation
- **Docker**: To containerize the app and database
- **Vitest**: For unit testing

## Installation

### Prerequisites

- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/)
- Node.js v18+
- PostgreSQL

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/api-solid.git
   cd api-solid
   ```

2. Set up environment variables in the `.env` file:
   ```bash
   cp .env.example .env
   # Fill in the variables in the .env file, such as JWT_SECRET, DATABASE_URL, etc.
   ```

3. Start the Docker containers:
   ```bash
   docker-compose up -d
   ```

4. The app will be available at `http://localhost:3333`.

### Available Scripts

- `npm run dev`: Starts the app in development mode.
- `npm run test`: Runs the unit tests.
- `npm run build`: Compiles the TypeScript code.

## Testing

Unit tests are automatically run with GitHub Actions (see `.github/workflows/run-unit-test.yml`). To run tests locally:

```bash
npm run test
```

## Docker

This project uses Docker for easier development and environment setup.

### Dockerfile

The `Dockerfile` builds the application image. Based on Node.js 18, it installs dependencies and starts the development server:

```dockerfile
FROM node:18.20.4-alpine3.20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["sh", "-c", "npm run dev"]
```

### Docker Compose

The `docker-compose.yml` defines two services:

- **api-solid-pg**: The PostgreSQL container.
- **app**: The Node.js application, which depends on PostgreSQL.

```yaml
services:
  api-solid-pg:
    image: bitnami/postgresql
    ports:
      - 5432:5432
    environment:
      - POSTGRESQL_USERNAME=docker
      - POSTGRESQL_PASSWORD=docker
      - POSTGRESQL_DATABASE=apisolid
    volumes:
      - api-solid:/var/lib/postgresql/data
    networks:
      - api_solid
  
  app:
    build:
      context: .
    environment:
      - DATABASE_URL=postgresql://docker:docker@api-solid-pg:5432/apisolid?schema=public
    ports:
      - "3333:3333"
    depends_on:
      - api-solid-pg
    volumes:
      - .:/app
    command: ["sh", "-c", "npm run dev"]
    networks:
      - api_solid

volumes:
  api-solid:

networks:
  api_solid:
    driver: bridge
```

## CI/CD

The project uses GitHub Actions to run unit tests on every push to the repository:

```yaml
name: Run Unit Test

on: [push]

jobs:
  run-unit-tests:
    name: Run Unit Tests
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
        
      - run: npm ci

      - run: npm run test
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.