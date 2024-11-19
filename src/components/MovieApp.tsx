import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { CircularProgress, Typography, Box } from "@mui/material";

import { useFetchMovies } from "../utils/useFetchMovies";
import useInfiniteScroll from "../utils/useInfiniteScroll"; // Import the custom hook
import MovieList from "./MovieList";
import Filters from "./MovieFilters";

// Environment Variables
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Main Component
const MovieApp: React.FC = () => {
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [expandedMovie, setExpandedMovie] = useState<string | null>(null);
  const [isMovieDetailsLoading, setIsMovieDetailsLoading] = useState<boolean>(false)

  const { movies, loading, error, fetchMovies, setMovies } = useFetchMovies(
    search,
    year,
    type,
    page
  );

  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(() => {
    setPage((prev) => prev + 1); // Increment page to fetch more movies
  }, []);

  const handleSearch = () => {
    setMovies([]); // Clear movies for new search
    setPage(1); // Reset page to the first
    fetchMovies(); // Trigger fetch for new search query
  };

  useEffect(() => {
    fetchMovies(); // Fetch movies whenever the page changes
  }, [page]);

  // Use the custom infinite scroll hook
  useInfiniteScroll({
    observerRef,
    loadMore,
    loading,
    error,
  });

  const fetchMovieDetails = async (id: string) => {
    try {
      setIsMovieDetailsLoading(true)
      const response = await axios.get(BASE_URL, {
        params: { i: id, apikey: API_KEY },
      });

      if (response.data.Response === "True") {
        setMovies((prev) =>
          prev.map((movie) =>
            movie.imdbID === id ? { ...movie, ...response.data } : movie
          )
        );
      }
      setIsMovieDetailsLoading(false)
    } catch {
      console.error("Failed to fetch movie details.");
    }
  };

  return (
    <Box p={3}>
      {/* Header */}
      <Typography variant="h4" gutterBottom textAlign="center">
        Movie Explorer
      </Typography>

      {/* Filters Component */}
      <Filters
        search={search}
        year={year}
        type={type}
        setSearch={setSearch}
        setYear={setYear}
        setType={setType}
        onSearch={handleSearch}
        loading={loading}
      />

      {/* Movie List Component */}
      <MovieList
        movies={movies}
        expandedMovie={expandedMovie}
        setExpandedMovie={setExpandedMovie}
        fetchMovieDetails={fetchMovieDetails}
        isMovieDetailsLoading={isMovieDetailsLoading}
      />

      {/* Loading Indicator */}
      {loading && (
        <Box textAlign="center" mt={2}>
          <CircularProgress />
        </Box>
      )}

      {/* Error Message */}
      {error && (
        <Typography color="error" textAlign="center" mt={2}>
          {error}
        </Typography>
      )}

      {/* Observer Trigger for Infinite Scroll */}
      <div ref={observerRef}></div>
    </Box>
  );
};

export default MovieApp;
