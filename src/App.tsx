import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">SIVRAJ</div>
        <nav>
          {/* Navigation for future tools */}
        </nav>
      </header>

      <main>
        <section className="hero">
          <h1>Supercharge Your Workflow.</h1>
          <p>
            A collection of blazingly fast, free web utilities running entirely in your browser. 
            No signups, no server uploads, complete privacy.
          </p>
        </section>

        <section className="tools-grid">
          {/* Tool 1: Image Optimizer */}
          <Link to="/image-optimizer" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div className="tool-card">
              <div className="badge">Hot</div>
              <div className="tool-icon-wrapper">
                📸
              </div>
              <h2>Image Optimizer</h2>
              <p>
                Compress huge photos down to 50KB for government forms, or convert formats instantly. 
                Zero quality loss, 100% free.
              </p>
              <div className="btn-launch">
                Launch Tool
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </Link>

          {/* Tool 2: AI Background Remover */}
          <Link to="/background-remover" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div className="tool-card">
              <div className="tool-icon-wrapper">
                ✨
              </div>
              <h2>AI Background Remover</h2>
              <p>
                Drop any photo and let our in-browser AI magically erase the background in seconds. 
                Perfect for products and portraits.
              </p>
              <div className="btn-launch">
                Launch Tool
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </Link>

          {/* Tool 3: QR Code Generator */}
          <Link to="/qr-generator" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div className="tool-card">
              <div className="tool-icon-wrapper">
                📱
              </div>
              <h2>QR Generator Pro</h2>
              <p>
                Create beautiful, scannable QR codes with custom colors and center logos. 
                Download instantly in high-res PNG or SVG.
              </p>
              <div className="btn-launch">
                Launch Tool
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </Link>

          {/* Tool 8: Secure Password Generator */}
          <Link to="/password-generator" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div className="tool-card">
              <div className="tool-icon-wrapper">
                🔐
              </div>
              <h2>Secure Password Gen</h2>
              <p>
                Generate mathematically secure, uncrackable passwords instantly. Your password never leaves your browser.
              </p>
              <div className="btn-launch">
                Launch Tool
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </Link>

          {/* Tool 9: Text & Case Converter */}
          <Link to="/text-converter" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div className="tool-card">
              <div className="tool-icon-wrapper">
                📝
              </div>
              <h2>Text & Case Converter</h2>
              <p>
                Instantly convert text to UPPERCASE, lowercase, or Title Case. Real-time word and character counting.
              </p>
              <div className="btn-launch">
                Launch Tool
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </Link>

          {/* Tool 7: YouTube Thumbnail Downloader */}
          <Link to="/youtube-thumbnail" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div className="tool-card">
              <div className="tool-icon-wrapper">
                ▶️
              </div>
              <h2>YouTube Thumbnail Grabber</h2>
              <p>
                Paste any YouTube URL to instantly download the hidden 1080p, 720p, or 480p cover thumbnail.
              </p>
              <div className="btn-launch">
                Launch Tool
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </Link>

          {/* Tool 5: Image Format Converter */}
          <Link to="/image-converter" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div className="tool-card">
              <div className="tool-icon-wrapper">
                🔄
              </div>
              <h2>Image Format Converter</h2>
              <p>
                Convert iPhone HEIC photos to standard JPG format, or convert PNGs to WEBP directly in your browser.
              </p>
              <div className="btn-launch">
                Launch Tool
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </Link>

          {/* Tool 6: Screen Recorder */}
          <Link to="/screen-recorder" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div className="tool-card">
              <div className="tool-icon-wrapper">
                ⏺️
              </div>
              <h2>In-Browser Screen Recorder</h2>
              <p>
                Record your screen and microphone instantly. No downloads required, and your video never leaves your computer.
              </p>
              <div className="btn-launch">
                Launch Tool
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </Link>

          {/* Tool 4: PDF Merger */}
          <Link to="/pdf-tools" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div className="tool-card">
              <div className="tool-icon-wrapper">
                📄
              </div>
              <h2>PDF Merger</h2>
              <p>
                Combine multiple PDF files into one instantly. Your files are processed securely in your browser and never uploaded.
              </p>
              <div className="btn-launch">
                Launch Tool
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </Link>
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
