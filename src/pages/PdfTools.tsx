import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PDFDocument } from 'pdf-lib';

export default function PdfTools() {
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).filter(file => file.type === 'application/pdf');
      if (newFiles.length !== event.target.files.length) {
        setError('Some files were ignored because they are not PDFs.');
      } else {
        setError('');
      }
      setPdfFiles(prev => [...prev, ...newFiles]);
      setMergedPdfUrl(null);
    }
  };

  const removeFile = (index: number) => {
    setPdfFiles(prev => prev.filter((_, i) => i !== index));
    setMergedPdfUrl(null);
  };

  const mergePdfs = async () => {
    if (pdfFiles.length < 2) {
      setError('Please upload at least 2 PDF files to merge.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of pdfFiles) {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes as unknown as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setMergedPdfUrl(url);
      
    } catch (err) {
      console.error(err);
      setError('An error occurred while merging the PDFs. Some files might be encrypted or corrupted.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadMergedPdf = () => {
    if (!mergedPdfUrl) return;
    const link = document.createElement('a');
    link.href = mergedPdfUrl;
    link.download = `Sivraj_Merged_${new Date().getTime()}.pdf`;
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
          <div className="tool-icon-wrapper" style={{ margin: '0 auto 1.5rem auto' }}>📄</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>PDF Merger</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Combine multiple PDF files into one single document instantly. 
            Files are merged securely in your browser and are never uploaded to any server.
          </p>
        </div>

        <div className="tool-card" style={{ maxWidth: '800px', margin: '0 auto', cursor: 'default' }}>
          
          {error && <p style={{ color: '#ff4444', textAlign: 'center', marginBottom: '1.5rem' }}>{error}</p>}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
            
            {/* Upload Area */}
            <div>
              <div style={{ 
                border: '2px dashed var(--border-color)', 
                borderRadius: '16px', 
                padding: '2rem',
                textAlign: 'center',
                background: 'rgba(0,0,0,0.2)'
              }}>
                <input 
                  type="file" 
                  accept=".pdf,application/pdf" 
                  id="pdf-upload" 
                  multiple
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
                />
                <label htmlFor="pdf-upload" style={{
                  background: 'var(--primary-accent)',
                  color: 'var(--bg-dark)',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'inline-block',
                }}>
                  + Add PDF Files
                </label>
                <p style={{ color: 'var(--text-muted)', marginTop: '1rem', fontSize: '0.9rem' }}>
                  Select multiple files at once, or add them one by one.
                </p>
              </div>

              {/* File List */}
              {pdfFiles.length > 0 && (
                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <h3 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Files to Merge (In Order):</h3>
                  {pdfFiles.map((file, idx) => (
                    <div key={idx} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      background: 'var(--bg-dark)',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ color: 'var(--primary-accent)', fontWeight: 'bold' }}>{idx + 1}.</span>
                        <span style={{ color: 'white' }}>{file.name}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                      </div>
                      <button 
                        onClick={() => removeFile(idx)}
                        style={{ background: 'transparent', color: '#ff4444', border: 'none', cursor: 'pointer', fontSize: '1.2rem', padding: '0 8px' }}
                        title="Remove file"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Area */}
            {pdfFiles.length >= 2 && (
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
                {!mergedPdfUrl ? (
                  <button 
                    onClick={mergePdfs}
                    disabled={isProcessing}
                    style={{
                      background: 'var(--secondary-accent)',
                      color: 'white',
                      border: 'none',
                      padding: '16px',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                      cursor: isProcessing ? 'wait' : 'pointer',
                      opacity: isProcessing ? 0.7 : 1,
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    {isProcessing ? 'Merging PDFs...' : '🔄 Merge PDFs Now'}
                  </button>
                ) : (
                  <div style={{ 
                    background: 'rgba(0, 240, 255, 0.05)',
                    border: '1px solid rgba(0, 240, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '2rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                    <h2 style={{ color: 'var(--primary-accent)', marginBottom: '1rem' }}>PDFs Merged Successfully!</h2>
                    <button 
                      onClick={downloadMergedPdf}
                      style={{
                        background: 'var(--primary-accent)',
                        color: 'var(--bg-dark)',
                        border: 'none',
                        padding: '16px 32px',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        width: '100%'
                      }}
                    >
                      ⬇ Download Merged PDF
                    </button>
                  </div>
                )}
              </div>
            )}
            
          </div>
        </div>
      </main>
    </div>
  );
}
