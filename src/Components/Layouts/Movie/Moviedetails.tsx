import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../../Services/Api.ts";
import alterImage from "../../../assets/FightClub.jpeg";
import {
  Grid,
  Typography,
  Button,
  Chip,
  Box,
  CircularProgress,
  Rating,
  useMediaQuery,
  useTheme,
  Container,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

interface Movie {
  title: string;
  director?: string;
  rating?: number;
  genre?: string;
  release_year?: string | Date;
  description?: string;
  duration?: number;
  poster_url?: string;
}

const MovieDetails: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        console.log(movieId);
        const data = await fetchMovieDetails(movieId);
        console.log(data);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    getMovieDetails();
  }, [movieId]);

  if (!movie)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
          color: "white",
          minHeight: "80vh",
        }}
      >
        <CircularProgress color="inherit" />
      </Box>
    );

  return (
    <Container
      maxWidth="xl"
      sx={{ p: { xs: 1, sm: 1, md: 2 }, bgcolor: "black" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 0, sm: 3, md: 4 },
          alignItems: { xs: "center", sm: "flex-start" },
          width: "100%",
        }}
      >
        <Box
          sx={{
            flex: { xs: "1 1 100%", sm: "0 0 auto", md: "0 0 auto" },
            width: { xs: "100%", sm: "45%", md: "40%" },
            maxWidth: { xs: "100%", sm: "500px", md: "600px" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: { xs: 1, sm: 0 },
          }}
        >
          <Box
            component="img"
            src={movie.banner_url || alterImage}
            alt={movie.title}
            sx={{
              width: "100%",
              height: "auto",
              aspectRatio: "16/9",
              objectFit: "cover",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: { sm: "scale(1.02)" },
                boxShadow: { sm: "0 8px 40px rgba(0,0,0,0.2)" },
              },
            }}
          />

          <Box
            sx={{
              width: "100%",
              mt: 2,
              textAlign: "center",
            }}
          >
            <Typography
              variant={isMobile ? "h6" : "h5"}
              gutterBottom
              sx={{
                fontWeight: "bold",
                mb: 1,
                color: "white",
              }}
            >
              Cast
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: { xs: 1, sm: 1 },
                justifyContent: "center",
              }}
            >
              {["Brad Pitt", "Edward Norton", "Helena Bonham Carter"].map(
                (actor, index) => (
                  <Chip
                    key={index}
                    label={actor}
                    size={isMobile ? "medium" : "medium"}
                    sx={{
                      bgcolor: "#374151",
                      color: "white",
                      mb: 0.3,
                      py: 0.5,
                      px: 0.5,
                      borderRadius: "16px",
                      fontWeight: "medium",
                      "&:hover": { bgcolor: "#4B5563" },
                    }}
                  />
                )
              )}
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            flex: { xs: "1 1 100%", sm: "1 1 0%" },
            width: { xs: "100%", sm: "auto" },
            color: "white",
            padding: { xs: 1, sm: 0 },
          }}
        >
          <Typography
            variant={isMobile ? "h5" : "h3"}
            fontWeight="bold"
            gutterBottom
            sx={{
              mt: { xs: 1, sm: 0 },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            {movie.title}
          </Typography>

          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            color="gray"
            gutterBottom
            sx={{ textAlign: { xs: "center", sm: "left" } }}
          >
            Directed by: {movie.director || "Unknown"}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 1.5, sm: 2 },
              mt: 1,
              width: "100%",
              mb: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                justifyContent: { xs: "center", sm: "flex-start" },
              }}
            >
              <Typography fontWeight="medium">Rating:</Typography>
              {movie.rating ? (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>{movie.rating}/10</Typography>
                  <Rating
                    value={movie.rating / 2}
                    precision={0.5}
                    readOnly
                    size={isMobile ? "small" : "medium"}
                    icon={<StarIcon sx={{ color: "#FFD700" }} />}
                    emptyIcon={<StarIcon sx={{ color: "grey.500" }} />}
                  />
                </Box>
              ) : (
                <Typography>N/A</Typography>
              )}
            </Box>

            <Typography sx={{ textAlign: { xs: "center", sm: "left" } }}>
              <span style={{ fontWeight: "medium" }}>Genre:</span>{" "}
              {movie.genre || "N/A"}
            </Typography>

            <Typography sx={{ textAlign: { xs: "center", sm: "left" } }}>
              <span style={{ fontWeight: "medium" }}>Year Released:</span>{" "}
              {movie.release_year
                ? new Date(movie.release_year).getFullYear()
                : "N/A"}
            </Typography>
          </Box>

          <Typography
            sx={{
              mt: 1,
              mb: 1,
              fontSize: { xs: "0.9rem", sm: "1rem" },
              lineHeight: { xs: 1.6, sm: 1.7 },
              textAlign: { xs: "center", sm: "left" },
              px: { xs: 2, sm: 0 },
            }}
          >
            {movie.description}
          </Typography>

          <Box
            sx={{
              textAlign: { xs: "center", sm: "left" },
              py: { xs: 0, sm: 0 },
            }}
          >
            <Typography sx={{ fontWeight: "medium" }}>
              Duration:{" "}
              <span style={{ fontWeight: "normal" }}>
                {movie.duration ? `${movie.duration} Min` : "N/A"}
              </span>
            </Typography>
          </Box>
          <Box
            sx={{
              mt: { xs: 1, sm: 1 },
              mb: { xs: 0, sm: 1 },
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-start" },
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                fontSize: { xs: "0.7rem", sm: "1rem" },
                px: { xs: 2, sm: 2 },
                py: { xs: 1, sm: 1 },
                bgcolor: "#2563EB",
                borderRadius: "8px",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                "&:hover": { bgcolor: "#1E40AF" },
              }}
            >
              ADD TO WISHLIST
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default MovieDetails;
