import os

files = [
  'src/data/blogPosts.ts',
  'src/pages/Base64Encoder.tsx',
  'src/pages/CodeMinifier.tsx',
  'src/pages/ColorPicker.tsx',
  'src/pages/ImageResizer.tsx',
  'src/pages/InternetSpeedTest.tsx',
  'src/pages/SvgToPng.tsx',
  'src/pages/UrlEncoder.tsx'
]

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace literal backslash followed by backtick with just backtick
    content = content.replace('\\\\\\`', '\`')
    # Replace literal backslash followed by dollar sign with just dollar sign
    content = content.replace('\\\\$', '$')
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
    
    print('Fixed ' + f)
