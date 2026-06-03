# ARTCF Backend

Node.js/Express backend for the ARTCF Rwanda website.

## Setup

```bash
npm install
npm run dev    # development with nodemon
npm start      # production
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/newsletter` | Subscribe to newsletter |
| GET | `/api/events` | List events (optional `?category=upcoming\|past`) |
| GET | `/api/programs` | List programs |

## Email Configuration

To enable email notifications, set environment variables:
```
EMAIL_USER=artcfr@gmail.com
EMAIL_PASS=your_app_password
```

The server runs on **port 5000** by default.
