import { Grid } from "@mui/material";
import { IMovie } from "../state/types";
import MovieCard from "./MovieCard";

// Component: MovieList
const MovieList: React.FC<{
  movies: IMovie[];
  expandedMovie: string | null;
  setExpandedMovie: React.Dispatch<React.SetStateAction<string | null>>;
  fetchMovieDetails: (id: string) => void;
  isMovieDetailsLoading: boolean
}> = ({ movies, expandedMovie, setExpandedMovie, fetchMovieDetails, isMovieDetailsLoading }) => (
  <Grid container spacing={3}>
    {movies.map((movie) => (
      <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
        <MovieCard
          movie={movie}
          expanded={expandedMovie === movie.imdbID}
          toggleExpand={() =>
            setExpandedMovie((prev) =>
              prev === movie.imdbID ? null : movie.imdbID
            )
          }
          fetchMovieDetails={fetchMovieDetails}
          isMovieDetailsLoading={isMovieDetailsLoading}
        />
      </Grid>
    ))}
  </Grid>
);

export default MovieList;
