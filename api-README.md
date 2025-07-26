# Contact Form API

Dedicated API server for handling contact form submissions from chrisvred.com

## Deployment

This API should be deployed to a separate Replit project:

1. Create a new Replit project
2. Copy these files:
   - `api-server.ts`
   - `api-package.json` (rename to `package.json`)
   - `.replit-api` (rename to `.replit`)
3. Set the `SENDGRID_EMAIL_API_KEY` secret
4. Deploy to get the endpoint URL
5. Update the frontend fetch URL to point to the deployed endpoint

## Endpoints

- `POST /send` - Send contact form email
- `GET /health` - Health check

## CORS

Configured to allow requests from `https://chrisvred.com`