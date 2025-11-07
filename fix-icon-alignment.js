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
  
  // Update img tag to add margin-right and display inline-block
  content = content.replace(
    /(<img src="https:\/\/raw\.githubusercontent\.com\/samgeter\/Yuba-invitation-email\/[^"]*" alt="Yuba Logo" style="width: 50px; height: 50px; vertical-align: middle;)(")/g,
    '$1 margin-right: 12px; display: inline-block;$2'
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Updated: ${file}`);
});

console.log('\n✅ All templates updated - icon alignment fixed!');
