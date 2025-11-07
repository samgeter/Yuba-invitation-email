# 🚀 Quick Setup Guide

Follow these steps to get the Yuba invitation email system running:

## Step 1: Install Node.js Dependencies

```bash
npm install
```

This will install:
- `nodemailer` - For sending emails via Gmail SMTP
- `dotenv` - For loading environment variables

## Step 2: Get Your Gmail App Password

**⚠️ IMPORTANT:** You CANNOT use your regular Gmail password!

### How to get a Gmail App Password:

1. **Enable 2-Step Verification** (if not already enabled)
   - Go to: https://myaccount.google.com/security
   - Click "2-Step Verification" and follow the setup

2. **Generate App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" as the app
   - Select "Windows Computer" (or other device)
   - Click "Generate"
   - Copy the 16-character password (format: `xxxx xxxx xxxx xxxx`)

## Step 3: Create Your .env File

Copy the example file:

```bash
copy .env.example .env
```

Edit `.env` and add your credentials:

```env
GMAIL_USER=samget2010@gmail.com
GMAIL_PASS=abcd efgh ijkl mnop
```

Replace `abcd efgh ijkl mnop` with your actual 16-character App Password.

## Step 4: Test the System

Run the demo script:

```bash
npm start
```

This will send 5 test emails to example addresses. Check the console output for success messages.

## Step 5: Use in Your Application

```javascript
require('dotenv').config();
const { sendInvitationEmail } = require('./mailer/sendInvitation');

// Example: Send an organization admin invite
async function sendOrgAdminInvite() {
  await sendInvitationEmail('org_admin', 'admin@example.com', {
    accept_link: 'https://yuba.com/invite/abc123'
  });
}

sendOrgAdminInvite();
```

## 📋 Available Email Types

| Type | Function Parameters |
|------|-------------------|
| `org_admin` | `{ accept_link }` |
| `individual_member` | `{ organization_name, credit_amount, accept_link }` |
| `team_admin` | `{ organization_name, credit_amount, accept_link }` |
| `teammate_from_org` | `{ team_name, team_admin_name, accept_link }` |
| `teammate_no_org` | `{ team_name, accept_link }` |

## 🐛 Troubleshooting

### "Invalid login" error
- Make sure you're using the App Password, not your regular Gmail password
- Verify 2-Step Verification is enabled

### "ENOENT: no such file or directory"
- Make sure the `emails/` folder exists with all 5 HTML templates

### Emails not arriving
- Check spam/junk folder
- Verify recipient email is correct
- Check Gmail "Sent" folder

## ✅ You're Ready!

Your email system is now configured and ready to send Yuba invitation emails!
