import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from './hooks/useSEO';

const toolsList = [
  {
    path: '/aadhaar-masker',
    icon: '🛡️',
    title: 'Aadhaar & ID Masker',
    desc: 'Securely blur your Aadhaar number or sensitive details before sharing. 100% Private.',
    badge: 'Viral'
  },
  {
    path: '/gst-calculator',
    icon: '🧮',
    title: 'GST Calculator (India)',
    desc: 'Calculate Goods and Services Tax instantly. Add or remove GST with full CGST/SGST breakdown.',
    badge: 'Hot'
  },
  {
    path: '/pdf-to-image',
    icon: '📄',
    title: 'PDF to JPG Converter',
    desc: 'Extract every page of a PDF into high-quality JPG images instantly.',
    badge: 'New'
  },
  {
    path: '/image-optimizer',
    icon: '📸',
    title: 'Image Optimizer',
    desc: 'Compress huge photos down to 50KB for government forms, or convert formats instantly.',
    badge: ''
  },
  {
    path: '/background-remover',
    icon: '✨',
    title: 'AI Background Remover',
    desc: 'Drop any photo and let our in-browser AI magically erase the background in seconds.',
    badge: ''
  },
  {
    path: '/qr-generator',
    icon: '📱',
    title: 'QR Generator Pro',
    desc: 'Create beautiful, scannable QR codes with custom colors and center logos.',
    badge: ''
  },
  {
    path: '/password-generator',
    icon: '🔐',
    title: 'Secure Password Gen',
    desc: 'Generate mathematically secure, uncrackable passwords instantly.',
    badge: ''
  },
  {
    path: '/text-converter',
    icon: '📝',
    title: 'Text & Case Converter',
    desc: 'Instantly convert text to UPPERCASE, lowercase, or Title Case.',
    badge: ''
  },
  {
    path: '/youtube-thumbnail',
    icon: '▶️',
    title: 'YouTube Thumbnail Grabber',
    desc: 'Paste any YouTube URL to instantly download the hidden 1080p cover thumbnail.',
    badge: ''
  },
  {
    path: '/image-converter',
    icon: '🔄',
    title: 'Image Format Converter',
    desc: 'Convert iPhone HEIC photos to JPG format, or convert PNGs to WEBP directly in your browser.',
    badge: ''
  },
  {
    path: '/screen-recorder',
    icon: '⏺️',
    title: 'In-Browser Screen Recorder',
    desc: 'Record your screen and microphone instantly. No downloads required.',
    badge: ''
  },
  {
    path: '/pdf-tools',
    icon: '📄',
    title: 'PDF Merger',
    desc: 'Combine multiple PDF files into one instantly securely in your browser.',
    badge: ''
  },
  {
    path: '/word-analyzer',
    icon: '📝',
    title: 'Word & SEO Analyzer',
    desc: 'Count words, characters, and instantly extract top keywords for SEO optimization.',
    badge: ''
  },
  {
    path: '/color-extractor',
    icon: '🎨',
    title: 'Color Palette Extractor',
    desc: 'Upload any image to instantly extract its dominant color palette and hex codes.',
    badge: ''
  },
  {
    path: '/voice-recorder',
    icon: '🎙️',
    title: 'Secure Voice Recorder',
    desc: 'Record high-quality audio directly from your microphone and download instantly.',
    badge: ''
  },
  {
    path: '/json-formatter',
    icon: '👨‍💻',
    title: 'JSON Formatter',
    desc: 'Paste messy JSON code to instantly format, validate, and syntax highlight it.',
    badge: ''
  },
  {
    path: '/emi-calculator',
    icon: '🏦',
    title: 'EMI Calculator',
    desc: 'Instantly calculate Equated Monthly Installments for home, car, or personal loans.',
    badge: 'New'
  },
  {
    path: '/age-calculator',
    icon: '🎂',
    title: 'Age Calculator',
    desc: 'Calculate your exact age in years, months, and days for government forms.',
    badge: 'New'
  },
  {
    path: '/base64-encoder',
    icon: '🔒',
    title: 'Base64 Encoder',
    desc: 'Convert any text to Base64 format or decode Base64 back into readable text.',
    badge: 'New'
  },
  {
    path: '/code-minifier',
    icon: '✂️',
    title: 'Code Minifier',
    desc: 'Instantly compress CSS and JSON code by removing unnecessary whitespace.',
    badge: 'New'
  },
  {
    path: '/url-encoder',
    icon: '🔗',
    title: 'URL Encoder / Decoder',
    desc: 'Escape special characters for safe transmission over the internet.',
    badge: 'New'
  },
  {
    path: '/image-resizer',
    icon: '📏',
    title: 'Image Resizer',
    desc: 'Resize photos for Instagram, Twitter, or custom dimensions perfectly.',
    badge: 'New'
  },
  {
    path: '/color-picker',
    icon: '🎨',
    title: 'Advanced Color Picker',
    desc: 'Find the perfect color and get instant HEX and RGB codes for your UI.',
    badge: 'New'
  },
  {
    path: '/svg-to-png',
    icon: '🖼️',
    title: 'SVG to PNG Converter',
    desc: 'Convert vector SVG files or raw code into high-quality PNG images.',
    badge: 'New'
  }
];

function App() {
  useSEO({
    title: 'Sivraj Web Tools | 16+ Free Premium Utility Tools',
    description: 'A collection of blazingly fast, free web utilities running entirely in your browser. No signups, no server uploads, complete privacy.'
  });

  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = toolsList.filter(tool => 
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    tool.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="logo">SIVRAJ</div>
        <nav>
          <Link to="/blog" style={{ color: 'var(--primary-accent)', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>Blog & Guides</Link>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h1>Supercharge Your Workflow.</h1>
          <p>
            A collection of blazingly fast, free web utilities running entirely in your browser. 
            No signups, no server uploads, complete privacy.
          </p>
          
          <div style={{ marginTop: '2rem', maxWidth: '600px', margin: '2rem auto 0' }}>
            <input 
              type="text" 
              placeholder="🔍 Search for a tool (e.g., 'PDF', 'Image', 'Aadhaar')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 24px',
                borderRadius: '50px',
                border: '2px solid var(--primary-accent)',
                background: 'var(--bg-dark)',
                color: 'white',
                fontSize: '1.2rem',
                outline: 'none',
                boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2)'
              }}
            />
          </div>
        </section>

        <section className="tools-grid" style={{ marginTop: '3rem' }}>
          {filteredTools.length > 0 ? (
            filteredTools.map((tool, idx) => (
              <Link key={idx} to={tool.path} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div className="tool-card">
                  {tool.badge && <div className="badge">{tool.badge}</div>}
                  <div className="tool-icon-wrapper">
                    {tool.icon}
                  </div>
                  <h2>{tool.title}</h2>
                  <p>{tool.desc}</p>
                  <div className="btn-launch">
                    Launch Tool
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
              <h2>No tools found for "{searchQuery}"</h2>
              <p>Try searching for something else, like "PDF" or "Image".</p>
            </div>
          )}
        </section>
      </main>

      <footer style={{ 
        marginTop: '6rem', 
        padding: '2rem', 
        textAlign: 'center', 
        borderTop: '1px solid var(--border-color)',
        color: 'var(--text-muted)'
      }}>
        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <Link to="/privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</Link>
          <Link to="/terms" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms of Service</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} Sivraj Web Tools. All rights reserved.</p>
        <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>100% Client-Side Processing. We do not store your data.</p>
      </footer>
    </div>
  )
}

export default App
