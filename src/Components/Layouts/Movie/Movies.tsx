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
import { fetchMoviesAll } from "../../../Services/Api";
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
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [perPage] = useState(10);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(() => {
    return parseInt(localStorage.getItem("currentPage") || "1");
  });

  const totalPages = Math.ceil(filteredMovies.length / perPage);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        setLoading(true);
        const allFetchedMovies: Movie[] = [];
        let page = 1;
        let hasMore = true;

        while (hasMore) {
          const response = await fetchMoviesAll(page);
          if (response?.movies?.length > 0) {
            allFetchedMovies.push(...response.movies);
            if (page >= response.pagination.total_pages) {
              hasMore = false;
            } else {
              page++;
            }
          } else {
            hasMore = false;
          }
        }

        setAllMovies(allFetchedMovies);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch movies.");
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, []);

  useEffect(() => {
    filterAndSearchMovies();
  }, [allMovies, searchTerm, selectedGenre]);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  const filterAndSearchMovies = () => {
    let result = [...allMovies];

    if (selectedGenre !== "All") {
      result = result.filter((movie) =>
        movie.genre.toLowerCase().includes(selectedGenre.toLowerCase())
      );
    }

    if (searchTerm) {
      result = result.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMovies(result);
    setCurrentPage(1); // Reset only when search/filter changes
  };

  const handleCardClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const paginatedMovies = filteredMovies.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <Box sx={{ px: { xs: 1, sm: 2, md: 3, lg: 4 }, py: 2, backgroundColor: "black" }}>
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
                fontFamily: "sans-serif",
                backgroundColor: selectedGenre === genre ? "#333" : "transparent",
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
      ) : paginatedMovies.length === 0 ? (
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
            {paginatedMovies.map((movie) => (
              <Box
                key={movie.id}
                onClick={() => handleCardClick(movie.id)}
                sx={{
                  width: { xs: "100%", sm: "47%", md: "31%", lg: "18%" },
                  height: { xs: "60vh", md: "55vh" },
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
                    sx={{ height: "65%", objectFit: "cover" }}
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
                    <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                      <Typography variant="body2">
                        Rating {movie.rating}/10
                      </Typography>
                      <StarIcon sx={{ color: "yellow", fontSize: 18, ml: 0.5 }} />
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

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              mt: 4,
            }}
          >
            <Button
              variant="contained"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              sx={{ backgroundColor: "#333", "&:hover": { backgroundColor: "#444" } }}
            >
              Previous
            </Button>
            <Typography sx={{ color: "#fff" }}>
              Page {currentPage} of {totalPages}
            </Typography>
            <Button
              variant="contained"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              sx={{ backgroundColor: "#333", "&:hover": { backgroundColor: "#444" } }}
            >
              Next
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Movies;
