import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function JsonFormatter() {
  const [inputStr, setInputStr] = useState('');
  const [outputStr, setOutputStr] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    try {
      if (!inputStr.trim()) {
        setOutputStr('');
        setError('');
        return;
      }
      const parsed = JSON.parse(inputStr);
      const formatted = JSON.stringify(parsed, null, 4);
      setOutputStr(formatted);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Invalid JSON syntax');
      setOutputStr('');
    }
  };

  const copyToClipboard = () => {
    if (!outputStr) return;
    navigator.clipboard.writeText(outputStr);
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
          <div className="tool-icon-wrapper" style={{ margin: '0 auto 1.5rem auto' }}>👨‍💻</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>JSON Formatter & Validator</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Paste messy JSON code to instantly format and validate it. Runs entirely in your browser securely.
          </p>
        </div>

        <div className="tool-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ color: 'var(--text-muted)' }}>Input (Minified or Messy JSON)</label>
              {error && <span style={{ color: '#ff4444', fontSize: '0.9rem' }}>{error}</span>}
            </div>
            <textarea
              value={inputStr}
              onChange={(e) => {
                setInputStr(e.target.value);
                setError('');
              }}
              placeholder='{"name":"John","age":30,"city":"New York"}'
              style={{
                width: '100%',
                minHeight: '200px',
                background: 'var(--bg-dark)',
                border: error ? '1px solid #ff4444' : '1px solid var(--border-color)',
                color: 'var(--text-light)',
                padding: '1.5rem',
                borderRadius: '12px',
                fontFamily: 'monospace',
                fontSize: '1rem',
                resize: 'vertical',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              onClick={formatJson}
              style={{
                background: 'var(--primary-accent)',
                color: 'var(--bg-dark)',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                flex: 1
              }}
            >
              Format JSON
            </button>
            <button 
              onClick={() => { setInputStr(''); setOutputStr(''); setError(''); }}
              style={{
                background: 'transparent',
                color: 'var(--text-muted)',
                border: '1px solid var(--border-color)',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Clear
            </button>
          </div>

          {outputStr && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ color: 'var(--text-muted)' }}>Output (Formatted)</label>
                <button 
                  onClick={copyToClipboard}
                  style={{
                    background: 'transparent',
                    color: 'var(--primary-accent)',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  {copied ? 'Copied!' : 'Copy to Clipboard'}
                </button>
              </div>
              <textarea
                readOnly
                value={outputStr}
                style={{
                  width: '100%',
                  minHeight: '300px',
                  background: '#0f172a',
                  border: '1px solid var(--primary-accent)',
                  color: '#a5b4fc',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  fontFamily: 'monospace',
                  fontSize: '1rem',
                  resize: 'vertical',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
