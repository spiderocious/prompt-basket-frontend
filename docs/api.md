# PromptBasket API Specification

## Overview

RESTful API for PromptBasket - a prompt management application. All endpoints return JSON and require authentication except for auth endpoints.

**Base URL**: `/api/v1`

**Authentication**: JWT Bearer token in Authorization header
```
Authorization: Bearer <token>
```

---

## Authentication

### POST /auth/signup

Register a new user account.

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Validation Rules**:
- `email`: Required, valid email format, unique
- `password`: Required, minimum 8 characters, must contain: 1 uppercase, 1 lowercase, 1 number
- `name`: Required, 2-50 characters

**Success Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_1234567890",
      "email": "user@example.com",
      "name": "John Doe",
      "createdAt": "2026-02-07T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response** (400 Bad Request):
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email already exists",
    "fields": {
      "email": "This email is already registered"
    }
  }
}
```

---

### POST /auth/login

Authenticate user and receive JWT token.

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Success Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_1234567890",
      "email": "user@example.com",
      "name": "John Doe",
      "createdAt": "2026-02-07T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response** (401 Unauthorized):
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password"
  }
}
```

---

### GET /auth/me

Get current authenticated user details.

**Headers**: Authorization required

**Success Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_1234567890",
      "email": "user@example.com",
      "name": "John Doe",
      "createdAt": "2026-02-07T10:30:00Z"
    }
  }
}
```

**Error Response** (401 Unauthorized):
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token"
  }
}
```

---

### POST /auth/logout

Logout user (optional - invalidate token on server).

**Headers**: Authorization required

**Success Response** (200 OK):
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Prompts

### GET /prompts

Retrieve all prompts for authenticated user.

**Headers**: Authorization required

**Query Parameters**:
- `search` (optional): Search in title, content, tags
- `bucketId` (optional): Filter by bucket ID
- `sort` (optional): `newest`, `oldest`, `a-z`, `z-a` (default: `newest`)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 50, max: 100)

**Example Request**:
```
GET /api/v1/prompts?search=email&bucketId=bkt_123&sort=newest&page=1&limit=20
```

**Success Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "prompts": [
      {
        "id": "prm_1234567890",
        "title": "Email Writer",
        "content": "Help me write a professional email...",
        "bucketId": "bkt_123",
        "tags": ["email", "communication"],
        "createdAt": "2026-02-01T10:00:00Z",
        "updatedAt": "2026-02-07T15:30:00Z",
        "userId": "usr_1234567890"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "totalPages": 3
    }
  }
}
```

---

### GET /prompts/:id

Get a single prompt by ID.

**Headers**: Authorization required

**URL Parameters**:
- `id`: Prompt ID

**Success Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "prompt": {
      "id": "prm_1234567890",
      "title": "Email Writer",
      "content": "Help me write a professional email...",
      "bucketId": "bkt_123",
      "tags": ["email", "communication"],
      "createdAt": "2026-02-01T10:00:00Z",
      "updatedAt": "2026-02-07T15:30:00Z",
      "userId": "usr_1234567890"
    }
  }
}
```

**Error Response** (404 Not Found):
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Prompt not found"
  }
}
```

---

### POST /prompts

Create a new prompt.

**Headers**: Authorization required

**Request Body**:
```json
{
  "title": "Email Writer",
  "content": "Help me write a professional email about [topic]...",
  "bucketId": "bkt_123",
  "tags": ["email", "communication"]
}
```

**Validation Rules**:
- `title`: Required, 1-200 characters
- `content`: Required, minimum 1 character
- `bucketId`: Optional, must be valid bucket ID owned by user or null
- `tags`: Optional array of strings, max 10 tags, each max 30 characters

**Success Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "prompt": {
      "id": "prm_9876543210",
      "title": "Email Writer",
      "content": "Help me write a professional email about [topic]...",
      "bucketId": "bkt_123",
      "tags": ["email", "communication"],
      "createdAt": "2026-02-08T12:00:00Z",
      "updatedAt": "2026-02-08T12:00:00Z",
      "userId": "usr_1234567890"
    }
  }
}
```

