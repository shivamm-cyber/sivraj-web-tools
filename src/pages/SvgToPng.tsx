import { useSEO } from '../hooks/useSEO';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FAQ from '../components/FAQ';

export default function SvgToPng() {
  useSEO({
    title: 'SVG to PNG Converter | High Res Export | Sivraj',
    description: 'Convert vector SVG files or raw SVG code into high-quality, transparent PNG images instantly in your browser.'
  });

  const [inputMode, setInputMode] = useState<'file' | 'code'>('file');
  const [svgContent, setSvgContent] = useState<string>('');
  const [fileName, setFileName] = useState('converted_image');
  const [targetWidth, setTargetWidth] = useState(1000);
  const [outputSrc, setOutputSrc] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'image/svg+xml') {
      setFileName(file.name.replace('.svg', ''));
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setSvgContent(result);
        setOutputSrc(null);
      };
      reader.readAsText(file);
    } else {
      alert('Please upload a valid SVG file.');
    }
  };

  const processConversion = () => {
    if (!svgContent || !canvasRef.current) return;
    
    // We need to render the SVG to an image first
    const svgBlob = new Blob([svgContent], {type: 'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(svgBlob);
    
    const img = new Image();
    img.onload = () => {
      // Calculate aspect ratio to set height
      const aspectRatio = img.height / img.width;
      const targetHeight = targetWidth * aspectRatio;
      
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Clear canvas (transparent background)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      
      // Get high-res PNG
      setOutputSrc(canvas.toDataURL('image/png', 1.0));
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      alert('Invalid SVG code. Could not render.');
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  useEffect(() => {
    // Re-process if target width changes and we already have an output
    if (outputSrc && svgContent) {
       // Debouncing would be better here, but for simplicity:
       const timeoutId = setTimeout(() => {
         processConversion();
       }, 500);
       return () => clearTimeout(timeoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetWidth]);

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
          <div className="tool-icon-wrapper" style={{ margin: '0 auto 1.5rem auto' }}>🖼️</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>SVG to PNG Converter</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Convert vector graphics into high-resolution, pixel-perfect PNG images with transparent backgrounds.
          </p>
        </div>

        <div className="tool-card" style={{ maxWidth: '800px', margin: '0 auto', cursor: 'default' }}>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <button 
              onClick={() => { setInputMode('file'); setOutputSrc(null); }}
              style={{
                flex: 1,
                padding: '12px',
                background: inputMode === 'file' ? 'var(--primary-accent)' : 'transparent',
                color: inputMode === 'file' ? 'var(--bg-dark)' : 'white',
                border: '1px solid ' + (inputMode === 'file' ? 'var(--primary-accent)' : 'var(--border-color)'),
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Upload SVG File
            </button>
            <button 
              onClick={() => { setInputMode('code'); setOutputSrc(null); setSvgContent(''); }}
              style={{
                flex: 1,
                padding: '12px',
                background: inputMode === 'code' ? 'var(--primary-accent)' : 'transparent',
                color: inputMode === 'code' ? 'var(--bg-dark)' : 'white',
                border: '1px solid ' + (inputMode === 'code' ? 'var(--primary-accent)' : 'var(--border-color)'),
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Paste SVG Code
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {inputMode === 'file' && (
              <div 
                style={{
                  border: '2px dashed var(--border-color)',
                  borderRadius: '12px',
                  padding: '3rem 2rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: 'rgba(255,255,255,0.02)'
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📁</div>
                <h3 style={{ marginBottom: '0.5rem' }}>{svgContent ? 'File Uploaded!' : 'Click to Upload .SVG File'}</h3>
                <p style={{ color: 'var(--text-muted)' }}>{svgContent ? 'Click "Convert" below.' : 'Select a vector file from your device.'}</p>
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept=".svg" 
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </div>
            )}

            {inputMode === 'code' && (
              <div>
                <textarea 
                  value={svgContent}
                  onChange={(e) => setSvgContent(e.target.value)}
                  placeholder="<svg viewBox='0 0 100 100'>...</svg>"
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
            )}

            {(svgContent.length > 0 && !outputSrc) && (
              <button 
                onClick={processConversion}
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
                Convert to PNG
              </button>
            )}

            {/* Hidden canvas for processing */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />

            {outputSrc && (
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
                <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Conversion Success!</h3>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                  <label style={{ color: 'var(--text-muted)' }}>Output Resolution Width:</label>
                  <input 
                    type="number" 
                    value={targetWidth} 
                    onChange={(e) => setTargetWidth(parseInt(e.target.value) || 100)}
                    min="10"
                    max="5000"
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', background: '#222', color: 'white', width: '100px' }}
                  />
                  <span style={{ color: 'var(--text-muted)' }}>px</span>
                </div>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                   <div style={{ 
                      background: 'repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%) 50% / 20px 20px',
                      borderRadius: '8px',
                      display: 'inline-block',
                      padding: '1rem',
                      border: '1px solid var(--border-color)'
                   }}>
                     <img 
                      src={outputSrc} 
                      alt="Converted PNG" 
                      style={{ maxWidth: '100%', maxHeight: '300px', display: 'block' }} 
                    />
                   </div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <a 
                    href={outputSrc}
                    download={fileName + '.png'}
                    style={{
                      display: 'inline-block',
                      background: '#10B981',
                      color: 'white',
                      textDecoration: 'none',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                    }}
                  >
                    Download PNG ↓
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>

        <div style={{ maxWidth: '800px', margin: '4rem auto 0 auto', lineHeight: '1.6', color: 'var(--text-color)' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'white' }}>Why Convert SVG to PNG?</h2>
          <p style={{ marginBottom: '1rem' }}>
            SVGs (Scalable Vector Graphics) are mathematically drawn, making them perfect for logos and icons because they never lose quality when scaled. 
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            However, many older platforms, presentation software, and social media sites (like Instagram or Twitter) strictly require raster images (pixels). Converting an SVG to a high-resolution PNG is the best way to maintain transparency while gaining universal compatibility.
          </p>

          <FAQ 
            items={[
              {
                question: 'Will I lose quality?',
                answer: 'Because SVGs are vectors, we can render them at ANY size before converting them to pixels. Just increase the "Output Resolution Width" slider above, and the resulting PNG will be incredibly crisp.'
              },
              {
                question: 'Are my SVGs uploaded to a server?',
                answer: 'No. The entire conversion process uses the HTML5 Canvas API directly inside your web browser. Your proprietary vector files never leave your computer.'
              }
            ]} 
          />
        </div>
      </main>
    </div>
  );
}
