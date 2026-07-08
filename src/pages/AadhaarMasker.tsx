import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

export default function AadhaarMasker() {
  useSEO({
    title: 'Aadhaar & ID Card Masker | Secure Privacy Tool | Sivraj',
    description: 'Securely blur and mask your Aadhaar number, PAN card, or ID before sharing it online. 100% private, works entirely in your browser.'
  });

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentRect, setCurrentRect] = useState<{x: number, y: number, w: number, h: number} | null>(null);
  const [rects, setRects] = useState<{x: number, y: number, w: number, h: number}[]>([]);
  
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImageSrc(url);
    
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setImageObj(img);
      setRects([]);
      drawCanvas(img, []);
    };
  };

  const drawCanvas = (img: HTMLImageElement, masks: {x: number, y: number, w: number, h: number}[], tempRect?: {x: number, y: number, w: number, h: number} | null) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match image resolution
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw original image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Apply masks (blurs)
    masks.forEach(rect => {
      applyBlur(ctx, rect.x, rect.y, rect.w, rect.h);
    });

    // Draw temporary selection rectangle
    if (tempRect) {
      ctx.fillStyle = 'rgba(255, 68, 68, 0.3)';
      ctx.strokeStyle = '#ff4444';
      ctx.lineWidth = 4;
      ctx.fillRect(tempRect.x, tempRect.y, tempRect.w, tempRect.h);
      ctx.strokeRect(tempRect.x, tempRect.y, tempRect.w, tempRect.h);
    }
  };

  const applyBlur = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) => {
    // A simple pixelation effect as it's more secure and standard for documents
    // than a gaussian blur which can sometimes be reversed
    if (w <= 0 || h <= 0) return;
    
    const pixelSize = 10;
    
    // Safety bounds
    x = Math.max(0, x);
    y = Math.max(0, y);
    w = Math.min(ctx.canvas.width - x, w);
    h = Math.min(ctx.canvas.height - y, h);

    try {
      const imageData = ctx.getImageData(x, y, w, h);
      const data = imageData.data;
      
      for (let i = 0; i < h; i += pixelSize) {
        for (let j = 0; j < w; j += pixelSize) {
          // Get color of first pixel in block
          const pixelIndex = (i * w + j) * 4;
          const r = data[pixelIndex];
          const g = data[pixelIndex + 1];
          const b = data[pixelIndex + 2];
          
          // Fill block with that color
          for (let dy = 0; dy < pixelSize && i + dy < h; dy++) {
            for (let dx = 0; dx < pixelSize && j + dx < w; dx++) {
              const targetIndex = ((i + dy) * w + (j + dx)) * 4;
              data[targetIndex] = r;
              data[targetIndex + 1] = g;
              data[targetIndex + 2] = b;
              data[targetIndex + 3] = 255;
            }
          }
        }
      }
      ctx.putImageData(imageData, x, y);
    } catch (e) {
      console.error("Blur bounds error", e);
    }
  };

  // Convert mouse/touch coordinates to canvas resolution coordinates
  const getCoordinates = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (!imageObj) return;
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    setStartPos({ x, y });
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !imageObj) return;
    e.preventDefault(); // Prevent scrolling on touch
    
    const { x, y } = getCoordinates(e);
    
    const rect = {
      x: Math.min(x, startPos.x),
      y: Math.min(y, startPos.y),
      w: Math.abs(x - startPos.x),
      h: Math.abs(y - startPos.y)
    };
    
    setCurrentRect(rect);
    drawCanvas(imageObj, rects, rect);
  };

  const handlePointerUp = () => {
    if (!isDrawing || !imageObj) return;
    setIsDrawing(false);
    
    if (currentRect && currentRect.w > 10 && currentRect.h > 10) {
      const newRects = [...rects, currentRect];
      setRects(newRects);
      drawCanvas(imageObj, newRects);
    } else {
      drawCanvas(imageObj, rects); // Clear tiny accidental clicks
    }
    setCurrentRect(null);
  };

  const undoLast = () => {
    if (!imageObj || rects.length === 0) return;
    const newRects = rects.slice(0, -1);
    setRects(newRects);
    drawCanvas(imageObj, newRects);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const url = canvas.toDataURL('image/jpeg', 0.9);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'masked_document.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Add event listeners for touch/mouse outside to stop drawing safely
  useEffect(() => {
    const handleGlobalUp = () => {
      if (isDrawing) handlePointerUp();
    };
    window.addEventListener('mouseup', handleGlobalUp);
    window.addEventListener('touchend', handleGlobalUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalUp);
      window.removeEventListener('touchend', handleGlobalUp);
    };
  }, [isDrawing, currentRect]);

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
          <div className="tool-icon-wrapper" style={{ margin: '0 auto 1.5rem auto' }}>🛡️</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Aadhaar & ID Masker</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Securely blur your Aadhaar number or sensitive details before sharing. 
            <strong style={{ color: '#00e676' }}> 100% Private. Images never leave your device.</strong>
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
                position: 'relative',
                background: 'var(--bg-dark)'
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
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🆔</div>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>Upload ID Card</h3>
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>Click or drag and drop to start masking</p>
            </div>
          )}

          {imageSrc && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <p style={{ margin: 0, color: 'var(--primary-accent)', fontWeight: 'bold' }}>
                  👆 Click and drag over text to blur it.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button 
                    onClick={undoLast}
                    disabled={rects.length === 0}
                    style={{
                      background: 'transparent',
                      color: rects.length > 0 ? 'white' : 'var(--text-muted)',
                      border: '1px solid var(--border-color)',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      cursor: rects.length > 0 ? 'pointer' : 'not-allowed'
                    }}
                  >
                    ↩️ Undo Last
                  </button>
                  <button 
                    onClick={() => { setImageSrc(null); setRects([]); setImageObj(null); }}
                    style={{
                      background: 'transparent',
                      color: '#ff4444',
                      border: '1px solid #ff4444',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    Start Over
                  </button>
                </div>
              </div>

              <div 
                ref={containerRef}
                style={{ 
                  width: '100%', 
                  overflow: 'hidden',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  touchAction: 'none', // Prevent scrolling on mobile while drawing
                  cursor: 'crosshair',
                  background: '#000'
                }}
              >
                <canvas 
                  ref={canvasRef} 
                  onMouseDown={handlePointerDown}
                  onMouseMove={handlePointerMove}
                  onMouseUp={handlePointerUp}
                  onTouchStart={handlePointerDown}
                  onTouchMove={handlePointerMove}
                  onTouchEnd={handlePointerUp}
                  style={{ 
                    display: 'block', 
                    width: '100%', 
                    height: 'auto',
                    userSelect: 'none'
                  }}
                ></canvas>
              </div>

              <button 
                onClick={downloadImage}
                disabled={rects.length === 0}
                style={{
                  width: '100%',
                  background: rects.length > 0 ? 'var(--primary-accent)' : 'var(--bg-dark)',
                  color: 'var(--bg-dark)',
                  border: 'none',
                  padding: '16px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  cursor: rects.length > 0 ? 'pointer' : 'not-allowed',
                  marginTop: '1.5rem',
                  opacity: rects.length > 0 ? 1 : 0.5
                }}
              >
                {rects.length > 0 ? '💾 Download Safe Image' : 'Mask something first!'}
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
