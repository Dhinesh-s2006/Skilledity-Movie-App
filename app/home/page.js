'use client';
import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import MovieSection from '../../components/MovieSection';
import SearchResults from '../../components/SearchResults';
import Footer from '../../components/Footer';
import Genres from '../../components/genre';
import { 
  getUpcomingMovies, 
  getLatestMovies, 
  getTopRatedMovies, 
  getPopularMovies 
} from '../../services/api';

// Create a client component to use the search params
function HomeContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search');
  const [showingSearchResults, setShowingSearchResults] = useState(false);
  
  useEffect(() => {
    setShowingSearchResults(!!searchQuery);
  }, [searchQuery]);

  return (
    <div className="container">
      {showingSearchResults ? (
        <SearchResults query={searchQuery} />
      ) : (
        <>
          <Genres />
          <MovieSection 
            title="Upcoming Movies" 
            fetchMovies={getUpcomingMovies} 
            type="upcoming" 
            id="upcoming" 
          />
          <MovieSection 
            title="Latest Movies" 
            fetchMovies={getLatestMovies} 
            type="latest" 
            id="latest" 
          />
          <MovieSection 
            title="Top-rated Movies" 
            fetchMovies={getTopRatedMovies} 
            type="topRated" 
            id="topRated" 
          />
          <MovieSection 
            title="Popular Movies" 
            fetchMovies={getPopularMovies} 
            type="popular" 
            id="popular" 
          />
        </>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <div className="logo-container">
        <img src="/skilledity-logo.png" alt="Skilledity Logo" className="logo-image" />
      </div>
      <Navbar />
      <Suspense fallback={<div>Loading search results...</div>}>
        <HomeContent />
      </Suspense>
      <Footer />
    </main>
  );
}
