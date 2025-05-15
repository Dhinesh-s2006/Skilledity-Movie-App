import MovieCard from './MovieCard';
import styles from '../styles/MovieGrid.module.css';

const MovieGrid = ({ movies, type }) => {
  if (!movies || movies.length === 0) {
    return <p>No movies found.</p>;
  }

  return (
    <div className={styles.movieGrid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} type={type} />
      ))}
    </div>
  );
};

export default MovieGrid;