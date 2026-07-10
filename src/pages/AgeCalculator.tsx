import { useSEO } from '../hooks/useSEO';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import FAQ from '../components/FAQ';

export default function AgeCalculator() {
  useSEO({
    title: 'Age Calculator | Free Online Date Tool | Sivraj',
    description: 'Calculate your exact age in years, months, and days instantly. Calculate age as of a specific date for forms and applications.'
  });

  const todayStr = new Date().toISOString().split('T')[0];
  const [dob, setDob] = useState<string>('2000-01-01');
  const [targetDate, setTargetDate] = useState<string>(todayStr);

  const calculateAge = () => {
    if (!dob || !targetDate) return null;
    
    const d1 = new Date(dob);
    const d2 = new Date(targetDate);
    
    if (d1 > d2) return { error: 'Date of birth cannot be after the target date.' };

    let years = d2.getFullYear() - d1.getFullYear();
    let months = d2.getMonth() - d1.getMonth();
    let days = d2.getDate() - d1.getDate();

    if (days < 0) {
      months -= 1;
      // Get days in the previous month
      const prevMonth = new Date(d2.getFullYear(), d2.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }
    
    // Total days calculation
    const totalDays = Math.floor((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
    const totalMonths = (years * 12) + months;
    const totalWeeks = Math.floor(totalDays / 7);

    return { years, months, days, totalMonths, totalWeeks, totalDays };
  };

  const age = calculateAge();

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
          <div className="tool-icon-wrapper" style={{ margin: '0 auto 1.5rem auto' }}>🎂</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Age Calculator</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Calculate your exact age in years, months, and days. Useful for filling out government forms or checking age eligibility.
          </p>
        </div>

        <div className="tool-card" style={{ maxWidth: '800px', margin: '0 auto', cursor: 'default', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          
          {/* Inputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'var(--bg-dark)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>
                Date of Birth
              </label>
              <input 
                type="date" 
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  borderRadius: '8px', 
                  border: '1px solid var(--border-color)', 
                  background: 'rgba(0,0,0,0.2)',
                  color: 'white',
                  fontSize: '1.1rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>
                Age at the Date of
              </label>
              <input 
                type="date" 
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  borderRadius: '8px', 
                  border: '1px solid var(--border-color)', 
                  background: 'rgba(0,0,0,0.2)',
                  color: 'white',
                  fontSize: '1.1rem'
                }}
              />
            </div>
            
            <div style={{ marginTop: 'auto' }}>
              <button onClick={() => { setDob('2000-01-01'); setTargetDate(todayStr); }} style={{ width: '100%', padding: '12px', background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer' }}>Reset</button>
            </div>
          </div>

          {/* Results */}
          <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {age?.error ? (
              <div style={{ color: '#ff4444', textAlign: 'center', padding: '2rem' }}>{age.error}</div>
            ) : age ? (
              <>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Your Exact Age</p>
                  <h2 style={{ fontSize: '2.2rem', color: 'var(--primary-accent)', lineHeight: '1.2' }}>
                    {age.years} <span style={{fontSize:'1rem', color:'var(--text-muted)'}}>Years</span><br/>
                    {age.months} <span style={{fontSize:'1rem', color:'var(--text-muted)'}}>Months</span><br/>
                    {age.days} <span style={{fontSize:'1rem', color:'var(--text-muted)'}}>Days</span>
                  </h2>
                </div>
                
                <hr style={{ borderColor: 'var(--border-color)', opacity: 0.5, marginBottom: '1.5rem' }} />
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', textAlign: 'center' }}>
                  <div style={{ background: 'var(--bg-dark)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{age.totalMonths}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Total Months</div>
                  </div>
                  <div style={{ background: 'var(--bg-dark)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{age.totalWeeks}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Total Weeks</div>
                  </div>
                  <div style={{ background: 'var(--bg-dark)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', gridColumn: '1 / -1' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{(age.totalDays || 0).toLocaleString()}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Total Days</div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>

        {/* SEO & FAQ Section */}
        <div style={{ maxWidth: '800px', margin: '4rem auto 0 auto', lineHeight: '1.6', color: 'var(--text-color)' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'white' }}>How to Use the Age Calculator</h2>
          <p style={{ marginBottom: '1rem' }}>
            Whether you are filling out a government application form, checking age restrictions, or just curious about exactly how many days old you are, our free Age Calculator provides instant, mathematically accurate results.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            Simply select your Date of Birth. By default, the calculator shows your exact age as of today. If a form asks for your "Age as of January 1st", you can change the target date to automatically calculate your exact years, months, and days for that specific deadline.
          </p>

          <FAQ 
            items={[
              {
                question: 'How is chronological age calculated?',
                answer: 'Age is calculated by subtracting your birth date from the current date (or a specific target date). Because months have different lengths and leap years occur, the math can be tricky to do manually. Our calculator handles leap years and month-length variations perfectly.'
              },
              {
                question: 'Does this save my birth date?',
                answer: 'No. This tool operates entirely on your device using client-side processing. Your birth date is never sent to our servers or stored in any database.'
              },
              {
                question: 'Can I calculate age for a future date?',
                answer: 'Yes! You can change the "Age at the Date of" field to any date in the future. This is extremely useful for calculating how old someone will be for an upcoming event or school enrollment deadline.'
              }
            ]} 
          />
        </div>
      </main>
    </div>
  );
}
