import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

export default function GstCalculator() {
  useSEO({
    title: 'GST Calculator | India | Free Online Tax Tool | Sivraj',
    description: 'Instantly calculate Indian GST (5%, 12%, 18%, 28%). Add or remove GST from any amount with complete CGST & SGST breakdown.'
  });

  const [amount, setAmount] = useState<number | ''>('');
  const [gstRate, setGstRate] = useState<number>(18);
  const [mode, setMode] = useState<'add' | 'remove'>('add');

  const calculate = () => {
    if (amount === '' || amount <= 0) return null;
    
    let netAmount = 0;
    let gstAmount = 0;
    let grossAmount = 0;

    if (mode === 'add') {
      netAmount = Number(amount);
      gstAmount = (netAmount * gstRate) / 100;
      grossAmount = netAmount + gstAmount;
    } else {
      grossAmount = Number(amount);
      netAmount = grossAmount - (grossAmount * (gstRate / (100 + gstRate)));
      gstAmount = grossAmount - netAmount;
    }

    return {
      netAmount: netAmount.toFixed(2),
      gstAmount: gstAmount.toFixed(2),
      grossAmount: grossAmount.toFixed(2),
      cgst: (gstAmount / 2).toFixed(2),
      sgst: (gstAmount / 2).toFixed(2)
    };
  };

  const results = calculate();

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
          <div className="tool-icon-wrapper" style={{ margin: '0 auto 1.5rem auto' }}>🧮</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>GST Calculator (India)</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Calculate Goods and Services Tax (GST) for India instantly. Add or remove GST with a complete CGST/SGST breakdown.
          </p>
        </div>

        <div className="tool-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <button 
              onClick={() => setMode('add')}
              style={{
                flex: 1,
                background: mode === 'add' ? 'var(--primary-accent)' : 'transparent',
                color: mode === 'add' ? 'var(--bg-dark)' : 'white',
                border: mode === 'add' ? 'none' : '1px solid var(--border-color)',
                padding: '12px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              ➕ Add GST (Exclusive)
            </button>
            <button 
              onClick={() => setMode('remove')}
              style={{
                flex: 1,
                background: mode === 'remove' ? 'var(--primary-accent)' : 'transparent',
                color: mode === 'remove' ? 'var(--bg-dark)' : 'white',
                border: mode === 'remove' ? 'none' : '1px solid var(--border-color)',
                padding: '12px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              ➖ Remove GST (Inclusive)
            </button>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Amount (₹)</label>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')}
              placeholder="e.g. 1000"
              style={{
                width: '100%',
                background: 'var(--bg-dark)',
                border: '1px solid var(--border-color)',
                color: 'white',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '1.2rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>GST Slab</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
              {[3, 5, 12, 18, 28].map(rate => (
                <button
                  key={rate}
                  onClick={() => setGstRate(rate)}
                  style={{
                    background: gstRate === rate ? 'rgba(59, 130, 246, 0.2)' : 'var(--bg-dark)',
                    color: gstRate === rate ? 'var(--primary-accent)' : 'white',
                    border: gstRate === rate ? '1px solid var(--primary-accent)' : '1px solid var(--border-color)',
                    padding: '12px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  {rate}%
                </button>
              ))}
            </div>
          </div>

          {results && (
            <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--primary-accent)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #334155', paddingBottom: '1rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Net Amount (Without GST):</span>
                <span style={{ fontWeight: 'bold' }}>₹{results.netAmount}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Total GST ({gstRate}%):</span>
                <span style={{ color: '#ffeb3b', fontWeight: 'bold' }}>+ ₹{results.gstAmount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', paddingLeft: '1rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>CGST ({gstRate/2}%):</span>
                <span style={{ color: 'var(--text-muted)' }}>₹{results.cgst}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #334155', paddingBottom: '1rem', fontSize: '0.9rem', paddingLeft: '1rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>SGST ({gstRate/2}%):</span>
                <span style={{ color: 'var(--text-muted)' }}>₹{results.sgst}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem' }}>
                <span style={{ color: 'white' }}>Gross Amount (Total):</span>
                <span style={{ color: '#00e676', fontWeight: 'bold' }}>₹{results.grossAmount}</span>
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  );
}
