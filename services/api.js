const API_KEY = 'db75be3f6da59e6c54d0b9f568d19d16';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
};

// Function to get image URL
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='; // Fallback for null values
  return `${IMAGE_BASE_URL}${size}${path}`;
};

// Get genres for mapping
export const getGenres = async () => {
  const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  return handleResponse(response);
};

// Get upcoming movies
export const getUpcomingMovies = async (page = 1) => {
  const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}`);
  return handleResponse(response);
};

// Get latest movies (now playing)
export const getLatestMovies = async (page = 1) => {
  const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`);
  return handleResponse(response);
};

// Get top rated movies
export const getTopRatedMovies = async (page = 1) => {
  const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`);
  return handleResponse(response);
};

// Get popular movies
export const getPopularMovies = async (page = 1) => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
  return handleResponse(response);
};

// Search movies by keyword
export const searchMovies = async (query, page = 1) => {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);
  return handleResponse(response);
};

// Get movie details
export const getMovieDetails = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  return handleResponse(response);
};

// Get movie reviews
export const getMovieReviews = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`);
  return handleResponse(response);
};

// Get similar movies
export const getSimilarMovies = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}`);
  return handleResponse(response);
};
