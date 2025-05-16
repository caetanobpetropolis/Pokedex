# Pokédex App 🧬

A full-stack Pokédex application built with **Angular**, **NestJS**, and **Docker**, consuming the [PokeAPI](https://pokeapi.co/). The project implements a modern and responsive Pokémon catalog with search, pagination, and detailed views.

---

## 📦 Tech Stack

- **Frontend**: Angular 17, Angular Material
- **Backend**: Node.js, NestJS
- **API Source**: [PokeAPI REST](https://pokeapi.co/)
- **Containerization**: Docker, NGINX

---

## ✨ Features

- 📋 **Pokémon List**: Displays a paginated list of Pokémon
- 🔎 **Search**: Filter Pokémon by name using autocomplete
- ➕ **Load More**: Fetch more Pokémon in batches
- 📊 **Detailed Stats**: View Pokémon stats and types
- 💬 **Dialog Modal**: Click to view additional details
- 🧪 **Unit Tests**: Implemented with Jest (backend)
- 🐳 **Docker Support**: Full Docker setup for both frontend and backend

---

## 🚀 Running Locally

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Angular CLI](https://angular.io/cli)

### 1. Start Backend (NestJS)

- cd api
- npm install
- npm run start:dev

### 2. Start Frontend (Angular)

- cd app
- npm install
- npm start

The app will be available at http://localhost:4200

## 🚀 Running with Docker

Ensure you're in the root project directory:
- docker build -t pokedex-app .
- docker run -p 4200:80 pokedex-app

Or using Docker Compose:

- docker-compose up --build

Then visit: http://localhost:4200

---

## ✅ Testing

### Backend tests with Jest

- cd api
- npm run test
- npm run test:cov
