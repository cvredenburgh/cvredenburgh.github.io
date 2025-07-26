import type { Express } from "express";
import { createServer, type Server } from "http";
import { MailService } from '@sendgrid/mail';
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;

      // Validate required fields
      if (!name || !email || !message) {
        return res.status(400).json({ 
          error: 'Name, email, and message are required' 
        });
      }

      // Check if SendGrid API key is available
      if (!process.env.SENDGRID_API_KEY) {
        console.error('SENDGRID_API_KEY not configured');
        return res.status(500).json({ 
          error: 'Email service not configured' 
        });
      }

      // Initialize SendGrid
      const mailService = new MailService();
      mailService.setApiKey(process.env.SENDGRID_API_KEY);

      // Email content
      const emailData = {
        to: 'cvredenburgh@gmail.com',
        from: 'noreply@chrisvred.com', // You can use any from address
        subject: `Contact Form: ${subject}`,
        html: `
          <h3>New Contact Form Message</h3>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><small>This message was sent from your website contact form.</small></p>
        `,
        text: `
New Contact Form Message

From: ${name} (${email})
Subject: ${subject}

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
      res.status(500).json({ 
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
