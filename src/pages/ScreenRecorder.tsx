import { useSEO } from '../hooks/useSEO';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function ScreenRecorder() {
  useSEO({
    title: 'Screen Recorder | Free Online Tool | Sivraj',
    description: 'Free online Screen Recorder tool running entirely in your browser. Fast, secure, and 100% private.'
  });

  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [error, setError] = useState('');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const startRecording = async () => {
    try {
      setError('');
      setHasRecorded(false);
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
        setVideoUrl(null);
      }
      chunksRef.current = [];

      // Request screen capture
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: 'monitor' },
        audio: true // Captures system audio if user allows
      });

      // Try to get microphone audio too
      let micStream: MediaStream | null = null;
      try {
        micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      } catch (err) {
        console.log('Microphone access denied or not available, proceeding without mic', err);
      }

      // Combine streams
      const tracks = [...screenStream.getTracks()];
      if (micStream) {
        tracks.push(...micStream.getAudioTracks());
      }
      
      const combinedStream = new MediaStream(tracks);
      streamRef.current = combinedStream;

      // Show live preview
      if (videoRef.current) {
        videoRef.current.srcObject = combinedStream;
        videoRef.current.muted = true; // Mute preview to avoid feedback loop
      }

      const mediaRecorder = new MediaRecorder(combinedStream, { mimeType: 'video/webm' });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        
        if (videoRef.current) {
          videoRef.current.srcObject = null;
          videoRef.current.src = url;
          videoRef.current.muted = false; // Unmute for playback
        }
        
        // Stop all tracks
        combinedStream.getTracks().forEach(track => track.stop());
        setHasRecorded(true);
        setIsRecording(false);
      };

      // Handle user clicking "Stop sharing" on the browser's native UI bar
      screenStream.getVideoTracks()[0].onended = () => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
        }
      };

      mediaRecorder.start(1000); // collect chunks every second
      setIsRecording(true);

    } catch (err) {
      console.error(err);
      setError('Failed to start recording. Please ensure you granted screen sharing permissions.');
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  const downloadVideo = () => {
    if (!videoUrl) return;
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = `Sivraj_ScreenRecord_${new Date().getTime()}.webm`;
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
          <div className="tool-icon-wrapper" style={{ margin: '0 auto 1.5rem auto' }}>⏺️</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>In-Browser Screen Recorder</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Record your screen and microphone directly from your browser. No software installation required. 
            Your video never leaves your computer.
          </p>
        </div>

        <div className="tool-card" style={{ maxWidth: '900px', margin: '0 auto', cursor: 'default' }}>
          
          {error && <p style={{ color: '#ff4444', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}

          <div style={{ 
            background: 'var(--bg-dark)', 
            borderRadius: '12px', 
            overflow: 'hidden',
            border: `2px solid ${isRecording ? '#ff4444' : 'var(--border-color)'}`,
            aspectRatio: '16/9',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              controls={hasRecorded}
              style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000' }}
            />

            {!isRecording && !hasRecorded && (
              <div style={{ position: 'absolute', color: 'var(--text-muted)' }}>
                Click Start Recording to select a screen
              </div>
            )}
            
            {isRecording && (
              <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.7)', padding: '6px 12px', borderRadius: '20px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff4444', animation: 'pulse 1.5s infinite' }}></div>
                <span style={{ color: 'white', fontWeight: 'bold' }}>REC</span>
              </div>
            )}
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            @keyframes pulse {
              0% { opacity: 1; }
              50% { opacity: 0.3; }
              100% { opacity: 1; }
            }
          `}} />

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {!isRecording ? (
              <button 
                onClick={startRecording}
                style={{
                  background: '#ff4444',
                  color: 'white',
                  border: 'none',
                  padding: '16px 32px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                ⏺️ Start Recording
              </button>
            ) : (
              <button 
                onClick={stopRecording}
                style={{
                  background: 'white',
                  color: 'black',
                  border: 'none',
                  padding: '16px 32px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                ⏹️ Stop Recording
              </button>
            )}

            {hasRecorded && videoUrl && (
              <button 
                onClick={downloadVideo}
                style={{
                  background: 'var(--primary-accent)',
                  color: 'var(--bg-dark)',
                  border: 'none',
                  padding: '16px 32px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                ⬇ Download Video (.webm)
              </button>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
