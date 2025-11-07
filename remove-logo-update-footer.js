const fs = require('fs');
const path = require('path');

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
  
  // Remove the img tag completely
  content = content.replace(
    /<img src="https:\/\/yuba-invitation-email\.vercel\.app\/yuba-logo-icon-white\.svg" alt="Yuba Logo" style="[^"]*">\s*/g,
    ''
  );
  
  // Update h1 to remove inline-block and center it properly
  content = content.replace(
    /style="display: inline-block; margin: 0; color: #ffffff; font-size: 42px; font-weight: 700; letter-spacing: 1px; vertical-align: middle;"/g,
    'style="margin: 0; color: #ffffff; font-size: 42px; font-weight: 700; letter-spacing: 1px;"'
  );
  
  // Update footer copyright text
  content = content.replace(
    /<p style="margin: 0; color: #999999; font-size: 14px;">© Yuba<\/p>/g,
    '<p style="margin: 0; color: #999999; font-size: 14px;">© Yuba Labs Ltd</p>'
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Updated: ${file}`);
});

console.log('\n✅ All templates updated!');
console.log('   - Logo removed');
console.log('   - Footer updated to "© Yuba Labs Ltd"');
