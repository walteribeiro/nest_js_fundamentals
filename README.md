# nest_js_fundamentals

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)

## About

Hands-on project following the NestJS Fundamentals course: a REST API for a coffee catalog (*iluvcoffee*) built step by step to explore the framework's core building blocks — modules, controllers, providers, DTOs with validation and the global `ValidationPipe`.

The `coffees` module exposes a CRUD backed by an in-memory store, with input validation through `class-validator` and `class-transformer`.

## Tech Stack

- TypeScript
- NestJS 11
- Express (via `@nestjs/platform-express`)
- class-validator / class-transformer
- Jest + Supertest

## Getting Started

```bash
git clone https://github.com/walteribeiro/nest_js_fundamentals.git
cd nest_js_fundamentals
npm install
npm run start:dev
```

The API runs on `http://localhost:3000` (override with the `PORT` environment variable).

## API

| Method | Route | Description |
|---|---|---|
| `GET` | `/coffees` | List all coffees |
| `GET` | `/coffees/:id` | Get a coffee by id (404 if not found) |
| `POST` | `/coffees` | Create a coffee (`name`, `brand`, `flavors[]`) |
| `PATCH` | `/coffees/:id` | Update a coffee |
| `DELETE` | `/coffees/:id` | Remove a coffee |

Requests with unknown properties are rejected (`whitelist` + `forbidNonWhitelisted`).

## Scripts

```bash
npm run start:dev    # development with watch mode
npm run build        # compile to dist/
npm run start:prod   # run the compiled build
npm run test         # unit tests
npm run test:e2e     # end-to-end tests
npm run lint         # eslint --fix
```

## Author

**Walter Ribeiro** · [GitHub](https://github.com/walteribeiro)
