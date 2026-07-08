import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import * as pdfjsLib from 'pdfjs-dist';
import JSZip from 'jszip';

// Set worker path to local file (which we'll need to copy or use CDN)
// For simplicity in a Vite React app without complex worker configurations, 
// using the CDN for the worker is often the most reliable method.
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function PdfToImage() {
  useSEO({
    title: 'PDF to Image Converter | Extract JPG from PDF | Sivraj',
    description: 'Convert PDF files to high-quality JPG images instantly. 100% private, files never leave your browser.'
  });

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== 'application/pdf') {
      alert("Please upload a valid PDF file.");
      return;
    }
    setPdfFile(file);
    setImages([]);
    setProgress(0);
  };

  const convertPdfToImages = async () => {
    if (!pdfFile) return;
    setIsProcessing(true);
    setImages([]);
    setProgress(0);

    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;
      const newImages = [];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        
        // Use a scale of 2 for better image quality (like 300dpi)
        const scale = 2;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        if (context) {
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({ canvasContext: context, viewport }).promise;
          
          // Convert to JPEG for better file size
          const imgData = canvas.toDataURL('image/jpeg', 0.9);
          newImages.push(imgData);
        }
        
        setProgress(Math.round((i / numPages) * 100));
      }

      setImages(newImages);
    } catch (err) {
      console.error(err);
      alert("Failed to process the PDF. It might be corrupted or password protected.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadAllAsZip = async () => {
    if (images.length === 0) return;
    
    const zip = new JSZip();
    
    images.forEach((imgData, index) => {
      // Remove data:image/jpeg;base64, from the string
      const base64Data = imgData.split(',')[1];
      zip.file(`page_${index + 1}.jpg`, base64Data, { base64: true });
    });

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${pdfFile?.name.replace('.pdf', '')}_images.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
          <div className="tool-icon-wrapper" style={{ margin: '0 auto 1.5rem auto' }}>📄</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>PDF to JPG Converter</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Convert any PDF document into high-quality JPG images. Every page is extracted locally in your browser for absolute privacy.
          </p>
        </div>

        <div className="tool-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          {!pdfFile && (
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
                accept="application/pdf"
                onChange={handleFileUpload}
                style={{
                  position: 'absolute',
                  top: 0, left: 0, width: '100%', height: '100%',
                  opacity: 0, cursor: 'pointer'
                }}
              />
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>Upload PDF File</h3>
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>Click or drag and drop to start</p>
            </div>
          )}

          {pdfFile && images.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📄 {pdfFile.name}</div>
              
              {!isProcessing ? (
                <button 
                  onClick={convertPdfToImages}
                  style={{
                    background: 'var(--primary-accent)',
                    color: 'var(--bg-dark)',
                    border: 'none',
                    padding: '16px 32px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    cursor: 'pointer'
                  }}
                >
                  Convert to Images
                </button>
              ) : (
                <div>
                  <h3 style={{ color: 'var(--primary-accent)' }}>Processing... {progress}%</h3>
                  <div style={{ width: '100%', background: 'var(--bg-dark)', height: '10px', borderRadius: '5px', marginTop: '1rem' }}>
                    <div style={{ width: `${progress}%`, background: 'var(--primary-accent)', height: '100%', borderRadius: '5px', transition: 'width 0.3s' }}></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {images.length > 0 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ margin: 0 }}>Extracted {images.length} Pages</h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button 
                    onClick={downloadAllAsZip}
                    style={{
                      background: 'var(--primary-accent)',
                      color: 'var(--bg-dark)',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    📦 Download All (ZIP)
                  </button>
                  <button 
                    onClick={() => { setPdfFile(null); setImages([]); }}
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

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
                {images.map((img, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-dark)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                    <img src={img} alt={`Page ${idx + 1}`} style={{ width: '100%', height: 'auto', borderRadius: '4px', marginBottom: '1rem' }} />
                    <a 
                      href={img} 
                      download={`page_${idx + 1}.jpg`}
                      style={{
                        display: 'block',
                        background: 'transparent',
                        color: 'white',
                        border: '1px solid var(--primary-accent)',
                        padding: '8px',
                        borderRadius: '4px',
                        textDecoration: 'none',
                        fontSize: '0.9rem'
                      }}
                    >
                      ⬇️ Download Page {idx + 1}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
