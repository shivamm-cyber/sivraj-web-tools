import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function WordAnalyzer() {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0
  });
  const [keywords, setKeywords] = useState<{word: string, count: number}[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Calculate basic stats
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const sentences = text.trim() ? (text.match(/[\w|\)][.?!](\s|$)/g) || []).length + (text.match(/[\w|\)][.?!]$/) ? 1 : 0) : 0;
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).length : 0;
    
    // Reading time (avg 200 words per min)
    const readingTime = Math.ceil(words / 200);

    setStats({
      words,
      characters,
      charactersNoSpaces,
      sentences: sentences === 0 && text.trim().length > 0 ? 1 : sentences,
      paragraphs,
      readingTime
    });

    // Keyword density
    if (words > 0) {
      const wordsArray = text.toLowerCase().match(/\b(\w+)\b/g) || [];
      const stopWords = ['the', 'is', 'at', 'which', 'on', 'in', 'and', 'a', 'an', 'to', 'of', 'for', 'it', 'with', 'as', 'by', 'this', 'that', 'are', 'was', 'were', 'be', 'but', 'not'];
      
      const counts: Record<string, number> = {};
      wordsArray.forEach(word => {
        if (!stopWords.includes(word) && word.length > 2) {
          counts[word] = (counts[word] || 0) + 1;
        }
      });

      const sortedKeywords = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([word, count]) => ({ word, count }));
      
      setKeywords(sortedKeywords);
    } else {
      setKeywords([]);
    }

  }, [text]);

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
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Word & SEO Analyzer</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Count words, characters, sentences, and extract top keywords instantly. Processing happens 100% locally in your browser.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div className="tool-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2rem', color: 'var(--primary-accent)', margin: '0' }}>{stats.words}</h3>
            <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 0 0' }}>Words</p>
          </div>
          <div className="tool-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2rem', color: 'var(--primary-accent)', margin: '0' }}>{stats.characters}</h3>
            <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 0 0' }}>Characters</p>
          </div>
          <div className="tool-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2rem', color: 'var(--primary-accent)', margin: '0' }}>{stats.sentences}</h3>
            <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 0 0' }}>Sentences</p>
          </div>
          <div className="tool-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2rem', color: 'var(--primary-accent)', margin: '0' }}>{stats.readingTime}m</h3>
            <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 0 0' }}>Reading Time</p>
          </div>
        </div>

        <div className="tool-card" style={{ marginBottom: '2rem' }}>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            style={{
              width: '100%',
              minHeight: '300px',
              background: 'var(--bg-dark)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-light)',
              padding: '1.5rem',
              borderRadius: '12px',
              fontSize: '1.1rem',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button 
              onClick={() => setText('')}
              style={{
                background: 'transparent',
                color: '#ff4444',
                border: '1px solid #ff4444',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Clear Text
            </button>
          </div>
        </div>

        {keywords.length > 0 && (
          <div className="tool-card">
            <h3 style={{ marginTop: '0', marginBottom: '1.5rem' }}>Keyword Density (SEO)</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {keywords.map((kw, i) => (
                <div key={i} style={{ 
                  background: 'var(--bg-dark)', 
                  border: '1px solid var(--primary-accent)',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  display: 'flex',
                  gap: '8px'
                }}>
                  <span>{kw.word}</span>
                  <span style={{ color: 'var(--primary-accent)', fontWeight: 'bold' }}>{kw.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
