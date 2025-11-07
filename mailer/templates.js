// mailer/templates.js
// Functions to load HTML email templates and replace placeholders

const fs = require('fs');
const path = require('path');

/**
 * Helper function to read HTML template files
 * @param {string} filename - Name of the HTML file in the emails/ folder
 * @returns {string} - Raw HTML content
 */
function readTemplate(filename) {
  const filePath = path.join(__dirname, '..', 'emails', filename);
  return fs.readFileSync(filePath, 'utf-8');
}

/**
 * Helper function to replace all placeholders in HTML
 * @param {string} html - HTML template string
 * @param {Object} replacements - Key-value pairs for placeholder replacement
 * @returns {string} - HTML with placeholders replaced
 */
function replacePlaceholders(html, replacements) {
  let result = html;
  for (const [key, value] of Object.entries(replacements)) {
    // Use global replace to handle multiple occurrences
    const regex = new RegExp(`\\{${key}\\}`, 'g');
    result = result.replace(regex, value);
  }
  return result;
}

/**
 * Get Organization Admin invitation email template
 * @param {Object} params
 * @param {string} params.accept_link - URL for accepting the invitation
 * @returns {Object} { subject: string, html: string }
 */
function getOrgAdminInvitationTemplate(params) {
  const html = readTemplate('invitation_org_admin.html');
  
  const replacements = {
    'accept_link': params.accept_link
  };
  
  return {
    subject: 'Invitation to join Yuba as Organization Admin',
    html: replacePlaceholders(html, replacements)
  };
}

/**
 * Get Individual Member invitation email template
 * @param {Object} params
 * @param {string} params.organization_name - Name of the organization
 * @param {number} params.credit_amount - Number of credits allocated
 * @param {string} params.accept_link - URL for accepting the invitation
 * @returns {Object} { subject: string, html: string }
 */
function getIndividualMemberInvitationTemplate(params) {
  const html = readTemplate('invitation_individual_member.html');
  
  const replacements = {
    'organization_name': params.organization_name,
    'credit_amount': params.credit_amount.toString(),
    'accept_link': params.accept_link
  };
  
  return {
    subject: `Invitation to Join ${params.organization_name} on Yuba`,
    html: replacePlaceholders(html, replacements)
  };
}

/**
 * Get Team Admin invitation email template
 * @param {Object} params
 * @param {string} params.organization_name - Name of the organization
 * @param {number} params.credit_amount - Number of credits allocated
 * @param {string} params.accept_link - URL for accepting the invitation
 * @returns {Object} { subject: string, html: string }
 */
function getTeamAdminInvitationTemplate(params) {
  const html = readTemplate('invitation_team_admin.html');
  
  const replacements = {
    'organization_name': params.organization_name,
    'credit_amount': params.credit_amount.toString(),
    'accept_link': params.accept_link
  };
  
  return {
    subject: 'Invitation to Join Yuba as a Team Admin',
    html: replacePlaceholders(html, replacements)
  };
}

/**
 * Get Teammate (from Organization) invitation email template
 * @param {Object} params
 * @param {string} params.team_name - Name of the team
 * @param {string} params.team_admin_name - Name of the team admin sending the invite
 * @param {string} params.accept_link - URL for accepting the invitation
 * @returns {Object} { subject: string, html: string }
 */
function getTeammateFromOrgInvitationTemplate(params) {
  const html = readTemplate('invitation_teammate_from_org.html');
  
  // Note: The HTML template uses {team admin's_name} but we normalize it to team_admin_name
  const replacements = {
    'team_name': params.team_name,
    "team admin's_name": params.team_admin_name, // Match the exact placeholder in HTML
    'accept_link': params.accept_link
  };
  
  return {
    subject: `Invitation to Join Your Team (${params.team_name}) on Yuba`,
    html: replacePlaceholders(html, replacements)
  };
}

/**
 * Get Teammate (No Organization) invitation email template
 * @param {Object} params
 * @param {string} params.team_name - Name of the team
 * @param {string} params.accept_link - URL for accepting the invitation
 * @returns {Object} { subject: string, html: string }
 */
function getTeammateNoOrgInvitationTemplate(params) {
  const html = readTemplate('invitation_teammate_no_org.html');
  
  const replacements = {
    'team_name': params.team_name,
    'accept_link': params.accept_link
  };
  
  return {
    subject: `Join the ${params.team_name} team on Yuba`,
    html: replacePlaceholders(html, replacements)
  };
}

module.exports = {
  getOrgAdminInvitationTemplate,
  getIndividualMemberInvitationTemplate,
  getTeamAdminInvitationTemplate,
  getTeammateFromOrgInvitationTemplate,
  getTeammateNoOrgInvitationTemplate
};
