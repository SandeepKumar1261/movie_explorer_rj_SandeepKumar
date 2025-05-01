import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchMovies } from "../../../Services/Api";
import StarIcon from "@mui/icons-material/Star";

interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: number;
  poster_url?: string;
  banner_url?: string;
  release_year: number;
  director: string;
}

const genreFilters = [
  "All",
  "Action",
  "Thriller",
  "Drama",
  "Comedy",
  "Si-Fi",
  "Horror",
];

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchMovies();
        setMovies(data);
        setFilteredMovies(data);
        setError(null);
      } catch (err) {
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  useEffect(() => {
    filterMovies();
    setVisibleCount(6);
  }, [searchTerm, selectedGenre, movies]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (bottom && visibleCount < filteredMovies.length) {
        setVisibleCount((prev) => prev + 6);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [filteredMovies, visibleCount]);

  const filterMovies = () => {
    let filtered = [...movies];

    if (selectedGenre !== "All") {
      console.log(selectedGenre);
      filtered = filtered.filter((movie) =>
        movie.genre.toLowerCase().includes(selectedGenre.toLowerCase())
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMovies(filtered);
  };

  const handleCardClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <Box
      sx={{
        px: { xs: 1, sm: 2, md: 3, lg: 4 },
        py: 2,
        backgroundColor: "black",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 1,
          mb: 3,
          justifyContent: {
            xs: "center",
            sm: "space-between",
            md: "space-between",
          },
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {genreFilters.map((genre) => (
            <Button
              key={genre}
              variant={selectedGenre === genre ? "contained" : "outlined"}
              onClick={() => setSelectedGenre(genre)}
              size="small"
              sx={{
                color: selectedGenre === genre ? "#fff" : "#ccc",
                borderColor: "#ccc",
                fontFamily:"sans-serif",
                backgroundColor:
                  selectedGenre === genre ? "#333" : "transparent",
                "&:hover": {
                  backgroundColor: "#444",
                },
              }}
            >
              {genre}
            </Button>
          ))}
        </Box>

        <TextField
          variant="outlined"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          sx={{
            flexGrow: 1,
            minWidth: "200px",
            maxWidth: "300px",
            input: { color: "white" },
            "& .MuiOutlinedInput-root": {
              color: "white",
              backgroundColor: "#1e1e1e",
              "& fieldset": { borderColor: "gray" },
              "&:hover fieldset": { borderColor: "#fff" },
            },
          }}
        />
      </Box>

      <Typography variant="h5" sx={{ color: "#fff", mb: 2 }}>
        Explore
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : filteredMovies.length === 0 ? (
        <Typography color="textSecondary">No movies found.</Typography>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: 2, sm: 2.5, md: 3 },
              justifyContent: { xs: "center", sm: "flex-start" },
            }}
          >
            {filteredMovies.slice(0, visibleCount).map((movie) => (
              <Box
                key={movie.id}
                onClick={() => handleCardClick(movie.id)}
                sx={{
                  width: { xs: "100%", sm: "47%", md: "31%", lg: "23%" },
                  height: { xs: "60vh", md: "65vh" },
                  bgcolor: "#2b2b2b",
                  color: "#fff",
                  borderRadius: 2,
                  cursor: "pointer",
                  overflow: "hidden",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
              >
                <Card
                  sx={{
                    boxShadow: "none",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid white",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={
                      movie.banner_url ||
                      "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={movie.title}
                    sx={{
                      height: "65%",
                      objectFit: "cover",
                    }}
                  />
                  <CardContent
                    sx={{
                      color: "white",
                      backgroundColor: "black",
                      height: "35%",
                      py: 1,
                      px: 1,
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="subtitle1" noWrap fontWeight="bold">
                      {movie.title}
                    </Typography>
                    <Box
                      sx={{ display: "flex", alignItems: "center", mt: 0.5 }}
                    >
                      <Typography variant="body2">
                        Rating {movie.rating}/10
                      </Typography>
                      <StarIcon
                        sx={{ color: "yellow", fontSize: 18, ml: 0.5 }}
                      />
                    </Box>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      Year: {movie.release_year}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      Director: {movie.director}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>

          {visibleCount < filteredMovies.length && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <CircularProgress size={20} />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Movies;