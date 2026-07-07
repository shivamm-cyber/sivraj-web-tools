import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { removeBackground } from '@imgly/background-removal';

export default function BackgroundRemover() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [error, setError] = useState('');

  const originalUrlRef = useRef<string | null>(null);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (originalUrlRef.current) URL.revokeObjectURL(originalUrlRef.current);
      if (processedUrl) URL.revokeObjectURL(processedUrl);
    };
  }, [processedUrl]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file.');
        return;
      }
      setOriginalFile(file);
      setProcessedUrl(null);
      setError('');
      setProgress(0);
      setStatusText('');
      
      if (originalUrlRef.current) URL.revokeObjectURL(originalUrlRef.current);
      originalUrlRef.current = URL.createObjectURL(file);
    }
  };

  const handleRemoveBackground = async () => {
    if (!originalFile) return;

    setIsProcessing(true);
    setError('');
    setProgress(0);
    setStatusText('Initializing AI Model (This might take a moment the very first time)...');

    try {
      const blob = await removeBackground(originalFile, {
        progress: (key, current, total) => {
          if (key === 'compute:inference') {
            setStatusText('Erasing Background...');
            setProgress(Math.round((current / total) * 100));
          } else if (key.startsWith('fetch:')) {
            setStatusText(`Loading AI Model Assets...`);
            // Only update progress if total is meaningful
            if (total > 0 && current <= total) {
                setProgress(Math.round((current / total) * 100));
            }
          }
        }
      });
      
      const newUrl = URL.createObjectURL(blob);
      setProcessedUrl(newUrl);
      setStatusText('Done!');
    } catch (err) {
      setError('Background removal failed. Please try a different image.');
      console.error(err);
    } finally {
      setIsProcessing(false);
      setTimeout(() => { if (!error) setStatusText(''); }, 2000);
    }
  };

  const handleDownload = () => {
    if (!processedUrl) return;
    const link = document.createElement('a');
    link.href = processedUrl;
    const newName = originalFile?.name.replace(/(\.[\w\d_-]+)$/i, '_nobg.png');
    link.download = newName || 'transparent_image.png';
    link.click();
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
          <div className="tool-icon-wrapper" style={{ margin: '0 auto 1.5rem auto' }}>✨</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>AI Background Remover</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Magically erase the background from any photo. 100% free and powered by on-device AI for total privacy.
          </p>
        </div>

        <div className="tool-card" style={{ maxWidth: '800px', margin: '0 auto', cursor: 'default' }}>
          
          {/* Upload Area */}
          <div style={{ 
            border: '2px dashed var(--border-color)', 
            borderRadius: '16px', 
            padding: '2rem',
            textAlign: 'center',
            marginBottom: '2rem',
            background: 'rgba(0,0,0,0.2)'
          }}>
            <input 
              type="file" 
              accept="image/*" 
              id="file-upload" 
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
            <label htmlFor="file-upload" style={{
              background: 'var(--primary-accent)',
              color: 'var(--bg-dark)',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'inline-block',
              marginBottom: '1rem'
            }}>
              {originalFile ? 'Select Different Image' : 'Upload an Image'}
            </label>
            {error && <p style={{ color: '#ff4444', marginTop: '1rem' }}>{error}</p>}
          </div>

          {/* Previews & Controls */}
          {originalFile && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                
                {/* Original Image */}
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Original</h3>
                  <div style={{ 
                    height: '250px', 
                    background: 'var(--bg-dark)', 
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    border: '1px solid var(--border-color)'
                  }}>
                    <img 
                      src={originalUrlRef.current!} 
                      alt="Original" 
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                  </div>
                </div>

                {/* Processed Image */}
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ color: 'var(--primary-accent)', marginBottom: '1rem' }}>Result</h3>
                  <div style={{ 
                    height: '250px', 
                    background: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYNgfQIhO6/9/DAxgY2TAhAswMDD8Z0AGRzWMBqNhMBgNQyBwEBEiOwoANz0XwwXlH0wAAAAASUVORK5CYII=") repeat',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    border: '1px solid rgba(0, 240, 255, 0.2)',
                    position: 'relative'
                  }}>
                    {processedUrl ? (
                       <img 
                       src={processedUrl} 
                       alt="Transparent Result" 
                       style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                     />
                    ) : (
                      <div style={{ color: 'var(--text-muted)' }}>
                        {isProcessing ? 'Working magic...' : 'Waiting...'}
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                {!processedUrl && (
                  <button 
                    onClick={handleRemoveBackground}
                    disabled={isProcessing}
                    style={{
                      background: 'var(--secondary-accent)',
                      color: 'white',
                      border: 'none',
                      padding: '16px 32px',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      cursor: isProcessing ? 'wait' : 'pointer',
                      opacity: isProcessing ? 0.7 : 1,
                      width: '100%',
                      maxWidth: '400px'
                    }}
                  >
                    {isProcessing ? `Processing... ${progress}%` : '✨ Remove Background'}
                  </button>
                )}

                {isProcessing && statusText && (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{statusText}</p>
                )}

                {processedUrl && (
                  <button 
                    onClick={handleDownload}
                    style={{
                      background: 'var(--primary-accent)',
                      color: 'var(--bg-dark)',
                      border: 'none',
                      padding: '16px 32px',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      cursor: 'pointer',
                      width: '100%',
                      maxWidth: '400px'
                    }}
                  >
                    Download Transparent PNG
                  </button>
                )}
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  );
}
