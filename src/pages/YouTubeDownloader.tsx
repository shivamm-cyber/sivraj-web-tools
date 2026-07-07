import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function YouTubeDownloader() {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const extractVideoId = (input: string) => {
    try {
      // Handle youtu.be, youtube.com/watch?v=, youtube.com/shorts/
      const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = input.match(regExp);
      
      if (match && match[2].length === 11) {
        return match[2];
      } else {
        return null;
      }
    } catch {
      return null;
    }
  };

  const handleUrlSubmit = () => {
    setError('');
    if (!url.trim()) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    const id = extractVideoId(url);
    if (id) {
      setVideoId(id);
    } else {
      setVideoId(null);
      setError('Could not find a valid YouTube video in that link. Please check the URL.');
    }
  };

  const handleDownload = async (qualityUrl: string, filename: string) => {
    try {
      // Fetching the image through browser to bypass basic direct-link download issues
      const response = await fetch(qualityUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Download failed, falling back to direct link', err);
      // Fallback: just open in new tab if CORS blocks the fetch
      window.open(qualityUrl, '_blank');
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
          <div className="tool-icon-wrapper" style={{ margin: '0 auto 1.5rem auto' }}>▶️</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>YouTube Thumbnail Downloader</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Instantly grab the high-resolution thumbnail from any YouTube video or YouTube Short.
          </p>
        </div>

        <div className="tool-card" style={{ maxWidth: '800px', margin: '0 auto', cursor: 'default' }}>
          
          {/* Input Area */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <input 
              type="text" 
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError('');
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
              placeholder="Paste YouTube Link here (e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ)"
              style={{
                flex: '1',
                minWidth: '250px',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid var(--border-color)',
                color: 'white',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
            <button 
              onClick={handleUrlSubmit}
              style={{
                background: 'var(--primary-accent)',
                color: 'var(--bg-dark)',
                border: 'none',
                padding: '16px 32px',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                cursor: 'pointer'
              }}
            >
              Get Thumbnails
            </button>
          </div>
          
          {error && <p style={{ color: '#ff4444', marginBottom: '2rem', textAlign: 'center' }}>{error}</p>}

          {/* Results Area */}
          {videoId && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              <div style={{ 
                background: 'rgba(0,0,0,0.2)', 
                border: '1px solid var(--border-color)', 
                borderRadius: '12px', 
                overflow: 'hidden' 
              }}>
                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, color: 'var(--primary-accent)' }}>Max Resolution (1080p)</h3>
                  <button 
                    onClick={() => handleDownload(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`, `youtube_thumb_${videoId}_max.jpg`)}
                    style={{ background: 'transparent', color: 'white', border: '1px solid var(--border-color)', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}
                  >
                    Download
                  </button>
                </div>
                <img 
                  src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
                  alt="Max Res Thumbnail" 
                  style={{ width: '100%', display: 'block' }} 
                  onError={(e) => {
                    // Fallback to hqdefault if maxres doesn't exist
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden' }}>
                  <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0 }}>High Quality (720p)</h4>
                    <button 
                      onClick={() => handleDownload(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`, `youtube_thumb_${videoId}_hq.jpg`)}
                      style={{ background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border-color)', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
                    >
                      Download
                    </button>
                  </div>
                  <img src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} alt="HQ Thumbnail" style={{ width: '100%', display: 'block' }} />
                </div>

                <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden' }}>
                  <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0 }}>Medium Quality (480p)</h4>
                    <button 
                      onClick={() => handleDownload(`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`, `youtube_thumb_${videoId}_mq.jpg`)}
                      style={{ background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border-color)', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
                    >
                      Download
                    </button>
                  </div>
                  <img src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`} alt="MQ Thumbnail" style={{ width: '100%', display: 'block' }} />
                </div>
              </div>

            </div>
          )}
          
        </div>
      </main>
    </div>
  );
}
