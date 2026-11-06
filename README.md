# MediConCen Backend Technical Assessment

## Project Overview
This is a backend service built with **NestJS**, **TypeScript**, and **MySQL 8** to manage unique user records based on combined identifier parameters (`id1` and `id2`).

## Prerequisites
- Node.js (v18+ recommended)
- npm
- MySQL 8

## Installation Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mediconcen-code-test
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Environment/Configuration Instructions
1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
2. Update the `.env` file with your local MySQL database credentials (e.g., password). **Note: Never commit your actual `.env` file to Git.**

## Database Setup Instructions
1. Log in to your MySQL 8 instance:
   ```bash
   mysql -u root -p
   ```
2. Create the database required for the application:
   ```sql
   CREATE DATABASE mediconcen_test;
   ```

## Instructions for Starting the Application
- Development mode:
  ```bash
  npm run start:dev
  ```
- Production build:
  ```bash
  npm run build
  npm run start:prod
  ```

## API Endpoint and Example Request
- **Endpoint**: `POST /`
- **Request Body**:
  ``json
  {
    "id1": "ABC123",
    "id2": "XYZ456"
  }
  ``json
- **Behavior**:
  - If the combination of `id1` and `id2` already exists in the database, it returns the existing `userID`.
  - If it does not exist, it generates a new UUID v4, stores it in MySQL, and returns the generated `userID`.

## Assumptions & Technical Decisions
- **Composite Unique Constraint**: `id1` and `id2` are protected by a unique index at the database entity level to prevent duplicate data inconsistencies.
- **Validation**: Utilized `class-validator` to ensure required parameters are strictly validated and proper HTTP status codes are returned on failure.
