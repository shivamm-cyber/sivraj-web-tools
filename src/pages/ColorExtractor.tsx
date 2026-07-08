import { useSEO } from '../hooks/useSEO';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function ColorExtractor() {
  useSEO({
    title: 'Color Extractor | Free Online Tool | Sivraj',
    description: 'Free online Color Extractor tool running entirely in your browser. Fast, secure, and 100% private.'
  });

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [colors, setColors] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImageSrc(url);
    
    const img = new Image();
    img.src = url;
    img.onload = () => {
      extractColors(img);
    };
  };

  const extractColors = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Scale down image to speed up processing
    const MAX_WIDTH = 200;
    const scale = MAX_WIDTH / img.width;
    canvas.width = MAX_WIDTH;
    canvas.height = img.height * scale;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    const colorMap: Record<string, number> = {};
    const rgbToHex = (r: number, g: number, b: number) => 
      "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase();

    // Sample every 4th pixel for speed
    for (let i = 0; i < imageData.length; i += 16) {
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];
      const a = imageData[i + 3];

      if (a < 128) continue; // Skip transparent pixels
      
      // Reduce color space to group similar colors
      const quantizedR = Math.round(r / 32) * 32;
      const quantizedG = Math.round(g / 32) * 32;
      const quantizedB = Math.round(b / 32) * 32;
      
      const hex = rgbToHex(quantizedR, quantizedG, quantizedB);
      colorMap[hex] = (colorMap[hex] || 0) + 1;
    }

    // Sort by frequency and take top 6
    const sortedColors = Object.entries(colorMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([hex]) => hex);

    setColors(sortedColors);
  };

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    // Simple visual feedback
    const el = document.getElementById(`color-${hex}`);
    if (el) {
      el.innerText = 'Copied!';
      setTimeout(() => {
        el.innerText = hex;
      }, 1000);
    }
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
          <div className="tool-icon-wrapper" style={{ margin: '0 auto 1.5rem auto' }}>🎨</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Color Palette Extractor</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Upload an image to extract its dominant color palette instantly. Processing happens securely in your browser.
          </p>
        </div>

        <div className="tool-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          {!imageSrc && (
            <div 
              style={{
                border: '2px dashed var(--border-color)',
                borderRadius: '12px',
                padding: '4rem 2rem',
                textAlign: 'center',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
                style={{
                  position: 'absolute',
                  top: 0, left: 0, width: '100%', height: '100%',
                  opacity: 0, cursor: 'pointer'
                }}
              />
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🖼️</div>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>Upload an Image</h3>
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>Click or drag and drop to extract colors</p>
            </div>
          )}

          {imageSrc && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <img 
                  src={imageSrc} 
                  alt="Uploaded" 
                  style={{ width: '100%', borderRadius: '12px', border: '1px solid var(--border-color)' }}
                />
                <button 
                  onClick={() => { setImageSrc(null); setColors([]); }}
                  style={{
                    background: 'transparent',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--border-color)',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    marginTop: '1rem',
                    width: '100%'
                  }}
                >
                  Upload New Image
                </button>
              </div>

              <div>
                <h3 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Extracted Palette</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {colors.map((color, idx) => (
                    <div 
                      key={idx}
                      onClick={() => copyToClipboard(color)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        background: 'var(--bg-dark)',
                        padding: '1rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      <div style={{ 
                        width: '40px', 
                        height: '40px', 
                        backgroundColor: color,
                        borderRadius: '50%',
                        border: '2px solid white'
                      }}></div>
                      <span id={`color-${color}`} style={{ fontWeight: 'bold', flex: 1 }}>{color}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Click to copy</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Hidden canvas for processing */}
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </div>
      </main>
    </div>
  );
}
