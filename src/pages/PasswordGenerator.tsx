import { useSEO } from '../hooks/useSEO';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FAQ from '../components/FAQ';
export default function PasswordGenerator() {
  useSEO({
    title: 'Password Generator | Free Online Tool | Sivraj',
    description: 'Free online Password Generator tool running entirely in your browser. Fast, secure, and 100% private.'
  });

  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (charset === '') {
      setPassword('Please select at least one option');
      return;
    }

    let newPassword = '';
    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);

    for (let i = 0; i < length; i++) {
      newPassword += charset[randomValues[i] % charset.length];
    }
    setPassword(newPassword);
    setCopied(false);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const copyToClipboard = () => {
    if (!password || password.includes('Please')) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadPassword = () => {
    if (!password || password.includes('Please')) return;
    const blob = new Blob([password], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'secure_password.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const calculateStrength = () => {
    let score = 0;
    if (length > 8) score += 1;
    if (length >= 14) score += 1;
    if (includeUppercase && includeLowercase) score += 1;
    if (includeNumbers) score += 1;
    if (includeSymbols) score += 1;
    return score; // 0 to 5
  };

  const strength = calculateStrength();
  const strengthColor = 
    strength <= 2 ? '#ff4444' : 
    strength === 3 ? '#ffeb3b' : 
    '#00e676';

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
          <div className="tool-icon-wrapper" style={{ margin: '0 auto 1.5rem auto' }}>🔐</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Secure Password Generator</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Generate uncrackable passwords instantly. Your password is mathematically generated in your browser and is never sent over the internet.
          </p>
        </div>

        <div className="tool-card" style={{ maxWidth: '600px', margin: '0 auto', cursor: 'default' }}>
          
          {/* Password Display */}
          <div style={{ position: 'relative', marginBottom: '2rem' }}>
            <div 
              style={{
                background: 'var(--bg-dark)',
                border: `2px solid ${strengthColor}`,
                padding: '1.5rem',
                borderRadius: '12px',
                fontSize: '1.5rem',
                fontFamily: 'monospace',
                wordBreak: 'break-all',
                textAlign: 'center',
                letterSpacing: '2px',
                minHeight: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {password}
            </div>
            
            <button 
              onClick={copyToClipboard}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'var(--primary-accent)',
                color: 'var(--bg-dark)',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ color: 'var(--text-muted)' }}>Password Length</label>
                <span style={{ color: 'var(--primary-accent)', fontWeight: 'bold' }}>{length}</span>
              </div>
              <input 
                type="range" 
                min="6" 
                max="64" 
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input type="checkbox" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} style={{ width: '20px', height: '20px' }} />
                Uppercase (A-Z)
              </label>
              
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input type="checkbox" checked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)} style={{ width: '20px', height: '20px' }} />
                Lowercase (a-z)
              </label>
              
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} style={{ width: '20px', height: '20px' }} />
                Numbers (0-9)
              </label>
              
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} style={{ width: '20px', height: '20px' }} />
                Symbols (!@#$)
              </label>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <button 
                onClick={generatePassword}
                style={{
                  background: 'transparent',
                  color: 'white',
                  border: '1px solid var(--border-color)',
                  padding: '16px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                }}
              >
                🔄 Generate New
              </button>

              <button 
                onClick={downloadPassword}
                style={{
                  background: 'var(--primary-accent)',
                  color: 'var(--bg-dark)',
                  border: 'none',
                  padding: '16px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                }}
              >
                💾 Download .txt
              </button>
            </div>
            
          </div>
        </div>

        {/* SEO & FAQ Section */}
        <div style={{ maxWidth: '800px', margin: '4rem auto 0 auto', lineHeight: '1.6', color: 'var(--text-color)' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'white' }}>Why You Need a Strong Password Generator</h2>
          <p style={{ marginBottom: '1rem' }}>
            In 2026, cyber threats are more advanced than ever. Hardware has gotten so fast that hackers can crack 8-character passwords in a matter of seconds using automated brute-force attacks. The old advice of using "at least 8 characters with a symbol" is dangerously outdated.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            Security experts now agree that <strong>length</strong> is the most critical factor in password security. A 16-character password is exponentially harder to crack than an 8-character one. By using our Free Secure Password Generator, you create a cryptographically strong, mathematically random string that is practically impossible for any supercomputer to guess.
          </p>
          <h3 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: 'white' }}>How does a random password generator work?</h3>
          <p style={{ marginBottom: '1.5rem' }}>
            Our tool uses your browser's built-in <code>crypto.getRandomValues()</code> API. This means the randomness is generated locally on your machine, not on a server. It ensures that the generated password is truly unpredictable and completely private. It never leaves your device.
          </p>

          <FAQ 
            items={[
              {
                question: 'Is it safe to use an online password generator?',
                answer: 'Yes, provided the tool runs entirely in your browser (client-side) like ours does. We never transmit your generated passwords to any server. You can even disconnect from the internet, and this tool will still work.'
              },
              {
                question: 'How long should my password be?',
                answer: 'For most critical accounts (email, banking), you should aim for at least 16 characters. Our tool defaults to 16, which provides an excellent balance of extreme security and usability when used with a password manager.'
              },
              {
                question: 'What makes a password strong?',
                answer: 'A strong password is long, random, and unique. Avoid dictionary words, birthdates, or predictable substitutions (like P@ssw0rd). The best password looks like complete gibberish.'
              },
              {
                question: 'Should I memorize these passwords?',
                answer: 'No. You should use a trusted Password Manager to store these long, secure passwords. You only need to memorize one "Master Password" to unlock the manager.'
              }
            ]} 
          />
        </div>
      </main>
    </div>
  );
}
