
# 📘 API Routes Documentation — Freelance Matching Platform (Go + Gin)

## 🌐 Base URL

```
http://localhost:8000/api
```

---

## 🔐 Authentication

### `POST /register`
Registers a new user.

**Request Body:**
```json
{
  "name": "Jordan",
  "email": "jordan@mail.com",
  "password": "secure123"
}
```

---

### `POST /login`
Logs in a user and returns a JWT.

**Request Body:**
```json
{
  "email": "jordan@mail.com",
  "password": "secure123"
}
```

**Response:**
```json
{
  "token": "<jwt_token>"
}
```

---

## 👤 User / Freelancer

### `GET /profile`
Fetch the authenticated user's profile.  
🔒 Requires JWT.

---

### `PUT /profile`
Update user profile.  
🔒 Requires JWT.

**Request Body:**
```json
{
  "bio": "Web developer",
  "skills": "Golang, Next.js",
  "location": "Jakarta"
}
```

---

### `GET /freelancers`
List/search freelancers.

**Query Parameters:**
- `skill`
- `location`

🔒 Requires JWT.

---

### `GET /freelancers/:id`
Fetch a specific public freelancer profile.  
🔒 Requires JWT.

---

## 📄 Jobs

### `GET /jobs`
List all job postings.  
🔒 Requires JWT.

---

### `POST /jobs`
Create a new job post.

**Request Body:**
```json
{
  "title": "Need UI Designer",
  "description": "Landing page for jewelry",
  "budget": 1000000,
  "deadline": "2025-08-31"
}
```

🔒 Requires JWT.

---

### `GET /jobs/:id`
View a specific job post.  
🔒 Requires JWT.

---

### `DELETE /jobs/:id`
Delete a job (owner only).  
🔒 Requires JWT.

---

## ⭐ Reviews

### `POST /reviews`
Leave a review for a freelancer.

**Request Body:**
```json
{
  "to_user_id": 2,
  "rating": 5,
  "comment": "Great work!"
}
```

🔒 Requires JWT.

---

### `GET /freelancers/:id/reviews`
Get all reviews for a freelancer.  
🔒 Requires JWT.

---

## 💰 Escrow (Xendit or Midtrans)

### `POST /escrow/initiate`
Start an escrow payment (QRIS).

**Request Body:**
```json
{
  "job_id": 12,
  "freelancer_id": 5,
  "amount": 1500000
}
```

🔒 Requires JWT.

---

### `POST /escrow/webhook`
Webhook endpoint for payment gateway.  
🔓 Public (should be secured via Xendit/Midtrans signature validation).

---

### `POST /escrow/release`
Release funds to freelancer.

**Request Body:**
```json
{
  "transaction_id": 23
}
```

🔒 Requires JWT.

---

## 🛡 Admin Routes

### `GET /admin/jobs`
List all jobs.  
🔒 Admin only.

---

### `DELETE /admin/freelancers/:id`
Delete a freelancer.  
🔒 Admin only.

---

### `POST /admin/flag`
Flag inappropriate content.

**Request Body:**
```json
{
  "entity": "job",
  "id": 42,
  "reason": "Spam"
}
```

🔒 Admin only.

---

## 🧪 Debug & Utilities

### `GET /health`
Basic health check.  
Returns `{ "status": "ok" }`.  
🔓 Public.

---

### `GET /`
List all registered routes (dev only).  
🔓 Public.

---

## 🔐 JWT Auth Header

All protected routes require this header:

```http
Authorization: Bearer <JWT>
```

Use the `/login` endpoint to obtain a token.
