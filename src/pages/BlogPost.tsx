
import { useParams, Navigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useSEO } from '../hooks/useSEO';
import { blogPosts } from '../data/blogPosts';

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  useSEO({
    title: `${post.title} | Sivraj Web Tools`,
    description: post.description
  });

  return (
    <div className="page-container" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', marginTop: '60px' }}>
      <Link to="/blog" style={{ color: 'var(--primary-accent)', textDecoration: 'none', marginBottom: '2rem', display: 'inline-block' }}>
        &larr; Back to Blog
      </Link>
      
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
      
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: '1.2' }}>{post.title}</h1>
      
      <div style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '3rem' }}>
        Published on {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </div>

      <div className="markdown-content" style={{ 
        lineHeight: '1.6', 
        fontSize: '1.1rem',
        color: 'var(--text-color, #e0e0e0)'
      }}>
        <ReactMarkdown
          components={{
            h1: ({node, ...props}) => <h1 style={{marginTop: '2rem', marginBottom: '1rem'}} {...props} />,
            h2: ({node, ...props}) => <h2 style={{marginTop: '2rem', marginBottom: '1rem', color: 'white'}} {...props} />,
            h3: ({node, ...props}) => <h3 style={{marginTop: '1.5rem', marginBottom: '0.5rem', color: 'white'}} {...props} />,
            p: ({node, ...props}) => <p style={{marginBottom: '1rem'}} {...props} />,
            ul: ({node, ...props}) => <ul style={{marginBottom: '1rem', paddingLeft: '2rem'}} {...props} />,
            ol: ({node, ...props}) => <ol style={{marginBottom: '1rem', paddingLeft: '2rem'}} {...props} />,
            li: ({node, ...props}) => <li style={{marginBottom: '0.5rem'}} {...props} />,
            a: ({node, ...props}) => <a style={{color: 'var(--primary-accent)'}} {...props} />,
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
