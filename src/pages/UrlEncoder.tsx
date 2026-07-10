import { useSEO } from '../hooks/useSEO';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import FAQ from '../components/FAQ';

export default function UrlEncoder() {
  useSEO({
    title: 'URL Encoder & Decoder | Free Web Developer Tool | Sivraj',
    description: 'Instantly safely encode or decode URLs to pass special characters like spaces and ampersands over the web.'
  });

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleProcess = () => {
    setError('');
    try {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
      setCopied(false);
    } catch (err) {
      setError('Invalid URL string provided for decoding.');
      setOutput('');
    }
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="app-container">
      <header className="header" style={{ marginBottom: '2rem' }}>
        <Link to="/" style={{ textDecoration: 'none' }}><div className="logo">SIVRAJ</div></Link>
        <Link to="/" className="btn-launch" style={{ color: 'var(--text-muted)' }}>
          ← Back to Tools
        </Link>
      </header>

      <main className="tool-page">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="tool-icon-wrapper" style={{ margin: '0 auto 1.5rem auto' }}>🔗</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>URL Encoder / Decoder</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Safely escape special characters for transmission in a URL query string, or decode an unreadable URL back to plain text.
          </p>
        </div>

        <div className="tool-card" style={{ maxWidth: '800px', margin: '0 auto', cursor: 'default' }}>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <button 
              onClick={() => { setMode('encode'); setInput(output); setOutput(''); setError(''); }}
              style={{
                flex: 1,
                padding: '12px',
                background: mode === 'encode' ? 'var(--primary-accent)' : 'transparent',
                color: mode === 'encode' ? 'var(--bg-dark)' : 'white',
                border: '1px solid ' + (mode === 'encode' ? 'var(--primary-accent)' : 'var(--border-color)'),
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Encode URL
            </button>
            <button 
              onClick={() => { setMode('decode'); setInput(output); setOutput(''); setError(''); }}
              style={{
                flex: 1,
                padding: '12px',
                background: mode === 'decode' ? 'var(--primary-accent)' : 'transparent',
                color: mode === 'decode' ? 'var(--bg-dark)' : 'white',
                border: '1px solid ' + (mode === 'decode' ? 'var(--primary-accent)' : 'var(--border-color)'),
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Decode URL
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                {mode === 'encode' ? 'Input Text (e.g., query=Hello World & More)' : 'Input Encoded URL (e.g., query=Hello%20World%20%26%20More)'}
              </label>
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === 'encode' ? 'Enter string to encode safely...' : 'Enter % escaped URL string to decode...'}
                style={{
                  width: '100%',
                  height: '150px',
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-dark)',
                  color: 'white',
                  fontFamily: 'monospace',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
            </div>
            
            <button 
              onClick={handleProcess}
              style={{
                background: 'var(--primary-accent)',
                color: 'var(--bg-dark)',
                border: 'none',
                padding: '16px',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                cursor: 'pointer'
              }}
            >
              {mode === 'encode' ? 'Encode' : 'Decode'}
            </button>
            
            {error && <p style={{ color: '#ff4444' }}>{error}</p>}

            {output && (
              <div style={{ position: 'relative' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                  Result
                </label>
                <div style={{
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  background: 'rgba(0,0,0,0.3)',
                  fontFamily: 'monospace',
                  wordBreak: 'break-all',
                  minHeight: '100px',
                  maxHeight: '300px',
                  overflowY: 'auto'
                }}>
                  {output}
                </div>
                <button 
                  onClick={copyToClipboard}
                  style={{
                    position: 'absolute',
                    top: '32px',
                    right: '16px',
                    background: 'var(--primary-accent)',
                    color: 'var(--bg-dark)',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            )}
          </div>
        </div>

        <div style={{ maxWidth: '800px', margin: '4rem auto 0 auto', lineHeight: '1.6', color: 'var(--text-color)' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'white' }}>Why Encode URLs?</h2>
          <p style={{ marginBottom: '1rem' }}>
            URLs can only be sent over the Internet using the ASCII character-set. If your URL contains special characters (like spaces, ampersands, or non-English letters), they must be converted into a valid ASCII format.
          </p>

          <FAQ 
            items={[
              {
                question: 'What happens to spaces?',
                answer: 'Spaces are unsafe in URLs. URL encoding converts a space into the string "%20".'
              },
              {
                question: 'When should developers use this?',
                answer: 'Anytime you are appending dynamic user input to a URL string (like a search query or a redirect parameter), you must encode it to prevent broken links or injection attacks.'
              }
            ]} 
          />
        </div>
      </main>
    </div>
  );
}
