const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../src/pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes('useSEO')) {
    // Add import
    content = `import { useSEO } from '../hooks/useSEO';\n` + content;
    
    // Extract component name from export default function ComponentName
    const match = content.match(/export default function (\w+)\(\) \{/);
    if (match) {
      const componentName = match[1];
      
      // format title
      const titleName = componentName.replace(/([A-Z])/g, ' $1').trim();
      
      const hookCode = `\n  useSEO({\n    title: '${titleName} | Free Online Tool | Sivraj',\n    description: 'Free online ${titleName} tool running entirely in your browser. Fast, secure, and 100% private.'\n  });\n`;
      
      content = content.replace(match[0], match[0] + hookCode);
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  }
}
console.log('All files updated with useSEO!');
