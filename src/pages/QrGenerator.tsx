import { useSEO } from '../hooks/useSEO';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';

type QrType = 'url' | 'wifi' | 'email' | 'phone' | 'sms' | 'vcard' | 'whatsapp' | 'location';

export default function QrGenerator() {
  useSEO({
    title: 'Qr Generator | Free Online Tool | Sivraj',
    description: 'Free online Qr Generator tool running entirely in your browser. Fast, secure, and 100% private.'
  });

  const [qrType, setQrType] = useState<QrType>('url');
  
  // States for different types
  const [url, setUrl] = useState('https://sivraj.in');
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPass, setWifiPass] = useState('');
  const [wifiEnc, setWifiEnc] = useState('WPA');
  const [emailTo, setEmailTo] = useState('');
  const [phone, setPhone] = useState('');
  const [smsMsg, setSmsMsg] = useState('');
  
  const [vcName, setVcName] = useState('');
  const [vcPhone, setVcPhone] = useState('');
  const [vcEmail, setVcEmail] = useState('');
  const [vcCompany, setVcCompany] = useState('');
  
  const [waPhone, setWaPhone] = useState('');
  const [waMsg, setWaMsg] = useState('');
  
  const [locLat, setLocLat] = useState('');
  const [locLong, setLocLong] = useState('');

  const [fgColor, setFgColor] = useState('#00f0ff');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [level, setLevel] = useState<'L' | 'M' | 'Q' | 'H'>('H');
  const [logoUrl, setLogoUrl] = useState('');
  const qrRef = useRef<HTMLDivElement>(null);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const tempUrl = URL.createObjectURL(file);
      setLogoUrl(tempUrl);
    }
  };

  const handleDownload = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector('canvas');
    if (!canvas) return;

    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'sivraj_qr_code.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // Compute the final string passed to the QR Code
  let finalQrValue = url || ' ';
  if (qrType === 'wifi') {
    finalQrValue = `WIFI:T:${wifiEnc};S:${wifiSsid};P:${wifiPass};;`;
  } else if (qrType === 'email') {
    finalQrValue = `mailto:${emailTo}`;
  } else if (qrType === 'phone') {
    finalQrValue = `tel:${phone}`;
  } else if (qrType === 'sms') {
    finalQrValue = `smsto:${phone}:${smsMsg}`;
  } else if (qrType === 'whatsapp') {
    finalQrValue = `https://wa.me/${waPhone}?text=${encodeURIComponent(waMsg)}`;
  } else if (qrType === 'location') {
    finalQrValue = `geo:${locLat},${locLong}`;
  } else if (qrType === 'vcard') {
    finalQrValue = `BEGIN:VCARD\nVERSION:3.0\nN:${vcName}\nTEL:${vcPhone}\nEMAIL:${vcEmail}\nORG:${vcCompany}\nEND:VCARD`;
  }

  const inputStyle = {
    width: '100%',
    background: 'rgba(0,0,0,0.2)',
    border: '1px solid var(--border-color)',
    color: 'white',
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '1rem'
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
          <div className="tool-icon-wrapper" style={{ margin: '0 auto 1.5rem auto' }}>📱</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>QR Generator Pro</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Create ultra-fast, high-resolution QR codes for your business, menu, or website. Customize the colors and download instantly.
          </p>
        </div>

        <div className="tool-card" style={{ maxWidth: '800px', margin: '0 auto', cursor: 'default', display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>
          
          {/* Controls Area */}
          <div style={{ flex: '1', minWidth: '300px' }}>
            
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary-accent)' }}>1. Select Content Type</h3>
            
            {/* Type Selector */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {(['url', 'wifi', 'vcard', 'whatsapp', 'email', 'phone', 'sms', 'location'] as QrType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setQrType(type)}
                  style={{
                    background: qrType === type ? 'var(--primary-accent)' : 'transparent',
                    color: qrType === type ? 'var(--bg-dark)' : 'var(--text-muted)',
                    border: `1px solid ${qrType === type ? 'var(--primary-accent)' : 'var(--border-color)'}`,
                    padding: '8px 16px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    fontSize: '0.8rem'
                  }}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Dynamic Inputs */}
            <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              {qrType === 'url' && (
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>URL or Text</label>
                  <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." style={inputStyle} />
                </div>
              )}
              {qrType === 'wifi' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Network Name (SSID)</label>
                    <input type="text" value={wifiSsid} onChange={(e) => setWifiSsid(e.target.value)} placeholder="My Home WiFi" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Password</label>
                    <input type="text" value={wifiPass} onChange={(e) => setWifiPass(e.target.value)} placeholder="password123" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Security Type</label>
                    <select value={wifiEnc} onChange={(e) => setWifiEnc(e.target.value)} style={inputStyle}>
                      <option value="WPA">WPA/WPA2</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">None (Open)</option>
                    </select>
                  </div>
                </div>
              )}
              {qrType === 'email' && (
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Email Address</label>
                  <input type="email" value={emailTo} onChange={(e) => setEmailTo(e.target.value)} placeholder="contact@example.com" style={inputStyle} />
                </div>
              )}
              {qrType === 'phone' && (
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Phone Number</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 234 567 8900" style={inputStyle} />
                </div>
              )}
              {qrType === 'sms' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Phone Number</label>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 234 567 8900" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Message</label>
                    <textarea value={smsMsg} onChange={(e) => setSmsMsg(e.target.value)} placeholder="Hello..." style={{...inputStyle, minHeight: '80px', resize: 'vertical'}} />
                  </div>
                </div>
              )}
              {qrType === 'whatsapp' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>WhatsApp Number (with Country Code)</label>
                    <input type="tel" value={waPhone} onChange={(e) => setWaPhone(e.target.value)} placeholder="12345678900" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Pre-filled Message</label>
                    <textarea value={waMsg} onChange={(e) => setWaMsg(e.target.value)} placeholder="I am interested in..." style={{...inputStyle, minHeight: '80px', resize: 'vertical'}} />
                  </div>
                </div>
              )}
              {qrType === 'vcard' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Full Name</label>
                    <input type="text" value={vcName} onChange={(e) => setVcName(e.target.value)} placeholder="John Doe" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Phone Number</label>
                    <input type="tel" value={vcPhone} onChange={(e) => setVcPhone(e.target.value)} placeholder="+1 234 567 8900" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Email Address</label>
                    <input type="email" value={vcEmail} onChange={(e) => setVcEmail(e.target.value)} placeholder="john@example.com" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Company / Org</label>
                    <input type="text" value={vcCompany} onChange={(e) => setVcCompany(e.target.value)} placeholder="Acme Corp" style={inputStyle} />
                  </div>
                </div>
              )}
              {qrType === 'location' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Latitude</label>
                    <input type="text" value={locLat} onChange={(e) => setLocLat(e.target.value)} placeholder="40.7128" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Longitude</label>
                    <input type="text" value={locLong} onChange={(e) => setLocLong(e.target.value)} placeholder="-74.0060" style={inputStyle} />
                  </div>
                </div>
              )}
            </div>

            <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary-accent)' }}>2. Customize Design</h3>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ flex: '1' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Foreground Color</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input 
                    type="color" 
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      width: '40px',
                      height: '40px',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  />
                  <span style={{ fontFamily: 'monospace' }}>{fgColor}</span>
                </div>
              </div>

              <div style={{ flex: '1' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Background Color</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input 
                    type="color" 
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      width: '40px',
                      height: '40px',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  />
                  <span style={{ fontFamily: 'monospace' }}>{bgColor}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ flex: '1' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Error Correction (Quality)</label>
                <select 
                  value={level} 
                  onChange={(e) => setLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')}
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
                  <option value="L">Low (Best for simple URLs)</option>
                  <option value="M">Medium</option>
                  <option value="Q">Quartile</option>
                  <option value="H">High (Best for Logos)</option>
                </select>
              </div>

              <div style={{ flex: '1' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Center Logo (Optional)</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  id="logo-upload" 
                  style={{ display: 'none' }}
                  onChange={handleLogoUpload}
                />
                <label htmlFor="logo-upload" style={{
                  background: 'transparent',
                  color: 'var(--primary-accent)',
                  border: '1px solid var(--primary-accent)',
                  padding: '11px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'block',
                  textAlign: 'center'
                }}>
                  {logoUrl ? 'Change Logo' : '+ Upload Logo'}
                </label>
                {logoUrl && (
                  <button 
                    onClick={() => setLogoUrl('')}
                    style={{ background: 'transparent', border: 'none', color: '#ff4444', cursor: 'pointer', marginTop: '8px', fontSize: '0.9rem', width: '100%' }}
                  >
                    Remove Logo
                  </button>
                )}
              </div>
            </div>

            <button 
              onClick={handleDownload}
              style={{
                background: 'var(--primary-accent)',
                color: 'var(--bg-dark)',
                border: 'none',
                padding: '16px 24px',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                cursor: 'pointer',
                width: '100%',
                marginTop: '1rem'
              }}
            >
              ⬇ Download High-Res PNG
            </button>
          </div>

          {/* Preview Area */}
          <div style={{ 
            flex: '1', 
            minWidth: '300px',
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-dark)',
            borderRadius: '16px',
            padding: '2rem',
            border: '1px solid var(--border-color)'
          }}>
             <h3 style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Live Preview</h3>
             
             <div ref={qrRef} style={{ background: bgColor, padding: '16px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
               <QRCodeCanvas 
                 value={finalQrValue} 
                 size={220} 
                 fgColor={fgColor} 
                 bgColor={bgColor} 
                 level={level} 
                 includeMargin={false}
                 imageSettings={logoUrl ? { src: logoUrl, excavate: true, height: 50, width: 50 } : undefined}
               />
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}
