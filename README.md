<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Buy Simply Backend Assessment

A backend service built with [NestJS](https://nestjs.com/) for the Task Management Assessment API.

---

## Project Setup

Clone the repository and install dependencies:

```bash
git clone <repo-url>
cd buy-simply-backend-assessment
npm install
```

## Environment Configuration

1. Copy the example environment file and update values as needed:
   ```bash
   cp .env.example .env
   ```
2. Edit `.env` to set your environment variables (e.g., database credentials, JWT secrets, etc.).

**Typical variables:**

```
NODE_ENV=development
PORT=3000
DATABASE_URL=postgres://user:password@localhost:5432/buy_simply
JWT_SECRET=your_jwt_secret
```

## Database Setup & Migration

This project uses PostgreSQL (or your specified DB). Ensure your database is running and accessible.

**Create the database:**

```bash
createdb task_Management
```

**Run migrations:**

```bash
npm run typeorm:migration:run
```

> _Check your ORM documentation for details. Update this section if you use a different migration tool._

## API Documentation

This project uses Swagger for API documentation.

- After starting the server, visit: [http://localhost:3000/swagger/api](http://localhost:3000/swagger/api)
- The Swagger UI provides interactive API docs and allows you to test endpoints.

## Testing

Run tests with:

```bash
# Unit tests
npm run test

# End-to-end (e2e) tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Deployment

- Set `NODE_ENV=production` and configure your production `.env`.
- Build the project:
  ```bash
  npm run build
  ```
- Start the server:
  ```bash
  npm run start:prod
  ```
- For cloud deployment, see [NestJS deployment docs](https://docs.nestjs.com/deployment) or use [Mau](https://mau.nestjs.com) for AWS.

## Architecture Decisions

- **Framework:** [NestJS](https://nestjs.com/) for modular, scalable server-side applications.
- **Database:** PostgreSQL (or your configured DB).
- **ORM:** TypeORM.
- **API Docs:** Swagger for interactive documentation.
- **Testing:** Jest for unit and e2e tests.
- **Rationale:** Chosen for strong TypeScript support, maintainability, and community best practices.

---

## Resources

- [NestJS Documentation](https://docs.nestjs.com)

## Support

Nest is an MIT-licensed open source project. [Read more here](https://docs.nestjs.com/support).

## Stay in Touch

- Author - [Abraham Omorisiagbon ](https://www.linkedin.com/in/abrahamosaz/)
- Website - [portfolio](https://abraham-portfolio-psi.vercel.app/)
