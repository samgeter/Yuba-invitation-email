// example-usage.js
// Production-ready examples of how to use the email system in your application

require('dotenv').config();
const { sendInvitationEmail } = require('./mailer/sendInvitation');

/**
 * Example 1: Send Organization Admin Invitation
 * Use this when creating a new organization and inviting the admin
 */
async function inviteOrganizationAdmin(adminEmail, inviteToken) {
  try {
    await sendInvitationEmail('org_admin', adminEmail, {
      accept_link: `https://yuba.com/invite/${inviteToken}`
    });
    console.log(`✅ Organization admin invitation sent to ${adminEmail}`);
    return { success: true };
  } catch (error) {
    console.error(`❌ Failed to send org admin invite:`, error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Example 2: Send Individual Member Invitation
 * Use this when an organization invites a new individual member
 */
async function inviteIndividualMember(memberEmail, orgName, credits, inviteToken) {
  try {
    await sendInvitationEmail('individual_member', memberEmail, {
      organization_name: orgName,
      credit_amount: credits,
      accept_link: `https://yuba.com/invite/${inviteToken}`
    });
    console.log(`✅ Individual member invitation sent to ${memberEmail}`);
    return { success: true };
  } catch (error) {
    console.error(`❌ Failed to send member invite:`, error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Example 3: Send Team Admin Invitation
 * Use this when an organization creates a team and invites a team admin
 */
async function inviteTeamAdmin(adminEmail, orgName, credits, inviteToken) {
  try {
    await sendInvitationEmail('team_admin', adminEmail, {
      organization_name: orgName,
      credit_amount: credits,
      accept_link: `https://yuba.com/invite/${inviteToken}`
    });
    console.log(`✅ Team admin invitation sent to ${adminEmail}`);
    return { success: true };
  } catch (error) {
    console.error(`❌ Failed to send team admin invite:`, error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Example 4: Send Teammate Invitation (from Organization)
 * Use this when a team admin invites a teammate to their team
 */
async function inviteTeammateFromOrg(teammateEmail, teamName, adminName, inviteToken) {
  try {
    await sendInvitationEmail('teammate_from_org', teammateEmail, {
      team_name: teamName,
      team_admin_name: adminName,
      accept_link: `https://yuba.com/invite/${inviteToken}`
    });
    console.log(`✅ Teammate invitation sent to ${teammateEmail}`);
    return { success: true };
  } catch (error) {
    console.error(`❌ Failed to send teammate invite:`, error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Example 5: Send Teammate Invitation (No Organization)
 * Use this when inviting someone to a standalone team
 */
async function inviteTeammateNoOrg(teammateEmail, teamName, inviteToken) {
  try {
    await sendInvitationEmail('teammate_no_org', teammateEmail, {
      team_name: teamName,
      accept_link: `https://yuba.com/invite/${inviteToken}`
    });
    console.log(`✅ Teammate invitation sent to ${teammateEmail}`);
    return { success: true };
  } catch (error) {
    console.error(`❌ Failed to send teammate invite:`, error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Example 6: Batch Send Invitations
 * Use this when you need to send multiple invitations at once
 */
async function batchSendInvitations(invitations) {
  const results = [];
  
  for (const invite of invitations) {
    try {
      await sendInvitationEmail(invite.type, invite.email, invite.params);
      results.push({ email: invite.email, success: true });
      console.log(`✅ Sent ${invite.type} invitation to ${invite.email}`);
      
      // Add a small delay between emails to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      results.push({ email: invite.email, success: false, error: error.message });
      console.error(`❌ Failed to send to ${invite.email}:`, error.message);
    }
  }
  
  return results;
}

/**
 * Example 7: Integration with Express.js API
 * Use this pattern in your Express routes
 */
function setupExpressRoutes(app) {
  // POST /api/invitations/org-admin
  app.post('/api/invitations/org-admin', async (req, res) => {
    const { email, inviteToken } = req.body;
    
    if (!email || !inviteToken) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const result = await inviteOrganizationAdmin(email, inviteToken);
    
    if (result.success) {
      return res.json({ message: 'Invitation sent successfully' });
    } else {
      return res.status(500).json({ error: result.error });
    }
  });
  
  // POST /api/invitations/member
  app.post('/api/invitations/member', async (req, res) => {
    const { email, organizationName, credits, inviteToken } = req.body;
    
    if (!email || !organizationName || !credits || !inviteToken) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const result = await inviteIndividualMember(email, organizationName, credits, inviteToken);
    
    if (result.success) {
      return res.json({ message: 'Invitation sent successfully' });
    } else {
      return res.status(500).json({ error: result.error });
    }
  });
  
  // Add more routes as needed...
}

// Export functions for use in other modules
module.exports = {
  inviteOrganizationAdmin,
  inviteIndividualMember,
  inviteTeamAdmin,
  inviteTeammateFromOrg,
  inviteTeammateNoOrg,
  batchSendInvitations,
  setupExpressRoutes
};

// If running this file directly, run some examples
if (require.main === module) {
  console.log('Running example invitations...\n');
  
  // Example usage
  (async () => {
    // Single invitation
    await inviteOrganizationAdmin('admin@example.com', 'abc123');
    
    // Batch invitations
    const invites = [
      {
        type: 'individual_member',
        email: 'member1@example.com',
        params: {
          organization_name: 'Acme Corp',
          credit_amount: 100,
          accept_link: 'https://yuba.com/invite/token1'
        }
      },
      {
        type: 'individual_member',
        email: 'member2@example.com',
        params: {
          organization_name: 'Acme Corp',
          credit_amount: 100,
          accept_link: 'https://yuba.com/invite/token2'
        }
      }
    ];
    
    const results = await batchSendInvitations(invites);
    console.log('\nBatch results:', results);
  })();
}
