const fs = require('fs');
const files = [
  'src/data/blogPosts.ts',
  'src/pages/Base64Encoder.tsx',
  'src/pages/CodeMinifier.tsx',
  'src/pages/ColorPicker.tsx',
  'src/pages/ImageResizer.tsx',
  'src/pages/InternetSpeedTest.tsx',
  'src/pages/SvgToPng.tsx',
  'src/pages/UrlEncoder.tsx'
];
for(const f of files) {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/\\\\\`/g, '\`');
  content = content.replace(/\\\\\$/g, '$');
  content = content.replace(/\\\\n/g, '\\n');
  content = content.replace(/\\\\s/g, '\\s');
  content = content.replace(/\\\\\*/g, '*');
  fs.writeFileSync(f, content);
  console.log('Fixed ' + f);
}
