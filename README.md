# Yuba Invitation Email System

A Node.js email system for sending Yuba invitation emails via Gmail SMTP using Nodemailer.

## 📁 Project Structure

```
.
├── emails/                          # HTML email templates
│   ├── invitation_org_admin.html
│   ├── invitation_individual_member.html
│   ├── invitation_team_admin.html
│   ├── invitation_teammate_from_org.html
│   └── invitation_teammate_no_org.html
├── mailer/                          # Email system modules
│   ├── transport.js                 # Nodemailer SMTP configuration
│   ├── templates.js                 # Template loading and placeholder replacement
│   └── sendInvitation.js            # Main email sending function
├── demoSend.js                      # Demo script to test email sending
├── package.json                     # Node.js dependencies
├── .env.example                     # Environment variables template
└── README.md                        # This file
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Gmail App Password

**IMPORTANT:** You cannot use your regular Gmail password. You must create an App Password.

#### Steps to get Gmail App Password:

1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification** (enable if not already enabled)
3. Go to **Security** → **App passwords**
4. Select **Mail** as the app and generate a password
5. Copy the 16-character password (it will look like: `xxxx xxxx xxxx xxxx`)

### 3. Create `.env` File

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
GMAIL_USER=samget2010@gmail.com
GMAIL_PASS=your-16-char-app-password
```

### 4. Create `emails/` Folder

Make sure you have an `emails/` folder with all 5 HTML templates:

```bash
mkdir emails
```

Move your HTML templates into this folder:
- `invitation_org_admin.html`
- `invitation_individual_member.html`
- `invitation_team_admin.html`
- `invitation_teammate_from_org.html`
- `invitation_teammate_no_org.html`

### 5. Run Demo

```bash
npm start
```

This will send 5 test emails to example addresses.

## 📧 Email Types

### 1. Organization Admin (`org_admin`)

**Parameters:**
- `accept_link` (string): Invitation acceptance URL

**Example:**
```javascript
await sendInvitationEmail('org_admin', 'admin@example.com', {
  accept_link: 'https://yuba.com/invite/abc123'
});
```

### 2. Individual Member (`individual_member`)

**Parameters:**
- `organization_name` (string): Name of the organization
- `credit_amount` (number): Credits allocated
- `accept_link` (string): Invitation acceptance URL

**Example:**
```javascript
await sendInvitationEmail('individual_member', 'member@example.com', {
  organization_name: 'Acme Corp',
  credit_amount: 100,
  accept_link: 'https://yuba.com/invite/xyz789'
});
```

### 3. Team Admin (`team_admin`)

**Parameters:**
- `organization_name` (string): Name of the organization
- `credit_amount` (number): Credits allocated
- `accept_link` (string): Invitation acceptance URL

**Example:**
```javascript
await sendInvitationEmail('team_admin', 'team-admin@example.com', {
  organization_name: 'Tech Inc',
  credit_amount: 500,
  accept_link: 'https://yuba.com/invite/def456'
});
```

### 4. Teammate from Organization (`teammate_from_org`)

**Parameters:**
- `team_name` (string): Name of the team
- `team_admin_name` (string): Name of the team admin
- `accept_link` (string): Invitation acceptance URL

**Example:**
```javascript
await sendInvitationEmail('teammate_from_org', 'teammate@example.com', {
  team_name: 'Engineering Team',
  team_admin_name: 'John Smith',
  accept_link: 'https://yuba.com/invite/ghi789'
});
```

### 5. Teammate (No Organization) (`teammate_no_org`)

**Parameters:**
- `team_name` (string): Name of the team
- `accept_link` (string): Invitation acceptance URL

**Example:**
```javascript
await sendInvitationEmail('teammate_no_org', 'teammate@example.com', {
  team_name: 'Freelance Team',
  accept_link: 'https://yuba.com/invite/jkl012'
});
```

## 🔧 Usage in Your Application

```javascript
require('dotenv').config();
const { sendInvitationEmail } = require('./mailer/sendInvitation');

// Send an invitation
async function sendInvite() {
  try {
    await sendInvitationEmail('individual_member', 'user@example.com', {
      organization_name: 'My Company',
      credit_amount: 100,
      accept_link: 'https://yuba.com/invite/unique-token'
    });
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}

sendInvite();
```

## 🛠️ Troubleshooting

### "Invalid login" or "Authentication failed"

- Make sure you're using a Gmail **App Password**, not your regular password
- Verify 2-Step Verification is enabled on your Gmail account
- Check that your `.env` file has the correct credentials

### "ENOENT: no such file or directory"

- Make sure the `emails/` folder exists
- Verify all 5 HTML template files are in the `emails/` folder

### Emails not arriving

- Check your spam/junk folder
- Verify the recipient email address is correct
- Check Gmail's "Sent" folder to confirm the email was sent

## 📝 License

ISC
