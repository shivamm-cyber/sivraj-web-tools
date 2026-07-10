
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { blogPosts } from '../data/blogPosts';

export default function Blog() {
  useSEO({
    title: 'Blog & Guides | Sivraj Web Tools',
    description: 'Read the latest guides on web tools, security, image optimization, and more.'
  });

  return (
    <div className="page-container" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', marginTop: '60px' }}>
      <Link to="/" style={{ color: 'var(--primary-accent)', textDecoration: 'none', marginBottom: '2rem', display: 'inline-block' }}>
        &larr; Back to Tools
      </Link>
      
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Blog & Guides</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.2rem' }}>
        Helpful guides, tutorials, and tech insights.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {blogPosts.map((post) => (
          <Link key={post.slug} to={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ 
              padding: '2rem', 
              borderRadius: '12px', 
              background: 'var(--bg-dark)', 
              border: '1px solid var(--border-color)',
              transition: 'transform 0.2s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                {post.tags?.map(tag => (
                  <span key={tag} style={{ 
                    background: 'var(--primary-accent)', 
                    color: 'white', 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>{tag}</span>
                ))}
              </div>
              <h2 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>{post.title}</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{post.description}</p>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
