export default function Home({ books }) {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>📚 Book List</h1>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <strong>{book.title}</strong> by {book.author}
          </li>
        ))}
      </ul>
    </main>
  );
}

export async function getServerSideProps({ req }) {
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers.host;
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/books`);
  const data = await res.json();

  return {
    props: { books: data },
  };
}
