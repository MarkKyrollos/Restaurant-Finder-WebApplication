# Restaurant Finder Web Application

A full-stack restaurant directory built with React, Node.js, Express, and PostgreSQL. Users can browse restaurants, view ratings and reviews, add restaurants and reviews, update restaurant details, and delete restaurants.

## Features

- Browse restaurants with their location, price range, review count, and average rating.
- View a restaurant's details and reviews.
- Add, update, and delete restaurants.
- Add reviews with a 1-5 star rating.
- Responsive React interface with Bootstrap styling and React Router navigation.

## Technology Stack

- Frontend: React 19, React Router, Bootstrap, and Axios.
- Backend: Node.js, Express, CORS, Morgan, and dotenv.
- Database: PostgreSQL, accessed through the `pg` package.

## Requirements

- Node.js and npm.
- PostgreSQL.

## Setup

### 1. Configure PostgreSQL

Create a PostgreSQL database with `restaurants` and `reviews` tables. The backend expects the following columns:

- `restaurants`: `id`, `name`, `location`, `price_range`
- `reviews`: `id`, `restaurant_id`, `name`, `review`, `rating`

Create `back-end/server/env` with your PostgreSQL connection settings:

```env
PORT=3000
PGUSER=your_postgres_user
PGPASSWORD=your_postgres_password
PGHOST=localhost
PGPORT=5432
PGDATABASE=your_database_name
```

### 2. Install dependencies

From the repository root, install dependencies for both applications:

```bash
cd back-end/server
npm install

cd ../../front-end/frontend
npm install
```

### 3. Start the backend

In `back-end/server`:

```bash
npm start
```

The API listens on `http://localhost:3000` by default.

### 4. Start the frontend

In a different terminal, from `front-end/frontend`:

```bash
npm start
```

The React development server opens at `http://localhost:3000` by default.

## API Endpoints

All resource endpoints use the `/api/v1/restaurants` base path.

| Method   | Endpoint Path                       | Description                        |
| -------- | ----------------------------------- | ---------------------------------- |
| `GET`    | `/api/v1/restaurants`               | List all restaurants               |
| `GET`    | `/api/v1/restaurants/:id`           | Get one restaurant and its reviews |
| `POST`   | `/api/v1/restaurants`               | Create a restaurant                |
| `PUT`    | `/api/v1/restaurants/:id`           | Update a restaurant                |
| `DELETE` | `/api/v1/restaurants/:id`           | Delete a restaurant                |
| `POST`   | `/api/v1/restaurants/:id/addReview` | Add a review                       |

## Project Structure

```text
back-end/server/
    server.js              Express API and routes
    database/index.js      PostgreSQL connection pool
    package.json

front-end/frontend/
    src/
        apis/                 Axios API client
        components/           Reusable React components
        context/              Restaurant state context
        pages/                Application pages
        routes/               Route-level components
    package.json
```

## Screenshots

### Home Page

<img width="1920" height="887" alt="Home_Page" src="https://github.com/user-attachments/assets/cd3efc05-424c-4416-95d7-5dc1d9b2dfa6" />

### Review Page

<img width="1920" height="882" alt="Reviews_Page" src="https://github.com/user-attachments/assets/e5e8c020-4ed3-4627-8141-bdb6113e358c" />

### Update Page

<img width="1920" height="875" alt="Update_Page" src="https://github.com/user-attachments/assets/985ac8f5-3fad-41ca-a6d3-62f8f6d15e47" />

## Architecture

<img width="7864" height="4069" alt="restaurant viewer diagram" src="https://github.com/user-attachments/assets/e364b547-fb9e-4aa3-88cf-bd3600583029" />
