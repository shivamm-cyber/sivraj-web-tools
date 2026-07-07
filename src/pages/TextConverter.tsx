import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function TextConverter() {
  const [text, setText] = useState('');

  const handleCaseChange = (type: 'upper' | 'lower' | 'title' | 'sentence' | 'camel' | 'snake') => {
    let newText = '';
    
    switch (type) {
      case 'upper':
        newText = text.toUpperCase();
        break;
      case 'lower':
        newText = text.toLowerCase();
        break;
      case 'title':
        newText = text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        break;
      case 'sentence':
        newText = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
        break;
      case 'camel':
        newText = text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
        break;
      case 'snake':
        newText = text.toLowerCase().replace(/\s+/g, '_');
        break;
    }
    
    setText(newText);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
  };

  const clearText = () => {
    setText('');
  };

  // Stats calculation
  const charCount = text.length;
  const charNoSpaces = text.replace(/\s/g, '').length;
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200); // avg 200 words per min

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
          <div className="tool-icon-wrapper" style={{ margin: '0 auto 1.5rem auto' }}>📝</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Text & Case Converter</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Instantly change the capitalization of your text, count words, and calculate reading time.
          </p>
        </div>

        <div className="tool-card" style={{ maxWidth: '800px', margin: '0 auto', cursor: 'default' }}>
          
          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <button className="case-btn" onClick={() => handleCaseChange('upper')}>UPPERCASE</button>
            <button className="case-btn" onClick={() => handleCaseChange('lower')}>lowercase</button>
            <button className="case-btn" onClick={() => handleCaseChange('title')}>Title Case</button>
            <button className="case-btn" onClick={() => handleCaseChange('sentence')}>Sentence case</button>
            <button className="case-btn" onClick={() => handleCaseChange('camel')}>camelCase</button>
            <button className="case-btn" onClick={() => handleCaseChange('snake')}>snake_case</button>
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            .case-btn {
              background: rgba(0,0,0,0.3);
              color: white;
              border: 1px solid var(--border-color);
              padding: 8px 16px;
              border-radius: 20px;
              cursor: pointer;
              transition: all 0.2s;
            }
            .case-btn:hover {
              background: var(--primary-accent);
              color: var(--bg-dark);
            }
          `}} />

          {/* Text Area */}
          <div style={{ position: 'relative' }}>
            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here..."
              style={{
                width: '100%',
                height: '300px',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid var(--border-color)',
                color: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                fontSize: '1rem',
                lineHeight: '1.5',
                resize: 'vertical'
              }}
            />
            
            <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '8px' }}>
              <button 
                onClick={copyToClipboard}
                style={{ background: 'var(--primary-accent)', color: 'var(--bg-dark)', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Copy
              </button>
              <button 
                onClick={clearText}
                style={{ background: '#ff4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Clear
              </button>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-accent)' }}>{wordCount}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Words</div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-accent)' }}>{charCount}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Characters</div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-accent)' }}>{charNoSpaces}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Without Spaces</div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-accent)' }}>{readingTime}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Min Read</div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
