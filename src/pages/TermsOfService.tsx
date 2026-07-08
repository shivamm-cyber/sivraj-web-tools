import { useSEO } from '../hooks/useSEO';
import { Link } from 'react-router-dom';

export default function TermsOfService() {
  useSEO({
    title: 'Terms Of Service | Free Online Tool | Sivraj',
    description: 'Free online Terms Of Service tool running entirely in your browser. Fast, secure, and 100% private.'
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
        <h1 style={{ color: 'var(--primary-accent)', marginBottom: '2rem' }}>Terms of Service</h1>
        
        <div style={{ color: 'var(--text-main)', lineHeight: '1.8' }}>
          <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
          
          <h2 style={{ marginTop: '2rem', color: 'white' }}>1. Acceptance of Terms</h2>
          <p>
            By accessing and using Sivraj Web Tools (the "Service"), you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2 style={{ marginTop: '2rem', color: 'white' }}>2. Description of Service</h2>
          <p>
            Sivraj Web Tools provides users with a collection of free, client-side web utilities including but not limited to image compression, format conversion, PDF manipulation, and text generation. You understand and agree that the Service is provided "AS-IS" and that we assume no responsibility for the timeliness, deletion, mis-delivery, or failure to store any user communications or personalization settings.
          </p>

          <h2 style={{ marginTop: '2rem', color: 'white' }}>3. User Responsibilities</h2>
          <p>
            You agree to use the Service for lawful purposes only. You are solely responsible for the content, files, or data that you process using our tools. Because processing happens locally on your device, we have no access to or control over the files you manipulate. You agree not to use the Service to process illegal, copyrighted, or malicious material.
          </p>

          <h2 style={{ marginTop: '2rem', color: 'white' }}>4. Disclaimer of Warranties</h2>
          <p>
            YOUR USE OF THE SERVICE IS AT YOUR SOLE RISK. THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. SIVRAJ WEB TOOLS EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT.
          </p>
          <p>
            We make no warranty that (i) the service will meet your requirements, (ii) the service will be uninterrupted, timely, secure, or error-free, or (iii) the results that may be obtained from the use of the service will be accurate or reliable.
          </p>

          <h2 style={{ marginTop: '2rem', color: 'white' }}>5. Limitation of Liability</h2>
          <p>
            YOU EXPRESSLY UNDERSTAND AND AGREE THAT SIVRAJ WEB TOOLS SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO, DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA OR OTHER INTANGIBLE LOSSES RESULTING FROM THE USE OR THE INABILITY TO USE THE SERVICE.
          </p>

          <h2 style={{ marginTop: '2rem', color: 'white' }}>6. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Your continued use of the site following any such modification constitutes your agreement to follow and be bound by the Terms as modified.
          </p>
        </div>
      </main>
    </div>
  );
}
