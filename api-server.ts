import express from 'express';
import { MailService } from '@sendgrid/mail';

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// Middleware
app.use(express.json());

// CORS configuration for your domain
app.use((req, res, next) => {
  const allowedOrigins = ['https://chrisvred.com', 'http://localhost:5173', 'http://localhost:5000'];
  const origin = req.headers.origin;
  
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  
  next();
});

// Contact form endpoint
app.post('/send', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Name, email, and message are required' 
      });
    }

    // Check if SendGrid API key is available
    if (!process.env.SENDGRID_EMAIL_API_KEY) {
      console.error('SENDGRID_EMAIL_API_KEY not configured');
      return res.status(500).json({ 
        error: 'Email service not configured' 
      });
    }

    // Initialize SendGrid
    const mailService = new MailService();
    mailService.setApiKey(process.env.SENDGRID_EMAIL_API_KEY);

    // Email content  
    const emailData = {
      to: 'cvredenburgh@gmail.com',
      from: 'cvredenburgh@gmail.com', // Use verified Gmail address
      replyTo: email, // Set the visitor's email as reply-to
      subject: `Contact Form: ${subject || 'Website Message'}`,
      html: `
        <h3>New Contact Form Message</h3>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>This message was sent from your website contact form.</small></p>
      `,
      text: `
New Contact Form Message

From: ${name} (${email})
Subject: ${subject || 'No subject'}

Message:
${message}

---
This message was sent from your website contact form.
      `.trim()
    };

    // Send email
    await mailService.send(emailData);

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Log more details for debugging
    if (error && typeof error === 'object' && 'response' in error) {
      const sgError = error as any;
      console.error('SendGrid error details:', {
        code: sgError.code,
        message: sgError.message,
        body: sgError.response?.body,
        errors: sgError.response?.body?.errors
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to send email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'Contact Form API' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Contact Form API running on port ${PORT}`);
});