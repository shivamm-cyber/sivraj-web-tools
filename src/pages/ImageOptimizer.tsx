import { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { Link } from 'react-router-dom';

export default function ImageOptimizer() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [targetSizeKB, setTargetSizeKB] = useState(50);
  const [error, setError] = useState('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file.');
        return;
      }
      setOriginalFile(file);
      setCompressedFile(null);
      setError('');
    }
  };

  const handleCompress = async () => {
    if (!originalFile) return;

    setIsCompressing(true);
    setError('');

    const options = {
      maxSizeMB: targetSizeKB / 1024,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressed = await imageCompression(originalFile, options);
      setCompressedFile(compressed);
    } catch (err) {
      setError('Compression failed. Please try a different image.');
      console.error(err);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDownload = () => {
    if (!compressedFile) return;
    const url = URL.createObjectURL(compressedFile);
    const link = document.createElement('a');
    link.href = url;
    // Add _compressed to the original filename
    const newName = originalFile?.name.replace(/(\.[\w\d_-]+)$/i, '_compressed$1');
    link.download = newName || 'compressed_image.jpg';
    link.click();
    URL.revokeObjectURL(url);
  };

  const formatSize = (bytes: number) => {
    return (bytes / 1024).toFixed(2) + ' KB';
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
          <div className="tool-icon-wrapper" style={{ margin: '0 auto 1.5rem auto' }}>📸</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Image Optimizer</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Compress heavy images down to strict file sizes (like 50KB or 100KB) for government forms and applications. Everything happens securely in your browser.
          </p>
        </div>

        <div className="tool-card" style={{ maxWidth: '700px', margin: '0 auto', cursor: 'default' }}>
          
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
              {originalFile ? 'Change Image' : 'Select an Image'}
            </label>
            {originalFile && (
              <p style={{ color: 'var(--primary-accent)', fontWeight: 'bold' }}>
                Selected: {originalFile.name} ({formatSize(originalFile.size)})
              </p>
            )}
            {error && <p style={{ color: '#ff4444', marginTop: '1rem' }}>{error}</p>}
          </div>

          {/* Controls */}
          {originalFile && (
            <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Target Size (KB)</label>
                <select 
                  value={targetSizeKB} 
                  onChange={(e) => setTargetSizeKB(Number(e.target.value))}
                  style={{
                    background: 'var(--bg-dark)',
                    color: 'white',
                    border: '1px solid var(--border-color)',
                    padding: '12px',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    minWidth: '150px'
                  }}
                >
                  <option value={20}>20 KB (Strict)</option>
                  <option value={50}>50 KB (Standard Form)</option>
                  <option value={100}>100 KB</option>
                  <option value={200}>200 KB</option>
                  <option value={500}>500 KB</option>
                </select>
              </div>
              <button 
                onClick={handleCompress}
                disabled={isCompressing}
                style={{
                  background: 'transparent',
                  color: 'white',
                  border: '1px solid var(--primary-accent)',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: isCompressing ? 'wait' : 'pointer',
                  marginTop: '1.5rem',
                  opacity: isCompressing ? 0.7 : 1
                }}
              >
                {isCompressing ? 'Compressing...' : 'Compress Image'}
              </button>
            </div>
          )}

          {/* Results */}
          {compressedFile && (
            <div style={{ 
              background: 'rgba(0, 240, 255, 0.05)',
              border: '1px solid rgba(0, 240, 255, 0.2)',
              borderRadius: '12px',
              padding: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <h3 style={{ color: 'var(--primary-accent)', marginBottom: '0.5rem' }}>Success!</h3>
                <p>Original: <del style={{color: 'var(--text-muted)'}}>{formatSize(originalFile!.size)}</del></p>
                <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>New Size: {formatSize(compressedFile.size)}</p>
                <p style={{ color: '#4ade80', fontSize: '0.9rem', marginTop: '4px' }}>
                  Saved {((originalFile!.size - compressedFile.size) / originalFile!.size * 100).toFixed(1)}%
                </p>
              </div>
              <button 
                onClick={handleDownload}
                style={{
                  background: 'var(--primary-accent)',
                  color: 'var(--bg-dark)',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Download Image
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
