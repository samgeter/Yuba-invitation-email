// demoSend.js
// Demo script to test sending Yuba invitation emails

require('dotenv').config();
const { sendInvitationEmail } = require('./mailer/sendInvitation');

/**
 * Main demo function to send test invitation emails
 */
async function runDemo() {
  console.log('=================================================');
  console.log('🚀 Yuba Invitation Email Demo');
  console.log('=================================================\n');

  // Check if environment variables are set
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    console.error('❌ ERROR: Missing environment variables!');
    console.error('Please create a .env file with GMAIL_USER and GMAIL_PASS');
    console.error('See .env.example for reference\n');
    process.exit(1);
  }

  console.log(`📧 Sending from: ${process.env.GMAIL_USER}\n`);

  try {
    // Demo 1: Send Organization Admin invitation
    console.log('--- Demo 1: Organization Admin Invitation ---');
    await sendInvitationEmail('org_admin', 'samget2010@gmail.com', {
      accept_link: 'https://yuba.com/invite/org-admin-abc123'
    });
    console.log('');

    // Demo 2: Send Individual Member invitation
    console.log('--- Demo 2: Individual Member Invitation ---');
    await sendInvitationEmail('individual_member', 'samget2010@gmail.com', {
      organization_name: 'Acme Corporation',
      credit_amount: 100,
      accept_link: 'https://yuba.com/invite/member-xyz789'
    });
    console.log('');

    // Demo 3: Send Team Admin invitation
    console.log('--- Demo 3: Team Admin Invitation ---');
    await sendInvitationEmail('team_admin', 'samget2010@gmail.com', {
      organization_name: 'Tech Innovators Inc',
      credit_amount: 500,
      accept_link: 'https://yuba.com/invite/team-admin-def456'
    });
    console.log('');

    // Demo 4: Send Teammate (from Organization) invitation
    console.log('--- Demo 4: Teammate from Organization Invitation ---');
    await sendInvitationEmail('teammate_from_org', 'samget2010@gmail.com', {
      team_name: 'Engineering Team',
      team_admin_name: 'John Smith',
      accept_link: 'https://yuba.com/invite/teammate-ghi789'
    });
    console.log('');

    // Demo 5: Send Teammate (No Organization) invitation
    console.log('--- Demo 5: Teammate (No Organization) Invitation ---');
    await sendInvitationEmail('teammate_no_org', 'samget2010@gmail.com', {
      team_name: 'Freelance Designers',
      accept_link: 'https://yuba.com/invite/teammate-jkl012'
    });
    console.log('');

    console.log('=================================================');
    console.log('✅ All demo emails sent successfully!');
    console.log('=================================================\n');

  } catch (error) {
    console.error('\n=================================================');
    console.error('❌ Demo failed with error:');
    console.error('=================================================');
    console.error(error);
    console.error('\nPlease check:');
    console.error('1. Your .env file has correct GMAIL_USER and GMAIL_PASS');
    console.error('2. You are using a Gmail App Password (not regular password)');
    console.error('3. Your Gmail account has 2-Step Verification enabled');
    console.error('4. The emails/ folder exists with all 5 HTML templates\n');
    process.exit(1);
  }
}

// Run the demo
runDemo();
