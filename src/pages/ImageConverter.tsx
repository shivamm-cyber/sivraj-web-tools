import { useSEO } from '../hooks/useSEO';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import heic2any from 'heic2any';

type ImageFormat = 'image/jpeg' | 'image/png' | 'image/webp';

export default function ImageConverter() {
  useSEO({
    title: 'Image Converter | Free Online Tool | Sivraj',
    description: 'Free online Image Converter tool running entirely in your browser. Fast, secure, and 100% private.'
  });

  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<ImageFormat>('image/jpeg');
  const [isProcessing, setIsProcessing] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [error, setError] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOriginalFile(file);
      setConvertedUrl(null);
      setError('');
    }
  };

  const getExtension = (mimeType: string) => {
    switch (mimeType) {
      case 'image/jpeg': return 'jpg';
      case 'image/png': return 'png';
      case 'image/webp': return 'webp';
      default: return 'jpg';
    }
  };

  const convertImage = async () => {
    if (!originalFile) return;

    setIsProcessing(true);
    setError('');

    try {
      let fileToProcess = originalFile;

      // Handle HEIC files explicitly
      if (originalFile.name.toLowerCase().endsWith('.heic') || originalFile.type === 'image/heic') {
        const convertedBlob = await heic2any({
          blob: originalFile,
          toType: 'image/jpeg',
          quality: 0.8,
        });
        
        const blobArray = Array.isArray(convertedBlob) ? convertedBlob : [convertedBlob];
        fileToProcess = new File([blobArray[0]], originalFile.name.replace(/\.heic$/i, '.jpg'), {
          type: 'image/jpeg'
        });
      }

      // Read file into an Image object
      const url = URL.createObjectURL(fileToProcess);
      const img = new Image();
      
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Set canvas dimensions to match image
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw image onto canvas
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        // Fill white background (useful if converting transparent PNG to JPG)
        if (targetFormat === 'image/jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        ctx.drawImage(img, 0, 0);

        // Convert canvas to requested format
        const finalUrl = canvas.toDataURL(targetFormat, 0.9);
        setConvertedUrl(finalUrl);
        URL.revokeObjectURL(url);
        setIsProcessing(false);
      };

      img.onerror = () => {
        setError('Failed to load the image. The format might be unsupported.');
        setIsProcessing(false);
        URL.revokeObjectURL(url);
      };

      img.src = url;

    } catch (err) {
      console.error(err);
      setError('An error occurred during conversion. Please try another file.');
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!convertedUrl || !originalFile) return;
    
    const link = document.createElement('a');
    link.href = convertedUrl;
    
    // Create new filename
    const baseName = originalFile.name.substring(0, originalFile.name.lastIndexOf('.')) || originalFile.name;
    link.download = `${baseName}_converted.${getExtension(targetFormat)}`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          <div className="tool-icon-wrapper" style={{ margin: '0 auto 1.5rem auto' }}>🔄</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Image Format Converter</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Instantly convert photos to JPG, PNG, or WEBP right in your browser. 
            Perfect for converting iPhone HEIC photos for government forms.
          </p>
        </div>

        <div className="tool-card" style={{ maxWidth: '600px', margin: '0 auto', cursor: 'default' }}>
          
          {/* Upload Area */}
          <div style={{ 
            border: '2px dashed var(--border-color)', 
            borderRadius: '16px', 
            padding: '3rem 2rem',
            textAlign: 'center',
            marginBottom: '2rem',
            background: 'rgba(0,0,0,0.2)'
          }}>
            <input 
              type="file" 
              accept="image/*,.heic" 
              id="file-upload" 
              style={{ display: 'none' }}
              onChange={handleFileUpload}
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
              {originalFile ? 'Select Different Image' : '+ Upload Image (HEIC, PNG, WEBP)'}
            </label>
            {originalFile && (
              <p style={{ color: 'var(--primary-accent)', fontWeight: 'bold', marginTop: '1rem' }}>
                Selected: {originalFile.name}
              </p>
            )}
            {error && <p style={{ color: '#ff4444', marginTop: '1rem' }}>{error}</p>}
          </div>

          {/* Controls Area */}
          {originalFile && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Convert To:</label>
                <select 
                  value={targetFormat}
                  onChange={(e) => setTargetFormat(e.target.value as ImageFormat)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-dark)',
                    color: 'white',
                    border: '1px solid var(--border-color)',
                    padding: '12px',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                >
                  <option value="image/jpeg">JPG / JPEG (Best for photos & forms)</option>
                  <option value="image/png">PNG (Best for graphics & transparency)</option>
                  <option value="image/webp">WEBP (Best for web & small size)</option>
                </select>
              </div>

              {!convertedUrl ? (
                <button 
                  onClick={convertImage}
                  disabled={isProcessing}
                  style={{
                    background: 'var(--secondary-accent)',
                    color: 'white',
                    border: 'none',
                    padding: '16px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    cursor: isProcessing ? 'wait' : 'pointer',
                    opacity: isProcessing ? 0.7 : 1
                  }}
                >
                  {isProcessing ? 'Converting...' : 'Convert Image Now'}
                </button>
              ) : (
                <div style={{ 
                  background: 'rgba(0, 240, 255, 0.05)',
                  border: '1px solid rgba(0, 240, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'center'
                }}>
                  <h3 style={{ color: 'var(--primary-accent)', marginBottom: '1rem' }}>Success!</h3>
                  <button 
                    onClick={handleDownload}
                    style={{
                      background: 'var(--primary-accent)',
                      color: 'var(--bg-dark)',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      cursor: 'pointer',
                      width: '100%'
                    }}
                  >
                    Download .{getExtension(targetFormat).toUpperCase()} File
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Hidden Canvas for processing */}
          <canvas ref={canvasRef} style={{ display: 'none' }} />

        </div>
      </main>
    </div>
  );
}
