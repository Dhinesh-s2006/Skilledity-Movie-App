// app/movies/[genre]/page.js

import React from 'react';
import styles from './genre.module.css';

const API_KEY = 'db75be3f6da59e6c54d0b9f568d19d16';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

async function getGenreId(genreName) {
  const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  const data = await res.json();
  const genre = data.genres.find(
    (g) => g.name.toLowerCase() === decodeURIComponent(genreName).toLowerCase()
  );
  return genre ? genre.id : null;
}

async function getMoviesByGenre(genreId) {
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
  const data = await res.json();
  return data.results;
}

export default async function GenrePage({ params }) {
  const { genre } = params;
  const genreId = await getGenreId(genre);

  if (!genreId) {
    return <div className={styles.message}>No data found for this genre.</div>;
  }

  const movies = await getMoviesByGenre(genreId);

  if (!movies || movies.length === 0) {
    return <div className={styles.message}>No movies found in this genre.</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{genre.toUpperCase()} Movies</h1>
      <div className={styles.grid}>
        {movies.map((movie) => (
          <div key={movie.id} className={styles.card}>
            <img
              src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : '/no-image.jpg'}
              alt={movie.title}
              className={styles.poster}
            />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
