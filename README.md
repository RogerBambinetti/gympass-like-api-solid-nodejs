# API Solid - NodeJS + Prisma

[![English](https://img.shields.io/badge/lang-english-blue.svg)](README.md)
[![Português](https://img.shields.io/badge/lang-portuguese-green.svg)](README.pt-br.md)

## Description
Project applying SOLID principles with TypeScript + Prsima for learning purposes.

## Requirements

Before you begin, ensure you have met the following requirements:

- Node.js (v16.x).
- Npm (v8.x)
- Docker (v27.x)
- Docker Compose (v2.x)

## Installation & Setup

Instructions on how to install and set up the project for development.

1. First, let's install the project dependencies with npm:

```bash
# Install dependencies
npm install
```

2. Set your environment variables correctly in the `.env` file (refer to `.env.example` for guidance):

3. Now, make sure to run the docker containers using docker compose:

```bash
docker compose up -d
```

4. Next, we need to run prisma migrations in order to create tables and populate the database:

```bash
npx prsima run dev
```

5. Finally, run the project in development with:

```bash
npm run "start:dev"
```
