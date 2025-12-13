# Backend Server

This server handles contact form submissions and sends emails via Gmail SMTP.

## Setup

1. Create a `.env` file in the root directory with the following variables:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=parthkacheria@gmail.com
SMTP_PASSWORD=bqvx rdlk vpqt phic
PORT=3010
FRONTEND_URL=http://localhost:8080
```

2. Install dependencies:
```bash
npm install
```

3. Run the server:
```bash
npm run dev:server
```

Or run both frontend and backend together:
```bash
npm run dev:all
```

## API Endpoints

### Contact Form

#### POST /api/contact

Sends a contact form submission via email.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Example Corp",
  "message": "Hello, I'm interested in your services."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your message has been sent successfully. We'll be in touch within 24 hours."
}
```

### Blog Posts

#### GET /api/blog/posts

Get all blog posts. Optionally filter by published status.

**Query Parameters:**
- `published` (optional): Set to `"true"` to only get published posts

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "Post Title",
      "slug": "post-slug",
      "excerpt": "Post excerpt...",
      "category": "Category",
      "date": "2024-03-15",
      "readTime": "8 min read",
      "content": "Full content...",
      "published": true
    }
  ]
}
```

#### GET /api/blog/posts/:slug

Get a single blog post by slug.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "title": "Post Title",
    "slug": "post-slug",
    "excerpt": "Post excerpt...",
    "category": "Category",
    "date": "2024-03-15",
    "readTime": "8 min read",
    "content": "Full content...",
    "published": true
  }
}
```

#### POST /api/blog/posts

Create a new blog post.

**Request Body:**
```json
{
  "title": "Post Title",
  "slug": "post-slug",
  "excerpt": "Post excerpt...",
  "category": "Category",
  "date": "2024-03-15",
  "readTime": "8 min read",
  "content": "Full content...",
  "published": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Post created successfully",
  "data": { /* created post */ }
}
```

#### PUT /api/blog/posts/:id

Update an existing blog post.

**Request Body:**
```json
{
  "title": "Updated Title",
  "slug": "updated-slug",
  "excerpt": "Updated excerpt...",
  "category": "Category",
  "date": "2024-03-15",
  "readTime": "8 min read",
  "content": "Updated content...",
  "published": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Post updated successfully",
  "data": { /* updated post */ }
}
```

#### DELETE /api/blog/posts/:id

Delete a blog post.

**Response:**
```json
{
  "success": true,
  "message": "Post deleted successfully"
}
```

## Security

- All credentials are stored in `.env` file which is gitignored
- Credentials never appear in client-side code
- CORS is configured to only allow requests from the frontend URL

