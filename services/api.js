
// Environment variables would be better for API keys
const API_KEY = 'db75be3f6da59e6c54d0b9f568d19d16';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

// Helper function to handle API responses with better error handling
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error('API Error:', {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      errorData
    });
    throw new Error(`API error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
};

// Function to get image URL with proper fallback
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='; // Better to use a local fallback image
  return `${IMAGE_BASE_URL}${size}${path}`;
};

// Get genres for mapping
export const getGenres = async () => {
  try {
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

// Get upcoming movies
export const getUpcomingMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    throw error;
  }
};

// Get latest movies (now playing)
export const getLatestMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching now playing movies:', error);
    throw error;
  }
};

// Get top rated movies
export const getTopRatedMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    throw error;
  }
};

// Get popular movies
export const getPopularMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

// Search movies by keyword with proper URL encoding
export const searchMovies = async (query, page = 1) => {
  try {
    const encodedQuery = encodeURIComponent(query);
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodedQuery}&page=${page}&include_adult=false`
    );
    return handleResponse(response);
  } catch (error) {
    console.error(`Error searching movies for "${query}":`, error);
    throw error;
  }
};

// Get movie details with validation
export const getMovieDetails = async (movieId) => {
  try {
    if (!movieId) {
      throw new Error('Movie ID is required');
    }
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos,credits`
    );
    return handleResponse(response);
  } catch (error) {
    console.error(`Error fetching movie details for ID ${movieId}:`, error);
    throw error;
  }
};

// Get movie reviews
export const getMovieReviews = async (movieId) => {
  try {
    if (!movieId) {
      throw new Error('Movie ID is required');
    }
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`
    );
    return handleResponse(response);
  } catch (error) {
    console.error(`Error fetching reviews for movie ID ${movieId}:`, error);
    throw error;
  }
};

// Get similar movies
export const getSimilarMovies = async (movieId) => {
  try {
    if (!movieId) {
      throw new Error('Movie ID is required');
    }
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`
    );
    return handleResponse(response);
  } catch (error) {
    console.error(`Error fetching similar movies for ID ${movieId}:`, error);
    throw error;
  }
};
