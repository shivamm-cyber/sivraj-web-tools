import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div style={{ marginTop: '3rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', textAlign: 'center' }}>Frequently Asked Questions</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px', margin: '0 auto' }}>
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <div 
              key={index} 
              style={{ 
                border: '1px solid var(--border-color)', 
                borderRadius: '8px', 
                overflow: 'hidden',
                background: 'var(--bg-dark)' 
              }}
            >
              <button
                onClick={() => toggleAccordion(index)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                {item.question}
                <span style={{ fontSize: '1.5rem', transition: 'transform 0.3s', transform: isActive ? 'rotate(180deg)' : 'rotate(0)' }}>
                  ⌄
                </span>
              </button>
              {isActive && (
                <div style={{ padding: '0 1rem 1rem 1rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
