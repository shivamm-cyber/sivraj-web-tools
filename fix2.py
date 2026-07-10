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
    
    # We want to replace "\`" (backslash backtick) with "`" (backtick)
    # In python, backslash is '\\'
    content = content.replace('\\\\`', '`')
    
    # We want to replace "\$" (backslash dollar) with "$"
    content = content.replace('\\\\$', '$')
    
    # Wait, the error TS1127 is invalid character. Maybe the template literal is broken.
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
    
    print('Fixed ' + f)
