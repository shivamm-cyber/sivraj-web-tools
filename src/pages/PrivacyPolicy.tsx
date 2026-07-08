import { useSEO } from '../hooks/useSEO';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  useSEO({
    title: 'Privacy Policy | Free Online Tool | Sivraj',
    description: 'Free online Privacy Policy tool running entirely in your browser. Fast, secure, and 100% private.'
  });

  return (
    <div className="app-container">
      <header className="header" style={{ marginBottom: '2rem' }}>
        <Link to="/" style={{ textDecoration: 'none' }}><div className="logo">SIVRAJ</div></Link>
        <Link to="/" className="btn-launch" style={{ color: 'var(--text-muted)' }}>
          ← Back Home
        </Link>
      </header>

      <main className="tool-page" style={{ maxWidth: '800px', margin: '0 auto', background: 'rgba(0,0,0,0.2)', padding: '3rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
        <h1 style={{ color: 'var(--primary-accent)', marginBottom: '2rem' }}>Privacy Policy</h1>
        
        <div style={{ color: 'var(--text-main)', lineHeight: '1.8' }}>
          <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
          
          <h2 style={{ marginTop: '2rem', color: 'white' }}>1. 100% Client-Side Processing Guarantee</h2>
          <p>
            Sivraj Web Tools is built with a strict "Client-Side First" architecture. This means that when you use our tools (such as the Image Optimizer, Background Remover, or PDF Merger), <strong>all processing happens locally inside your web browser</strong> on your own device. 
          </p>
          <p>
            We do NOT upload your images, PDFs, videos, or text to any external servers. Your files never leave your computer, ensuring total privacy and security.
          </p>

          <h2 style={{ marginTop: '2rem', color: 'white' }}>2. Data Collection</h2>
          <p>
            Because our tools run entirely in your browser, we do not collect, store, or process any of the personal files or data you input into the tools. We do not require you to create an account, and we do not collect personally identifiable information (PII) such as your name or email address.
          </p>

          <h2 style={{ marginTop: '2rem', color: 'white' }}>3. Analytics & Advertising</h2>
          <p>
            We use third-party analytics and advertising partners (such as Ezoic or Google) to help keep this website 100% free. These third parties may use cookies, web beacons, and similar technologies to collect standard internet log information and visitor behavior information (such as your IP address, browser type, and pages visited). 
          </p>
          <p>
            This information is used to track visitor use of the website, compile statistical reports on website activity, and serve personalized advertisements.
          </p>

          <h2 style={{ marginTop: '2rem', color: 'white' }}>4. Cookies</h2>
          <p>
            Cookies are text files placed on your computer to collect standard Internet log information and visitor behavior information. You can set your browser not to accept cookies, however, in a few cases, some of our website features may not function as a result.
          </p>

          <h2 style={{ marginTop: '2rem', color: 'white' }}>5. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at contact@sivraj.in.
          </p>
        </div>
      </main>
    </div>
  );
}
