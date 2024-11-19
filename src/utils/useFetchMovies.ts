import axios from "axios";
import { useCallback, useState } from "react";
import { IMovie } from "../state/types";

// Environment Variables
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Hook: Fetch movies data
export const useFetchMovies = (
  search: string,
  year: string,
  type: string,
  page: number
) => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          s: search || "Marvel", // Default search term
          y: year || undefined,
          type: type || undefined,
          page,
          apikey: API_KEY,
        },
      });

      if (response.data.Response === "True") {
        setMovies((prev) => [...prev, ...response.data.Search]);
      } else {
        setError(response.data.Error || "No more results.");
      }
    } catch {
      setError("Failed to fetch data. Please try again.");
    }

    setLoading(false);
  }, [search, year, type, page]);

  return { movies, loading, error, fetchMovies, setMovies };
};
