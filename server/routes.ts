import type { Express } from "express";
import { createServer, type Server } from "http";
import { MailService } from '@sendgrid/mail';
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve content files (for projects) 
  app.get('/api/content/projects/:filename', async (req, res) => {
    try {
      const fs = await import('fs');
      const path = await import('path');
      
      const filename = req.params.filename;
      if (!filename.endsWith('.md')) {
        return res.status(400).send('Only markdown files allowed');
      }
      
      const filePath = path.join(process.cwd(), 'content', 'projects', filename);
      
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        res.setHeader('Content-Type', 'text/plain');
        res.send(content);
      } else {
        res.status(404).send('File not found');
      }
    } catch (error) {
      console.error('Error serving content file:', error);
      res.status(500).send('Internal server error');
    }
  });

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
        from: 'contact@chrisvred.com', // Use verified domain address
        replyTo: email, // Set the visitor's email as reply-to
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

  const httpServer = createServer(app);

  return httpServer;
}
