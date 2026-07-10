import { useSEO } from '../hooks/useSEO';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import FAQ from '../components/FAQ';

export default function Base64Encoder() {
  useSEO({
    title: 'Base64 Encoder & Decoder | Free Developer Tool | Sivraj',
    description: 'Instantly encode text to Base64 or decode Base64 to text. Fast, free, client-side processing for ultimate privacy.'
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
        const utf8Bytes = new TextEncoder().encode(input);
        const binaryStr = Array.from(utf8Bytes).map(b => String.fromCharCode(b)).join('');
        setOutput(btoa(binaryStr));
      } else {
        const binaryStr = atob(input);
        const bytes = new Uint8Array(binaryStr.split('').map(c => c.charCodeAt(0)));
        setOutput(new TextDecoder().decode(bytes));
      }
      setCopied(false);
    } catch (err) {
      setError('Invalid ' + (mode === 'encode' ? 'text' : 'Base64') + ' input.');
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
          <div className="tool-icon-wrapper" style={{ margin: '0 auto 1.5rem auto' }}>🔒</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Base64 Encoder / Decoder</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Convert any text to Base64 format or decode Base64 back into readable text instantly. All processing happens in your browser.
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
              Encode Text to Base64
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
              Decode Base64 to Text
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                {mode === 'encode' ? 'Input Text' : 'Input Base64'}
              </label>
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
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

        {/* SEO & FAQ Section */}
        <div style={{ maxWidth: '800px', margin: '4rem auto 0 auto', lineHeight: '1.6', color: 'var(--text-color)' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'white' }}>What is Base64 Encoding?</h2>
          <p style={{ marginBottom: '1rem' }}>
            Base64 is a way to encode binary data (like images, or complex text strings) into a simple ASCII string format. Developers frequently use it to transmit data safely across networks without it getting corrupted by systems that only expect raw text (like JSON APIs or email protocols).
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            Our free Base64 Encoder / Decoder tool allows you to instantly flip text back and forth. It safely handles UTF-8 characters (including emojis and special symbols) so you don't run into the dreaded "URI malformed" errors.
          </p>

          <FAQ 
            items={[
              {
                question: 'Is Base64 considered encryption?',
                answer: 'No! Base64 is encoding, not encryption. It provides zero security. Anyone with a Base64 decoder can read your string instantly. Never use Base64 to "secure" passwords or sensitive data.'
              },
              {
                question: 'Why do developers use Base64?',
                answer: 'It is commonly used to embed small images directly into CSS or HTML files (saving an HTTP request), or to send binary files (like PDFs) through a REST API inside a JSON payload.'
              },
              {
                question: 'Does this tool support emojis?',
                answer: 'Yes! Unlike standard JavaScript btoa() which breaks on emojis, our tool uses a TextEncoder to safely parse UTF-8 characters before converting them to Base64.'
              }
            ]} 
          />
        </div>
      </main>
    </div>
  );
}