**Error Response** (400 Bad Request):
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "fields": {
      "title": "Title is required",
      "content": "Content cannot be empty"
    }
  }
}
```

---

### PUT /prompts/:id

Update an existing prompt.

**Headers**: Authorization required

**URL Parameters**:
- `id`: Prompt ID

**Request Body** (all fields optional):
```json
{
  "title": "Updated Email Writer",
  "content": "Updated content...",
  "bucketId": "bkt_456",
  "tags": ["email", "business", "updated"]
}
```

**Validation Rules**: Same as POST /prompts

**Success Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "prompt": {
      "id": "prm_1234567890",
      "title": "Updated Email Writer",
      "content": "Updated content...",
      "bucketId": "bkt_456",
      "tags": ["email", "business", "updated"],
      "createdAt": "2026-02-01T10:00:00Z",
      "updatedAt": "2026-02-08T12:30:00Z",
      "userId": "usr_1234567890"
    }
  }
}
```

**Error Response** (404 Not Found):
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Prompt not found"
  }
}
```

**Error Response** (403 Forbidden):
```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "You don't have permission to update this prompt"
  }
}
```

---

### DELETE /prompts/:id

Delete a prompt.

**Headers**: Authorization required

**URL Parameters**:
- `id`: Prompt ID

**Success Response** (200 OK):
```json
{
  "success": true,
  "message": "Prompt deleted successfully"
}
```

**Error Response** (404 Not Found):
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Prompt not found"
  }
}
```

---

## Buckets

### GET /buckets

Get all buckets for authenticated user.

**Headers**: Authorization required

**Query Parameters**:
- `sort` (optional): `newest`, `oldest`, `a-z` (default: `newest`)

**Success Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "buckets": [
      {
        "id": "bkt_1234567890",
        "name": "Work",
        "color": "#6366F1",
        "icon": "Folder",
        "createdAt": "2026-01-15T10:00:00Z",
        "userId": "usr_1234567890",
        "promptCount": 12
      },
      {
        "id": "bkt_9876543210",
        "name": "Personal",
        "color": "#10B981",
        "icon": "FolderOpen",
        "createdAt": "2026-01-20T14:30:00Z",
        "userId": "usr_1234567890",
        "promptCount": 8
      }
    ]
  }
}
```

---

### GET /buckets/:id

Get a single bucket with its prompts.

**Headers**: Authorization required

**URL Parameters**:
- `id`: Bucket ID

**Success Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "bucket": {
      "id": "bkt_1234567890",
      "name": "Work",
      "color": "#6366F1",
      "icon": "Folder",
      "createdAt": "2026-01-15T10:00:00Z",
      "userId": "usr_1234567890",
      "promptCount": 12
    },
    "prompts": [
      {
        "id": "prm_1234567890",
        "title": "Email Writer",
        "content": "Help me write...",
        "bucketId": "bkt_1234567890",
        "tags": ["email"],
        "createdAt": "2026-02-01T10:00:00Z",
        "updatedAt": "2026-02-07T15:30:00Z"
      }
    ]
  }
}
```

---

### POST /buckets

Create a new bucket.

**Headers**: Authorization required

**Request Body**:
```json
{
  "name": "Work Projects",
  "color": "#6366F1",
  "icon": "Folder"
}
```

**Validation Rules**:
- `name`: Required, 1-50 characters, unique per user
- `color`: Required, valid hex color code
- `icon`: Required, valid icon name from allowed list

**Allowed Icons**:
`Folder`, `FolderOpen`, `FileText`, `Tag`, `Hash`, `Home`, `Calendar`, `Clock`, `Settings`

**Success Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "bucket": {
      "id": "bkt_9999888877",
      "name": "Work Projects",
      "color": "#6366F1",
      "icon": "Folder",
      "createdAt": "2026-02-08T13:00:00Z",
      "userId": "usr_1234567890",
      "promptCount": 0
    }
  }
}
```

**Error Response** (400 Bad Request):
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "fields": {
      "name": "Bucket name already exists"
    }
  }
}
```

---

### PUT /buckets/:id

Update an existing bucket.

**Headers**: Authorization required

**URL Parameters**:
- `id`: Bucket ID

