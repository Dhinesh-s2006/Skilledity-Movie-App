'use client';

import { useEffect, useState } from 'react';
import { use } from 'react'; // Import use from React
import Image from 'next/image';
import Link from 'next/link';
import { getMovieDetails, getMovieReviews, getSimilarMovies } from '../../../services/api';
import styles from '../../../styles/MovieDetails.module.css';
import ReviewCard from '../../../components/ReviewCard';
import MovieCard from '../../../components/MovieCard';
import Footer from '../../../components/Footer';
import ReviewCarousel from '../../../components/ReviewCarousel';



export default function MovieDetails({ params }) {
  // Unwrap the params Promise using React.use()
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const imageBaseUrl = 'https://image.tmdb.org/t/p/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch movie details
        const movieData = await getMovieDetails(id);
        setMovie(movieData);

        // Fetch reviews
        const reviewsData = await getMovieReviews(id);
        setReviews(reviewsData.results.slice(0, 5)); // Get top 5 reviews

        // Fetch similar movies
        const similarData = await getSimilarMovies(id);
        setSimilarMovies(similarData.results.slice(0, 6)); // Get 6 similar movies
      } catch (err) {
        setError('Failed to fetch movie details. Please try again later.');
        console.error('Error fetching movie details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.error}>{error || 'Failed to load movie details.'}</div>
        <Link href="/" className={styles.backButton}>Back to Home</Link>
      </div>
    );
  }

  // Format movie details
  const formatCurrency = (value) => {
    if (!value || value === 0) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className={styles.container}>
      <div 
        className={styles.backdrop}
        style={{
          backgroundImage: movie.backdrop_path 
            ? `url(${imageBaseUrl}original${movie.backdrop_path})` 
            : 'none'
        }}
      >
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.movieHeader}>
          

          <div className={styles.detailContainer}>
            <h1 className={styles.title}>
              {movie.title} 
              {movie.release_date && (
                <span className={styles.year}>
                  ({new Date(movie.release_date).getFullYear()})
                </span>
              )}
            </h1>

            {movie.overview && (
    <p className={styles.description}>{movie.overview}</p>
  )}

  {/* Buttons container */}
  <div className={styles.buttonsContainer}>
    <button className={styles.playButton}>▶ Play Now</button>
    <button className={styles.addButton}>＋</button>
    <button className={styles.likeButton}>👍</button>
    <button className={styles.soundButton}>🔊</button>
  </div>

{/* Container for Reviews and Right Section */}
<div className={styles.detailsContainer}>
  {/* Left Section - Reviews */}
  <div className={styles.leftSection}>
    <h2 className={styles.sectionTitle}>Reviews</h2>
   <ReviewCarousel reviews={reviews} />

  </div>

  {/* Right Section - Movie Info */}
  <div className={styles.rightSection}>
    <div><strong> 📅 Release Year:</strong> {movie.release_date}</div>
    <div><strong>⭐ Rating:</strong> {movie.vote_average}</div>
    <div><strong>Genres:</strong>{movie.genres?.map(g => g.name).join(', ')}</div>
    <div><strong>Status:</strong> {movie.status}</div>
    <div><strong>Original Language:</strong> {movie.original_language}</div>
    <div><strong>Budget:</strong> ${movie.budget}</div>
    <div><strong>Revenue:</strong> ${movie.revenue}</div>
    <div><strong>Popularity:</strong> {movie.popularity}</div>
    <div><strong>Production Country:</strong> {movie.production_countries?.map(c => c.name).join(', ')}</div>
  </div>
</div>


            {movie.homepage && (
              <a 
                href={movie.homepage} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.homepageLink}
              >
                Visit Official Website
              </a>
            )}
          </div>
        </div>

      

        {/* Similar Movies Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Similar Movies</h2>
          <div className={styles.similarMoviesGrid}>
            {similarMovies.length > 0 ? (
              similarMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))
            ) : (
              <p className={styles.noContent}>No similar movies found.</p>
            )}
          </div>
        </div>

       <Footer />
      </div>
    </div>
  );
}