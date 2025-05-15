import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '../services/api';
import styles from '../styles/MovieCard.module.css';

const MovieCard = ({ movie, type }) => {
  // Handle null values
  const {
    id,
    title,
    poster_path,
    genre_ids,
    genres,
    overview,
    release_date,
    vote_average,
    vote_count,
    popularity,
  } = movie;

  // Get genres for display
  const movieGenres = genres || [];
  
  return (
    <Link href={`/movie/${id}`}>
      <div className={styles.movieCard}>
        <div className={styles.posterContainer}>
          <img
            src={getImageUrl(poster_path)}
            alt={title}
            className={styles.poster}
          />
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{title}</h3>
          {movieGenres.length > 0 && (
            <div className={styles.genres}>
              {movieGenres.slice(0, 3).map((genre) => (
                <span key={genre.id} className={styles.genre}>
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          <div className={styles.meta}>
            {type === 'upcoming' && release_date && (
              <div className={styles.releaseDate}>
                Release Date: {new Date(release_date).toLocaleDateString()}
              </div>
            )}
            {type === 'popular' && popularity && (
              <div className={styles.popularity}>
                Popularity: {popularity.toFixed(1)}
              </div>
            )}
            {type === 'topRated' && vote_average && (
              <div className={styles.rating}>
                <span className={styles.star}>★</span>
                <span>{vote_average.toFixed(1)}</span>
                {vote_count && (
                  <span className={styles.votes}>({vote_count} votes)</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;