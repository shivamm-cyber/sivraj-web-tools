import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setAudioURL(null);
      setRecordingTime(0);

      timerRef.current = window.setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      alert('Microphone access denied or not available.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
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
          <div className="tool-icon-wrapper" style={{ margin: '0 auto 1.5rem auto' }}>🎙️</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Secure Voice Recorder</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Record high-quality audio directly from your microphone. Audio is processed locally and never leaves your browser.
          </p>
        </div>

        <div className="tool-card" style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center', padding: '3rem 2rem' }}>
          
          <div style={{ fontSize: '4rem', fontWeight: 'bold', fontFamily: 'monospace', color: isRecording ? '#ff4444' : 'var(--text-light)', marginBottom: '2rem' }}>
            {formatTime(recordingTime)}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
            {!isRecording ? (
              <button 
                onClick={startRecording}
                style={{
                  background: '#ff4444',
                  color: 'white',
                  border: 'none',
                  padding: '16px 32px',
                  borderRadius: '50px',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <div style={{ width: '12px', height: '12px', background: 'white', borderRadius: '50%' }}></div>
                Start Recording
              </button>
            ) : (
              <button 
                onClick={stopRecording}
                style={{
                  background: 'transparent',
                  color: 'white',
                  border: '2px solid #ff4444',
                  padding: '16px 32px',
                  borderRadius: '50px',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <div style={{ width: '12px', height: '12px', background: '#ff4444', borderRadius: '2px' }}></div>
                Stop Recording
              </button>
            )}
          </div>

          {audioURL && (
            <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--bg-dark)', borderRadius: '12px' }}>
              <audio src={audioURL} controls style={{ width: '100%', marginBottom: '1rem' }} />
              <a 
                href={audioURL} 
                download="recording.webm"
                style={{
                  display: 'inline-block',
                  background: 'var(--primary-accent)',
                  color: 'var(--bg-dark)',
                  textDecoration: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              >
                💾 Download Audio
              </a>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
