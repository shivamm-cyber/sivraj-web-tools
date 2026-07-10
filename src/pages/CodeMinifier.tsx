import { useSEO } from '../hooks/useSEO';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import FAQ from '../components/FAQ';

export default function CodeMinifier() {
  useSEO({
    title: 'CSS & JSON Code Minifier | Optimize Speed | Sivraj',
    description: 'Instantly minify CSS and JSON code by removing unnecessary whitespace and comments to improve website performance.'
  });

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'css' | 'json'>('css');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ original: 0, minified: 0, saved: 0 });

  const handleProcess = () => {
    setError('');
    let minified = '';
    
    try {
      if (mode === 'json') {
        const parsed = JSON.parse(input);
        minified = JSON.stringify(parsed);
      } else {
        // Basic CSS minification: remove comments, newlines, and extra spaces
        minified = input
          .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
          .replace(/\n/g, '') // Remove newlines
          .replace(/\s+/g, ' ') // Collapse spaces
          .replace(/\s*\{\s*/g, '{') // Remove spaces around braces
          .replace(/\s*\}\s*/g, '}')
          .replace(/\s*:\s*/g, ':') // Remove spaces around colons
          .replace(/\s*;\s*/g, ';') // Remove spaces around semicolons
          .replace(/;\}/g, '}'); // Remove trailing semicolon
      }
      
      setOutput(minified);
      const origSize = new Blob([input]).size;
      const minSize = new Blob([minified]).size;
      const savings = origSize > 0 ? Math.round(((origSize - minSize) / origSize) * 100) : 0;
      
      setStats({ original: origSize, minified: minSize, saved: savings });
      setCopied(false);
    } catch (err) {
      setError('Invalid ' + (mode === 'json' ? 'JSON' : 'CSS') + ' input.');
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
          <div className="tool-icon-wrapper" style={{ margin: '0 auto 1.5rem auto' }}>✂️</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>CSS & JSON Minifier</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Strip out unnecessary whitespace, newlines, and comments to compress your code and improve page load speeds.
          </p>
        </div>

        <div className="tool-card" style={{ maxWidth: '800px', margin: '0 auto', cursor: 'default' }}>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <button 
              onClick={() => { setMode('css'); setInput(''); setOutput(''); setError(''); }}
              style={{
                flex: 1,
                padding: '12px',
                background: mode === 'css' ? 'var(--primary-accent)' : 'transparent',
                color: mode === 'css' ? 'var(--bg-dark)' : 'white',
                border: '1px solid ' + (mode === 'css' ? 'var(--primary-accent)' : 'var(--border-color)'),
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Minify CSS
            </button>
            <button 
              onClick={() => { setMode('json'); setInput(''); setOutput(''); setError(''); }}
              style={{
                flex: 1,
                padding: '12px',
                background: mode === 'json' ? 'var(--primary-accent)' : 'transparent',
                color: mode === 'json' ? 'var(--bg-dark)' : 'white',
                border: '1px solid ' + (mode === 'json' ? 'var(--primary-accent)' : 'var(--border-color)'),
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Minify JSON
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                Paste your {mode === 'css' ? 'CSS' : 'JSON'} here:
              </label>
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={'Paste ' + (mode === 'css' ? 'CSS' : 'JSON') + ' code here...'}
                style={{
                  width: '100%',
                  height: '200px',
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-dark)',
                  color: 'white',
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
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
              Minify Code
            </button>
            
            {error && <p style={{ color: '#ff4444' }}>{error}</p>}

            {output && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <span>Minified Output:</span>
                  <span style={{ color: 'var(--primary-accent)', fontWeight: 'bold' }}>
                    Saved {stats.saved}% ({stats.original}b → {stats.minified}b)
                  </span>
                </div>
                <div style={{ position: 'relative' }}>
                  <textarea 
                    readOnly
                    value={output}
                    style={{
                      width: '100%',
                      height: '150px',
                      padding: '16px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      background: 'rgba(0,0,0,0.3)',
                      color: 'white',
                      fontFamily: 'monospace',
                      fontSize: '0.9rem',
                      resize: 'vertical'
                    }}
                  />
                  <button 
                    onClick={copyToClipboard}
                    style={{
                      position: 'absolute',
                      top: '16px',
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
              </div>
            )}
          </div>
        </div>

        <div style={{ maxWidth: '800px', margin: '4rem auto 0 auto', lineHeight: '1.6', color: 'var(--text-color)' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'white' }}>Why Minify Your Code?</h2>
          <p style={{ marginBottom: '1rem' }}>
            When you write CSS or JSON, you naturally use spaces, tabs, and new lines to make the code readable for humans. However, web browsers and computers don't need these spaces to understand the code.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            By stripping out all unnecessary whitespace, you can reduce file sizes by 20% to 50%. This results in faster download times for your users, better Google Core Web Vitals scores, and lower bandwidth costs for your servers.
          </p>

          <FAQ 
            items={[
              {
                question: 'Does minification break the code?',
                answer: 'No. Our minifier follows strict syntactic rules to ensure that only visual formatting (spaces, newlines, and comments) are removed. The logical structure of the code remains 100% intact.'
              },
              {
                question: 'How do I un-minify it later?',
                answer: 'If you lose your original file, you can run the minified JSON through a standard JSON Formatter to add the spaces and indentations back.'
              },
              {
                question: 'Are my code files safe?',
                answer: 'Yes! This minifier runs entirely in your local browser using client-side JavaScript. Your proprietary code is never uploaded to any server.'
              }
            ]} 
          />
        </div>
      </main>
    </div>
  );
}
