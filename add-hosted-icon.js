const fs = require('fs');
const path = require('path');

// Hosted icon URL from GitHub
const hostedIconUrl = 'https://raw.githubusercontent.com/samgeter/Yuba-invitation-email/98ccf5f97ea89e9154002fab5facf67345e1accb/yuba-logo-icon-white.svg';

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
  
  // Find the h1 tag and add the icon before it
  content = content.replace(
    /(<td style="background: linear-gradient\(135deg, #128AA3, #244694\); padding: 30px 40px; text-align: center;">)\s*(<h1 style="margin: 0; color: #ffffff; font-size: 42px; font-weight: 700; letter-spacing: 1px;">Yuba<\/h1>)/,
    `$1\n                            <img src="${hostedIconUrl}" alt="Yuba Logo" style="width: 50px; height: 50px; vertical-align: middle; margin-right: 12px;">\n                            <h1 style="display: inline-block; margin: 0; color: #ffffff; font-size: 42px; font-weight: 700; letter-spacing: 1px; vertical-align: middle;">Yuba</h1>`
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Updated: ${file}`);
});

console.log('\n✅ All templates updated with hosted GitHub icon!');
console.log(`📍 Icon URL: ${hostedIconUrl}`);
