# User Management API

A simple RESTful API that provides CRUD operations for managing users.

## Setup Instructions

### Prerequisites
- Node.js (v12 or higher)
- npm

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd user-management-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

The server will run on http://localhost:3000

## API Endpoints

### 1. Create a User
- **URL**: `/api/users`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30
  }
  ```
- **Response (201)**:
  ```json
  {
    "success": true,
    "data": {
      "id": "uuid-string",
      "name": "John Doe",
      "email": "john@example.com",
      "age": 30,
      "createdAt": "2023-07-13T10:00:00.000Z"
    }
  }
  ```

### 2. Retrieve All Users
- **URL**: `/api/users`
- **Method**: `GET`
- **Response (200)**:
  ```json
  {
    "success": true,
    "count": 1,
    "data": [
      {
        "id": "uuid-string",
        "name": "John Doe",
        "email": "john@example.com",
        "age": 30,
        "createdAt": "2023-07-13T10:00:00.000Z"
      }
    ]
  }
  ```

### 3. Retrieve a Single User
- **URL**: `/api/users/:id`
- **Method**: `GET`
- **Response (200)**:
  ```json
  {
    "success": true,
    "data": {
      "id": "uuid-string",
      "name": "John Doe",
      "email": "john@example.com",
      "age": 30,
      "createdAt": "2023-07-13T10:00:00.000Z"
    }
  }
  ```

### 4. Update a User
- **URL**: `/api/users/:id`
- **Method**: `PUT`
- **Body**:
  ```json
  {
    "name": "John Smith",
    "age": 31
  }
  ```
- **Response (200)**:
  ```json
  {
    "success": true,
    "data": {
      "id": "uuid-string",
      "name": "John Smith",
      "email": "john@example.com",
      "age": 31,
      "createdAt": "2023-07-13T10:00:00.000Z",
      "updatedAt": "2023-07-13T11:00:00.000Z"
    }
  }
  ```

### 5. Delete a User
- **URL**: `/api/users/:id`
- **Method**: `DELETE`
- **Response (200)**:
  ```json
  {
    "success": true,
    "message": "User deleted successfully"
  }
  ```

## Error Handling

The API handles various error scenarios with appropriate status codes:

### Not Found (404)
```json
{
  "success": false,
  "message": "User not found"
}
```

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Email is required",
    "Age must be a positive number"
  ]
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "An internal server error occurred"
}
```

## Testing

I've tested this API using several methods:

### Using cURL

Basic CRUD operations can be tested with cURL commands:

```bash
# Create a user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com", "age": 25}'

# Fetch all users
curl http://localhost:3000/api/users
```

### Using API Testing Tools

The API works well with tools like Postman or Insomnia. For local development, I found Thunder Client (VS Code extension) particularly useful since it integrates with the editor.

If you're working with a frontend, you might want to enable CORS in the API to allow cross-origin requests during development.

## Security Considerations

- Input validation is implemented for all user data
- Email format validation
- Age validation ensures positive numbers only
- Error messages provide necessary information without exposing system details
