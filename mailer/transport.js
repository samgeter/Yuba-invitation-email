// mailer/transport.js
// Configures and exports the Nodemailer transporter for Gmail SMTP

const nodemailer = require('nodemailer');
require('dotenv').config();

/**
 * Gmail SMTP Configuration
 * 
 * IMPORTANT: Before using this, you must:
 * 1. Enable 2-Step Verification on your Gmail account
 * 2. Generate an App Password (Google Account > Security > App passwords)
 * 3. Use the App Password (not your regular password) in GMAIL_PASS
 * 
 * Gmail SMTP Settings:
 * - Host: smtp.gmail.com
 * - Port: 587 (STARTTLS)
 * - Secure: false (we're using STARTTLS, not direct SSL)
 */

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use STARTTLS (upgrade to TLS)
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  },
  // Optional: Add these for better debugging
  logger: false, // Set to true to see SMTP logs
  debug: false   // Set to true for detailed debugging
});

/**
 * Verify the transporter configuration on startup
 * This helps catch configuration errors early
 */
transporter.verify(function(error, success) {
  if (error) {
    console.error('❌ SMTP Configuration Error:', error.message);
    console.error('Please check your .env file and Gmail App Password');
  } else {
    console.log('✅ SMTP Server is ready to send emails');
  }
});

module.exports = transporter;
