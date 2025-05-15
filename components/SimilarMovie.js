import MovieCard from './MovieCard';
import styles from '../styles/MovieDetails.module.css';

const SimilarMovies = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return <p>No similar movies found.</p>;
  }

  // Prepare movie data with genres
  const moviesWithGenres = movies.map(movie => {
    return {
      ...movie,
      genres: movie.genre_ids?.map(id => ({
        id,
        name: getGenreName(id)
      })) || []
    };
  });

  // Simple genre mapping function
  function getGenreName(id) {
    const genres = {
      28: 'Action',
      12: 'Adventure',
      16: 'Animation',
      35: 'Comedy',
      80: 'Crime',
      99: 'Documentary',
      18: 'Drama',
      10751: 'Family',
      14: 'Fantasy',
      36: 'History',
      27: 'Horror',
      10402: 'Music',
      9648: 'Mystery',
      10749: 'Romance',
      878: 'Science Fiction',
      10770: 'TV Movie',
      53: 'Thriller',
      10752: 'War',
      37: 'Western'
    };
    return genres[id] || 'Unknown';
  }

  return (
    <div className={styles.similarMovies}>
      {moviesWithGenres.slice(0, 6).map(movie => (
        <MovieCard key={movie.id} movie={movie} type="similar" />
      ))}
    </div>
  );
};

export default SimilarMovies;