import { useSEO } from '../hooks/useSEO';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import FAQ from '../components/FAQ';

export default function EmiCalculator() {
  useSEO({
    title: 'EMI Calculator | Free Online Loan Calculator | Sivraj',
    description: 'Calculate your Home Loan, Car Loan, or Personal Loan EMI instantly. View total interest payable and total payment schedule.'
  });

  const [principal, setPrincipal] = useState<number>(1000000);
  const [rate, setRate] = useState<number>(8.5);
  const [years, setYears] = useState<number>(10);

  const calculateEMI = () => {
    if (principal <= 0 || rate <= 0 || years <= 0) return { emi: 0, totalInterest: 0, totalPayment: 0 };
    
    const p = principal;
    const r = rate / 12 / 100;
    const n = years * 12;
    
    const emi = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;
    
    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment)
    };
  };

  const { emi, totalInterest, totalPayment } = calculateEMI();

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);
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
          <div className="tool-icon-wrapper" style={{ margin: '0 auto 1.5rem auto' }}>🏦</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>EMI Calculator</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Plan your finances instantly. Calculate your exact monthly Equated Monthly Installment (EMI) for home, car, or personal loans.
          </p>
        </div>

        <div className="tool-card" style={{ maxWidth: '800px', margin: '0 auto', cursor: 'default', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          
          {/* Inputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                <span>Loan Amount (₹)</span>
                <span style={{ color: 'var(--primary-accent)', fontWeight: 'bold' }}>{formatCurrency(principal)}</span>
              </label>
              <input 
                type="range" 
                min="10000" 
                max="10000000"
                step="10000"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>

            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                <span>Interest Rate (% P.A.)</span>
                <span style={{ color: 'var(--primary-accent)', fontWeight: 'bold' }}>{rate}%</span>
              </label>
              <input 
                type="range" 
                min="1" 
                max="30"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>

            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                <span>Loan Tenure (Years)</span>
                <span style={{ color: 'var(--primary-accent)', fontWeight: 'bold' }}>{years} Yr</span>
              </label>
              <input 
                type="range" 
                min="1" 
                max="30"
                step="1"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>
          </div>

          {/* Results */}
          <div style={{ background: 'var(--bg-dark)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Monthly EMI</p>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-accent)' }}>{formatCurrency(emi)}</h2>
            </div>
            
            <hr style={{ borderColor: 'var(--border-color)', opacity: 0.5 }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Principal Amount</span>
              <span style={{ fontWeight: 'bold' }}>{formatCurrency(principal)}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Total Interest</span>
              <span style={{ fontWeight: 'bold' }}>{formatCurrency(totalInterest)}</span>
            </div>
            
            <hr style={{ borderColor: 'var(--border-color)', opacity: 0.5 }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Total Payment</span>
              <span style={{ fontWeight: 'bold', color: 'white' }}>{formatCurrency(totalPayment)}</span>
            </div>
          </div>
        </div>

        {/* SEO & FAQ Section */}
        <div style={{ maxWidth: '800px', margin: '4rem auto 0 auto', lineHeight: '1.6', color: 'var(--text-color)' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'white' }}>How to Use This EMI Calculator</h2>
          <p style={{ marginBottom: '1rem' }}>
            Calculating your Equated Monthly Installment (EMI) manually using complex mathematical formulas can be tedious and prone to errors. Our free online EMI Calculator simplifies this process, allowing you to plan your finances for a home loan, personal loan, or car loan instantly.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            Simply adjust the sliders for the Loan Amount, Interest Rate, and Loan Tenure. The calculator will instantly break down your monthly payments, showing you exactly how much of your money is going towards the principal versus the total interest charged by the bank.
          </p>

          <FAQ 
            items={[
              {
                question: 'What is the formula used to calculate EMI?',
                answer: 'The standard mathematical formula used by banks to calculate EMI is: E = P x r x (1+r)^n / ((1+r)^n - 1). Where "E" is the EMI, "P" is the Principal Loan Amount, "r" is the monthly interest rate (annual rate divided by 12), and "n" is the loan duration in months.'
              },
              {
                question: 'Is this calculator accurate for Indian banks?',
                answer: 'Yes, this calculator uses the exact same reducing-balance method that all major Indian banks (like SBI, HDFC, ICICI) use to calculate EMIs for home loans, auto loans, and personal loans.'
              },
              {
                question: 'Does this save my financial data?',
                answer: 'Absolutely not. This calculator runs entirely in your web browser using client-side JavaScript. None of the numbers you enter are ever transmitted to our servers or saved anywhere.'
              }
            ]} 
          />
        </div>
      </main>
    </div>
  );
}
