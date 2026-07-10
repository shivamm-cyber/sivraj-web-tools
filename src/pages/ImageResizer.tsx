import { useSEO } from '../hooks/useSEO';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FAQ from '../components/FAQ';

export default function ImageResizer() {
  useSEO({
    title: 'Free Image Resizer | Resize for Instagram & Web | Sivraj',
    description: 'Instantly resize images and photos to exact dimensions without losing quality. Perfect for Instagram, Twitter, and web design.'
  });

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [lockAspect, setLockAspect] = useState(true);
  const [outputSrc, setOutputSrc] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setOriginalFile(file);
      const url = URL.createObjectURL(file);
      setImageSrc(url);
      
      const img = new Image();
      img.onload = () => {
        setOriginalWidth(img.width);
        setOriginalHeight(img.height);
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = url;
    }
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value) || 0;
    setWidth(newWidth);
    if (lockAspect && originalWidth > 0) {
      setHeight(Math.round(newWidth * (originalHeight / originalWidth)));
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseInt(e.target.value) || 0;
    setHeight(newHeight);
    if (lockAspect && originalHeight > 0) {
      setWidth(Math.round(newHeight * (originalWidth / originalHeight)));
    }
  };

  const processImage = () => {
    if (!imageSrc || !canvasRef.current || width <= 0 || height <= 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      
      // We want high quality resizing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      ctx.drawImage(img, 0, 0, width, height);
      setOutputSrc(canvas.toDataURL('image/jpeg', 0.9));
    };
    img.src = imageSrc;
  };

  useEffect(() => {
    if (imageSrc) {
      // Clean up object url on unmount to prevent memory leaks
      return () => URL.revokeObjectURL(imageSrc);
    }
  }, [imageSrc]);

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
          <div className="tool-icon-wrapper" style={{ margin: '0 auto 1.5rem auto' }}>📏</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Image Resizer</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Perfectly resize photos to exact pixel dimensions. No quality loss, no server uploads.
          </p>
        </div>

        <div className="tool-card" style={{ maxWidth: '800px', margin: '0 auto', cursor: 'default' }}>
          
          {!imageSrc ? (
            <div 
              style={{
                border: '2px dashed var(--border-color)',
                borderRadius: '12px',
                padding: '4rem 2rem',
                textAlign: 'center',
                cursor: 'pointer',
                background: 'rgba(255,255,255,0.02)'
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🖼️</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Click to Upload Image</h3>
              <p style={{ color: 'var(--text-muted)' }}>Supports JPG, PNG, WEBP (Max 50MB)</p>
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <img 
                    src={imageSrc} 
                    alt="Original" 
                    style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#111' }} 
                  />
                  <div style={{ textAlign: 'center', marginTop: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    Original: {originalWidth} x {originalHeight}px
                  </div>
                </div>
                
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ background: 'var(--bg-dark)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Dimensions</h3>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Width (px)</label>
                        <input type="number" value={width} onChange={handleWidthChange} style={{ width: '100%', padding: '8px', background: '#222', border: '1px solid #444', color: 'white', borderRadius: '4px' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Height (px)</label>
                        <input type="number" value={height} onChange={handleHeightChange} style={{ width: '100%', padding: '8px', background: '#222', border: '1px solid #444', color: 'white', borderRadius: '4px' }} />
                      </div>
                    </div>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      <input 
                        type="checkbox" 
                        checked={lockAspect} 
                        onChange={(e) => setLockAspect(e.target.checked)} 
                        style={{ accentColor: 'var(--primary-accent)' }}
                      />
                      Lock Aspect Ratio 🔒
                    </label>

                    <button 
                      onClick={processImage}
                      style={{
                        width: '100%',
                        background: 'var(--primary-accent)',
                        color: 'var(--bg-dark)',
                        border: 'none',
                        padding: '12px',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        marginTop: '1.5rem',
                        cursor: 'pointer'
                      }}
                    >
                      Resize Image
                    </button>
                    
                    <button 
                      onClick={() => {
                        setImageSrc(null);
                        setOutputSrc(null);
                        setOriginalFile(null);
                      }}
                      style={{
                        width: '100%',
                        background: 'transparent',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border-color)',
                        padding: '12px',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        marginTop: '0.5rem',
                        cursor: 'pointer'
                      }}
                    >
                      Upload Different Image
                    </button>

                  </div>
                </div>
              </div>

              {/* Hidden canvas for processing */}
              <canvas ref={canvasRef} style={{ display: 'none' }} />

              {outputSrc && (
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
                  <h3 style={{ marginBottom: '1rem', textAlign: 'center' }}>Resized Result</h3>
                  <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                     <img 
                      src={outputSrc} 
                      alt="Resized" 
                      style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px', border: '1px solid var(--border-color)' }} 
                    />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <a 
                      href={outputSrc}
                      download={(originalFile?.name.split('.')[0] || 'resized') + '_resized.jpg'}
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
                      Download Resized Image ↓
                    </a>
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

        <div style={{ maxWidth: '800px', margin: '4rem auto 0 auto', lineHeight: '1.6', color: 'var(--text-color)' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'white' }}>How to Resize Images Properly</h2>
          <p style={{ marginBottom: '1rem' }}>
            Uploading images directly from your phone's camera roll to the web is usually a bad idea. An original iPhone photo is often 4000x3000 pixels. If you try to upload that as an Instagram profile picture, their algorithm will forcefully crush it down, resulting in a blurry mess.
          </p>

          <FAQ 
            items={[
              {
                question: 'What are the best dimensions for Instagram?',
                answer: 'For a square post, you should resize exactly to 1080 x 1080 pixels (uncheck lock aspect ratio if you are cropping). For a portrait post, use 1080 x 1350 pixels. For an Instagram story, use 1080 x 1920 pixels.'
              },
              {
                question: 'Does changing the dimensions reduce file size?',
                answer: 'Yes, drastically! Shrinking an image from 4000px down to 1080px removes millions of unnecessary pixels, often reducing the file size by 80% without losing any visible quality on mobile screens.'
              }
            ]} 
          />
        </div>
      </main>
    </div>
  );
}
