import { useSEO } from '../hooks/useSEO';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import FAQ from '../components/FAQ';

export default function ColorPicker() {
  useSEO({
    title: 'Advanced Color Picker | HEX & RGB Tool | Sivraj',
    description: 'Find the perfect color for your web design. Generate precise HEX, RGB, and HSL codes instantly with our advanced interactive color picker.'
  });

  const [hexColor, setHexColor] = useState('#3B82F6');
  const [rgbColor, setRgbColor] = useState('rgb(59, 130, 246)');
  const [copied, setCopied] = useState('');
  
  const colorInputRef = useRef<HTMLInputElement>(null);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value.toUpperCase();
    setHexColor(hex);
    
    // Convert hex to rgb
    const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
    if (result) {
      setRgbColor('rgb(' + parseInt(result[1], 16) + ', ' + parseInt(result[2], 16) + ', ' + parseInt(result[3], 16) + ')');
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const presetColors = [
    '#EF4444', '#F97316', '#F59E0B', '#10B981', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899',
    '#111827', '#4B5563', '#9CA3AF', '#F3F4F6'
  ];

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
          <div className="tool-icon-wrapper" style={{ margin: '0 auto 1.5rem auto' }}>🎨</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Advanced Color Picker</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Find the perfect color and get instant CSS-ready HEX and RGB codes for your next web design project.
          </p>
        </div>

        <div className="tool-card" style={{ maxWidth: '600px', margin: '0 auto', cursor: 'default' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            
            {/* The actual native color input hidden behind a big styled box */}
            <div 
              style={{
                width: '100%',
                height: '150px',
                borderRadius: '12px',
                background: hexColor,
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                position: 'relative',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid rgba(255,255,255,0.1)'
              }}
              onClick={() => colorInputRef.current?.click()}
            >
              <span style={{ 
                background: 'rgba(0,0,0,0.5)', 
                color: 'white', 
                padding: '8px 16px', 
                borderRadius: '20px',
                fontWeight: 'bold'
              }}>
                Click to Open Picker
              </span>
              <input 
                ref={colorInputRef}
                type="color" 
                value={hexColor}
                onChange={handleColorChange}
                style={{
                  position: 'absolute',
                  opacity: 0,
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer'
                }}
              />
            </div>

            <div style={{ width: '100%', display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1, background: 'var(--bg-dark)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', position: 'relative' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>HEX Code</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', fontFamily: 'monospace' }}>{hexColor}</div>
                <button 
                  onClick={() => copyToClipboard(hexColor, 'hex')}
                  style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'var(--primary-accent)', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  {copied === 'hex' ? 'Copied!' : 'Copy'}
                </button>
              </div>

              <div style={{ flex: 1, background: 'var(--bg-dark)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', position: 'relative' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>RGB Code</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', fontFamily: 'monospace' }}>{rgbColor}</div>
                <button 
                  onClick={() => copyToClipboard(rgbColor, 'rgb')}
                  style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'var(--primary-accent)', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  {copied === 'rgb' ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            <div style={{ width: '100%', marginTop: '1rem' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'block', marginBottom: '1rem', textAlign: 'center' }}>Tailwind CSS Presets</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                {presetColors.map(color => (
                  <div 
                    key={color}
                    onClick={() => {
                      setHexColor(color);
                      const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(color);
                      if (result) {
                        setRgbColor('rgb(' + parseInt(result[1], 16) + ', ' + parseInt(result[2], 16) + ', ' + parseInt(result[3], 16) + ')');
                      }
                    }}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      background: color,
                      cursor: 'pointer',
                      border: hexColor === color ? '3px solid white' : '1px solid var(--border-color)',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>

        <div style={{ maxWidth: '800px', margin: '4rem auto 0 auto', lineHeight: '1.6', color: 'var(--text-color)' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'white' }}>Understanding Web Colors</h2>
          <p style={{ marginBottom: '1rem' }}>
            In modern web design, consistency in color is critical for brand identity. But computers require precise mathematical codes to render colors correctly on different screens.
          </p>

          <FAQ 
            items={[
              {
                question: 'What is the difference between HEX and RGB?',
                answer: 'HEX (Hexadecimal) uses a base-16 mathematical formula to represent colors in a concise 6-character string (e.g., #FF0000 for red). RGB (Red, Green, Blue) represents colors by mixing light values from 0 to 255. Both are fully supported in CSS.'
              },
              {
                question: 'Which format should I use in my CSS?',
                answer: 'It is mostly personal preference! HEX is shorter and faster to copy-paste. However, if you need to add opacity (transparency) to a color in CSS, using rgba(r, g, b, alpha) is often easier to read than 8-character HEX codes.'
              }
            ]} 
          />
        </div>
      </main>
    </div>
  );
}
