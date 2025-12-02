# Backend Server

This server handles contact form submissions and sends emails via Gmail SMTP.

## Setup

1. Create a `.env` file in the root directory with the following variables:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=parthkacheria@gmail.com
SMTP_PASSWORD=bqvx rdlk vpqt phic
PORT=3001
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

### POST /api/contact

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

## Security

- All credentials are stored in `.env` file which is gitignored
- Credentials never appear in client-side code
- CORS is configured to only allow requests from the frontend URL

