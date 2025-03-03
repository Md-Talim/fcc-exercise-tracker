# Exercise Tracker API

This is a simple Exercise Tracker API built with Express.js as part of the FreeCodeCamp Backend APIs and Relational Database Certification project. The API allows users to create accounts, log exercises, and retrieve exercise logs with filtering options.

## Features

- Create a new user
- Retrieve a list of all users
- Add exercises for a user with description, duration, and date
- Retrieve a user's exercise log
- Filter exercise logs by date range (`from`, `to`) and limit the number of results

## Endpoints

### 1. Create a New User

**POST** `/api/users`

#### Request Body (Form Data)
```json
{
  "username": "exampleUser"
}
```

#### Response
```json
{
  "username": "exampleUser",
  "_id": "randomGeneratedId"
}
```

### 2. Get All Users

**GET** `/api/users`

#### Response
```json
[
  {
    "username": "exampleUser",
    "_id": "randomGeneratedId"
  }
]
```

### 3. Add an Exercise

**POST** `/api/users/:_id/exercises`

#### Request Body (Form Data)
```jsonc
{
  "description": "Running",
  "duration": 30,
  "date": "2024-03-03"  // (Optional, defaults to current date)
}
```

#### Response
```json
{
  "username": "exampleUser",
  "description": "Running",
  "duration": 30,
  "date": "Sun Mar 03 2024",
  "_id": "randomGeneratedId"
}
```

### 4. Get Exercise Logs

**GET** `/api/users/:_id/logs`

#### Query Parameters (Optional)
- `from`: Start date (YYYY-MM-DD)
- `to`: End date (YYYY-MM-DD)
- `limit`: Number of logs to return

#### Example Request
```
GET /api/users/randomGeneratedId/logs?from=2024-01-01&to=2024-03-01&limit=2
```

#### Response
```json
{
  "username": "exampleUser",
  "_id": "randomGeneratedId",
  "count": 2,
  "log": [
    {
      "description": "Running",
      "duration": 30,
      "date": "Sun Mar 03 2024"
    }
  ]
}
```

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/md-talim/fcc-exercise-tracker.git
   ```
2. Navigate to the project directory:
   ```sh
   cd fcc-exercise-tracker
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the server:
   ```sh
   npm start
   ```

## Technologies Used

- Node.js
- Express.js
- dotenv (for environment variables)
- CORS
