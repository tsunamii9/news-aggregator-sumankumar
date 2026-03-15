# Personalized News Aggregator API

A production-style RESTful API built with Node.js and Express.js that provides personalized news aggregation using JWT authentication, caching, and external NewsAPI integration.

---

##  Features

- User Registration & Login (JWT Authentication)
- Password Hashing with bcrypt
- User Preferences Management
- Personalized News Fetching
- News Search by Keyword
- Caching Layer (TTL-based)
- Mark Articles as Read
- Mark Articles as Favorite
- Background Cache Refresh
- Input Validation using Joi
- Centralized Error Handling

---

##  Project Structure

```
src/
├── app.js
├── server.js
├── config/
├── middlewares/
├── modules/
│   ├── auth/
│   ├── users/
│   └── news/
├── utils/
```

---

##  Installation

###  Clone the Repository

```
git clone <your-repo-url>
cd personalized-news-api
```

###  Install Dependencies

```
npm install
```

### Configure Environment Variables

Create a `.env` file:

```
PORT=3000
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1h
NEWS_API_KEY=your_newsapi_key
NEWS_API_BASE_URL=https://newsapi.org/v2
```

### Start the Server

```
npm run dev
```

Server runs at:

```
http://localhost:3000
```

---

## Authentication

All protected routes require:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## API Endpoints

### Auth

#### POST `/auth/register`
Register a new user.

#### POST `/auth/login`
Login and receive JWT token.

---

### User Preferences

#### GET `/users/preferences`
Retrieve current user preferences.

#### PUT `/users/preferences`
Update user preferences.

---

### News

#### GET `/news`
Fetch personalized news based on preferences.

#### GET `/news/search/:keyword`
Search news articles by keyword.

---

### Article Actions

#### POST `/news/:id/read`
Mark an article as read.

#### POST `/news/:id/favorite`
Mark an article as favorite.

#### GET `/news/read`
Get all read articles.

#### GET `/news/favorites`
Get all favorite articles.

---

## Caching Strategy

- In-memory cache using Map
- TTL-based expiration
- User-scoped cache keys
- Background refresh for popular categories

---

## Validation & Error Handling

- Joi-based request validation
- Centralized error middleware
- Proper HTTP status codes

---

## Development Notes

- SSL verification disabled for local development only
- In-memory data store (replace with DB for production)
- Cache can be replaced with Redis easily

---

## Future Improvements

- MongoDB persistence
- Redis caching
- Rate limiting
- Dockerization
- Logging with Winston
- API versioning

---

## 👨‍💻 Author

Suman Kumar