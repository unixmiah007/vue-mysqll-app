# Vue + Node + MySQL Example App

## Overview
This project contains a simple Vue 3 frontend and a Node.js + Express backend which saves users to a MySQL database.

## Database
Run this SQL to create the database and table:

```sql
CREATE DATABASE user_app;
USE user_app;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(50),
  lastname VARCHAR(50),
  username VARCHAR(50) UNIQUE,
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);
```

## Setup
1. Start MySQL and create the DB/table above.
2. Backend:
   - `cd backend`
   - copy `.env.example` to `.env` and set your DB credentials OR set environment variables
   - `npm install`
   - `npm start`
3. Frontend:
   - `cd frontend`
   - `npm install`
   - `npm run serve`

Backend runs on port 5000 by default, frontend on 8080.
