import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardMedia, Box, Typography, IconButton, Skeleton } from "@mui/material";
import { Info, Film, User, ChevronDown, ChevronUp } from "lucide-react";
import { IMovie } from "../state/types";

const MovieCard: React.FC<{
  movie: IMovie;
  expanded: boolean;
  toggleExpand: () => void;
  fetchMovieDetails: (id: string) => void;
  isMovieDetailsLoading: boolean;
}> = ({ movie, expanded, toggleExpand, fetchMovieDetails, isMovieDetailsLoading }) => {
  useEffect(() => {
    if (expanded && !movie.Plot) {
      fetchMovieDetails(movie.imdbID);
    }
  }, [expanded, movie.Plot, movie.imdbID, fetchMovieDetails]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <Card>
        <CardContent onClick={toggleExpand} sx={{ cursor: "pointer" }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" gutterBottom>
              {movie.Title}
            </Typography>
            <IconButton>
              {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </IconButton>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Film size={16} />
            <Typography color="text.secondary">{movie.Year}</Typography>
          </Box>
        </CardContent>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <CardMedia
                component="img"
                image={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450"
                }
                alt={movie.Title}
                sx={{
                  mt: 1,
                  width: "150px", // Adjust width
                  height: "225px", // Adjust height
                  objectFit: "cover", // Ensure the image scales properly
                  margin: "0 auto", // Center the image horizontally
                }}
              />
              <CardContent>
                {isMovieDetailsLoading ? (
                  <Box>
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="rectangular" height={118} />
                  </Box>
                ) : (
                  <>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Info size={16} />
                      <Typography variant="body2" gutterBottom>
                        Genre: {movie.Genre || "Unknown"}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <User size={16} />
                      <Typography variant="body2" gutterBottom>
                        Director: {movie.Director || "Unknown"}
                      </Typography>
                    </Box>
                    <Typography variant="body2">{movie.Plot || "No plot available."}</Typography>
                  </>
                )}
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export default MovieCard;
