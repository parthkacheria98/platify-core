import nodemailer from 'nodemailer';

// Create transporter with Gmail SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

// Escape HTML to prevent XSS
const escapeHtml = (text) => {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

export const sendContactEmail = async ({ name, email, company, message }) => {
  const transporter = createTransporter();

  // Sanitize inputs
  const sanitizedName = escapeHtml(name);
  const sanitizedEmail = escapeHtml(email);
  const sanitizedCompany = company ? escapeHtml(company) : '';
  const sanitizedMessage = escapeHtml(message);

  // Email content
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: 'build@platify.cloud',
    subject: `New Contact Form Submission from ${sanitizedName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #333; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="margin-top: 20px;">
          <p><strong>Name:</strong> ${sanitizedName}</p>
          <p><strong>Email:</strong> <a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></p>
          ${sanitizedCompany ? `<p><strong>Company:</strong> ${sanitizedCompany}</p>` : ''}
        </div>
        
        <div style="margin-top: 30px;">
          <h3 style="color: #333;">Message:</h3>
          <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #333; margin-top: 10px;">
            <p style="white-space: pre-wrap; margin: 0;">${sanitizedMessage}</p>
          </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
          <p>This email was sent from the Platify contact form.</p>
          <p>You can reply directly to this email to respond to ${sanitizedName}.</p>
        </div>
      </div>
    `,
    replyTo: email, // Allow replying directly to the sender
  };

  await transporter.sendMail(mailOptions);
};

