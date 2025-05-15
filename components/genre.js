'use client';
import Link from 'next/link';

const genres = [
  "Action", "Adventure", "Comedy", "Drama",
  "Horror", "Science Fiction", "Romance", "Documentary"
];

export default function Genres() {
  return (
    <section>
      <h2>Genres</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {genres.map((genre) => (
          <Link 
            key={genre} 
            href={`/movies/${encodeURIComponent(genre.toLowerCase())}`}
            className="genre-item"
          >
            {genre}
          </Link>
        ))}
      </div>
    </section>
  );
}
