const fs = require('fs');
const path = require('path');

const oldUrl = 'https://raw.githubusercontent.com/samgeter/Yuba-invitation-email/98ccf5f97ea89e9154002fab5facf67345e1accb/yuba-logo-icon-white.svg';
const newUrl = 'https://yuba-invitation-email.vercel.app/yuba-logo-icon-white.svg';

const files = [
  'emails/invitation_org_admin.html',
  'emails/invitation_individual_member.html',
  'emails/invitation_team_admin.html',
  'emails/invitation_teammate_from_org.html',
  'emails/invitation_teammate_no_org.html'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace old GitHub URL with new Vercel URL
  content = content.replace(oldUrl, newUrl);
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Updated: ${file}`);
});

console.log('\n✅ All templates updated with Vercel icon URL!');
console.log(`📍 New Icon URL: ${newUrl}`);
