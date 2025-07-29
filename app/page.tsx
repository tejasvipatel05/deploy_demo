'use client';
import { useEffect, useState } from 'react';

type Book = {
  _id: string;
  title: string;
  author: string;
};

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch('/api/books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error('Failed to load books:', err));
  }, []);

  return (
    <main
      style={{
        minHeight: '100vh',
        margin: 0,
        padding: '2rem',
        background: 'linear-gradient(135deg, #ede7f6, #f3e5f5)',
        fontFamily: 'Segoe UI, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#4A148C' }}>
        📚 My Book Library
      </h1>
      <p style={{ fontSize: '1.1rem', color: '#5e4a6c', marginBottom: '2rem' }}>
        A list fetched live from MongoDB Atlas
      </p>

      {books.length === 0 ? (
        <p style={{ color: '#777' }}>Loading books or no books found...</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            width: '100%',
            maxWidth: '900px'
          }}
        >
          {books.map(book => (
            <div
              key={book._id}
              style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '1.2rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease',
                textAlign: 'center',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <h3 style={{ margin: '0 0 0.5rem', color: '#6A1B9A' }}>{book.title}</h3>
              <p style={{ margin: 0, color: '#555' }}>by {book.author}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
