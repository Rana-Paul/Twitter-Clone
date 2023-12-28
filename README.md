
# Full Stack Twitter Clone

This is Full Stack Twitter Clone. Built with the Next.js 13, GraphQL, Redis, TypeScript,Tailwind, PostgreSQL

## Getting Started
To get a local copy up and running, please follow these simple steps.


## Prerequisites

Here is what you need to be able to run Full Stack Twitter clone

``Node.js (Version: >=18.x)``

``PostgreSQL``




## Development

----- Run Backend -----

```bash
  git clone https://github.com/Rana-Paul/Twitter-Clone.git
```
Go to the project folder
```bash
  cd server/ 
```
Install packages with npm
```bash
  npm install
```

add env Variables

Duplicate `.env.example` to `.env`

migrate prisma file
```bash
  npx prisma migrate dev
```
Run (in development mode)
```bash
  npm run dev
```

----- Run Frontend -----


```bash
  cd client/ 
```
install npm packages
```bash
  npm install
```
Run (in development mode)
```bash
  npm run dev
```

Frontend: ``http://localhost:3000``

Backend: ``http://localhost:8000/graphql``


## Development with Docker

```bash
  docker-compose up -d
```

Frontend: ``http://localhost:3000``

Backend: ``http://localhost:8000/graphql``
