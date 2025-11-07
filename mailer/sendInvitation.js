// mailer/sendInvitation.js
// Generic function to send invitation emails based on type

const transporter = require('./transport');
const {
  getOrgAdminInvitationTemplate,
  getIndividualMemberInvitationTemplate,
  getTeamAdminInvitationTemplate,
  getTeammateFromOrgInvitationTemplate,
  getTeammateNoOrgInvitationTemplate
} = require('./templates');

/**
 * Send an invitation email based on the invitation type
 * 
 * @param {string} type - Type of invitation email to send
 *   Valid types: 'org_admin', 'individual_member', 'team_admin', 
 *                'teammate_from_org', 'teammate_no_org'
 * @param {string} toEmail - Recipient email address
 * @param {Object} params - Parameters for template placeholder replacement
 * @returns {Promise<Object>} - Nodemailer send result
 * 
 * @example
 * // Send Organization Admin invitation
 * await sendInvitationEmail('org_admin', 'admin@example.com', {
 *   accept_link: 'https://yuba.com/invite/abc123'
 * });
 * 
 * @example
 * // Send Individual Member invitation
 * await sendInvitationEmail('individual_member', 'member@example.com', {
 *   organization_name: 'Acme Corp',
 *   credit_amount: 100,
 *   accept_link: 'https://yuba.com/invite/xyz789'
 * });
 */
async function sendInvitationEmail(type, toEmail, params) {
  // Map invitation type to the appropriate template function
  const templateMap = {
    'org_admin': getOrgAdminInvitationTemplate,
    'individual_member': getIndividualMemberInvitationTemplate,
    'team_admin': getTeamAdminInvitationTemplate,
    'teammate_from_org': getTeammateFromOrgInvitationTemplate,
    'teammate_no_org': getTeammateNoOrgInvitationTemplate
  };

  // Validate invitation type
  if (!templateMap[type]) {
    throw new Error(
      `Invalid invitation type: "${type}". ` +
      `Valid types are: ${Object.keys(templateMap).join(', ')}`
    );
  }

  // Get the template function and generate email content
  const getTemplate = templateMap[type];
  const { subject, html } = getTemplate(params);

  // Prepare email options
  const mailOptions = {
    from: `Yuba <${process.env.GMAIL_USER}>`, // Sender name and email
    to: toEmail,
    subject: subject,
    html: html,
    // Optional: Add plain text fallback (auto-generated from HTML if not provided)
    // text: 'Plain text version of the email'
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    
    console.log(`✅ Email sent successfully to ${toEmail}`);
    console.log(`   Type: ${type}`);
    console.log(`   Subject: ${subject}`);
    console.log(`   Message ID: ${info.messageId}`);
    
    return info;
  } catch (error) {
    console.error(`❌ Failed to send email to ${toEmail}:`, error.message);
    throw error;
  }
}

module.exports = {
  sendInvitationEmail
};
