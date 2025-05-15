'use client';

import { useState, useEffect } from 'react';
import { searchMovies } from '../services/api';
import MovieGrid from './MovieGrid';
import Pagination from './Pagination';
import styles from '../styles/MovieSection.module.css';

const SearchResults = ({ query }) => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;
      
      try {
        setLoading(true);
        setError(null);
        const data = await searchMovies(query, currentPage);
        
        // Add genres to each movie for display
        const moviesWithGenres = data.results.map(movie => {
          return {
            ...movie,
            genres: movie.genre_ids?.map(id => ({ 
              id: id, 
              name: getGenreName(id) 
            })) || []
          };
        });
        
        setMovies(moviesWithGenres);
        setTotalPages(data.total_pages > 100 ? 100 : data.total_pages);
        setLoading(false);
      } catch (err) {
        setError('Failed to load search results. Please try again later.');
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, currentPage]);

  // Reset to page 1 when query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  // Simple genre mapping function
  const getGenreName = (id) => {
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
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!query) return null;

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className="section-title">Search Results for "{query}"</h2>
      </div>
      
      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : movies.length === 0 ? (
        <p>No results found for "{query}". Try a different search term.</p>
      ) : (
        <>
          <MovieGrid movies={movies} type="search" />
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </>
      )}
    </section>
  );
};

export default SearchResults;