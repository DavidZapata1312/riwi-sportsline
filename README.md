# Riwi Sportsline

Backend service built with [NestJS](https://nestjs.com/) and TypeScript for managing sports-product deliveries: clients, products, orders (deliveries) and staff users with JWT + Google OAuth.

## Prerequisites

- Node.js (LTS recommended)
- npm or yarn
- A PostgreSQL instance (for TypeORM)

## Getting started

```bash
# install dependencies
npm install

# run in development mode
npm run start:dev

# build for production
npm run build

# run compiled app
npm run start:prod
```

## Environment configuration

The app uses `@nestjs/config` and `dotenv`.

1. Create an `.env` file in the project root.
2. Add the variables required by your configuration module, for example:

```bash
# server
PORT=3000

# database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=riwi_sportsline
```

Adjust the variable names and values to match your local setup and the configuration in `src`.

## Database & TypeORM

- The project uses TypeORM for data access.
- Make sure your PostgreSQL database is created and reachable using the credentials in your `.env`.
- Run any pending migrations or synchronize according to the TypeORM configuration defined in `src`.

## Seeding data

There is a seeder script defined in `package.json`:

```bash
npm run seed
```

This typically populates the database with initial data. Review `src/seeder/main-seed.ts` before running it to understand what it will insert.

## Testing

```bash
# unit tests (watch)
npm run test:watch

# coverage
npm run test:cov

# e2e tests
npm run test:e2e
```

## Linting & formatting

```bash
# lint and auto-fix
npm run lint

# format source and tests
npm run format
```

## Project structure

- `src/app.module.ts` – main Nest application module
- `src/auth` – authentication (email/password login, JWT, Google OAuth2)
- `src/user` – staff users (roles via `UserType`, password hashing, relation with deliveries)
- `src/client` – end clients receiving sports products (contact data, relation with deliveries)
- `src/product` – sports products catalog (name, description, price, category, stock, relation with deliveries)
- `src/delivery` – deliveries / orders (client, products, total amount, status via `DeliveryStatus`, assigned user)
- `src/seeder` – scripts to populate initial data
- `src/common` – shared filters, interceptors, etc.
- `src/shared` – shared base entity and utilities
- `src/config` – configuration (database, environment)
- `test/` – tests (unit and e2e)

## License

This project is currently marked as `UNLICENSED` in `package.json`. Add a license file if you plan to distribute it.