**Request Body** (all fields optional):
```json
{
  "name": "Updated Work",
  "color": "#4338CA",
  "icon": "FolderOpen"
}
```

**Validation Rules**: Same as POST /buckets

**Success Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "bucket": {
      "id": "bkt_1234567890",
      "name": "Updated Work",
      "color": "#4338CA",
      "icon": "FolderOpen",
      "createdAt": "2026-01-15T10:00:00Z",
      "userId": "usr_1234567890",
      "promptCount": 12
    }
  }
}
```

---

### DELETE /buckets/:id

Delete a bucket. All prompts in the bucket will have their `bucketId` set to `null`.

**Headers**: Authorization required

**URL Parameters**:
- `id`: Bucket ID

**Success Response** (200 OK):
```json
{
  "success": true,
  "message": "Bucket deleted successfully",
  "data": {
    "affectedPrompts": 12
  }
}
```

**Error Response** (404 Not Found):
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Bucket not found"
  }
}
```

---

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Request validation failed |
| `UNAUTHORIZED` | 401 | Missing or invalid authentication token |
| `INVALID_CREDENTIALS` | 401 | Invalid email or password |
| `FORBIDDEN` | 403 | User doesn't have permission |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource already exists |
| `INTERNAL_ERROR` | 500 | Server error |

---

## Rate Limiting

- **Rate Limit**: 100 requests per minute per user
- **Headers**:
  - `X-RateLimit-Limit`: Total requests allowed
  - `X-RateLimit-Remaining`: Requests remaining
  - `X-RateLimit-Reset`: Unix timestamp when limit resets

**Rate Limit Error** (429 Too Many Requests):
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again later.",
    "retryAfter": 45
  }
}
```

---

## Implementation Notes

### Database Schema

**Users Table**:
```sql
CREATE TABLE users (
  id VARCHAR(20) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**Prompts Table**:
```sql
CREATE TABLE prompts (
  id VARCHAR(20) PRIMARY KEY,
  user_id VARCHAR(20) NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  bucket_id VARCHAR(20),
  tags JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (bucket_id) REFERENCES buckets(id) ON DELETE SET NULL
);
```

**Buckets Table**:
```sql
CREATE TABLE buckets (
  id VARCHAR(20) PRIMARY KEY,
  user_id VARCHAR(20) NOT NULL,
  name VARCHAR(50) NOT NULL,
  color VARCHAR(7) NOT NULL,
  icon VARCHAR(30) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_bucket_name (user_id, name)
);
```

### Security Requirements

1. **Password Hashing**: Use bcrypt with cost factor 10+
2. **JWT**: HS256 algorithm, 24-hour expiration
3. **CORS**: Configure allowed origins
4. **Input Sanitization**: Sanitize all user inputs
5. **SQL Injection Prevention**: Use parameterized queries
6. **XSS Prevention**: Escape HTML in responses

### Frontend Integration

Update `ApiStorageAdapter` in `src/shared/services/storage/api-storage-adapter.ts`:

1. Store JWT token in localStorage or httpOnly cookie
2. Include token in all requests: `Authorization: Bearer ${token}`
3. Handle 401 responses by redirecting to login
4. Implement token refresh logic
5. Add loading states and error handling
6. Map API responses to frontend types

**Example API Client**:
```typescript
const API_BASE = process.env.VITE_API_URL || 'http://localhost:3000/api/v1'

async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('auth_token')

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    throw new Error(data.error?.message || 'API request failed')
  }

  return data
}
```

---

## Testing Checklist

- [ ] All endpoints return correct status codes
- [ ] Authentication works correctly (signup, login, protected routes)
- [ ] CRUD operations for prompts work
- [ ] CRUD operations for buckets work
- [ ] Bucket deletion sets prompt `bucketId` to null
- [ ] Search and filtering work correctly
- [ ] Pagination works
- [ ] Rate limiting is enforced
- [ ] Error responses are consistent
- [ ] Input validation catches all edge cases
- [ ] SQL injection attempts are blocked
- [ ] XSS attempts are sanitized
- [ ] Unauthorized access is prevented
