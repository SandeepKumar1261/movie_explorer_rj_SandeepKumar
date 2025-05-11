import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  TextField,
  IconButton,
  Pagination,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchMoviesAlll, deleteMovie } from "../../../Utils/Api";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: number;
  description: string;
  poster_url?: string;
  banner_url?: string;
  release_year: number;
  director: string;
  premium?: boolean;
}

const genreFilters = [
  "All",
  "Romance",
  "Action",
  "Thriller",
  "Drama",
  "Comedy",
  "Si-Fi",
  "Horror",
];

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userRole, setUserRole] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUserRole(user.role || "");
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const genreQuery = selectedGenre === "All" ? "" : selectedGenre;
        const ratingQuery = rating === "All" || rating === "" ? "" : rating;

        const response = await fetchMoviesAlll(
          currentPage,
          genreQuery,
          searchTerm,
          ratingQuery
        );

        if (response?.movies) {
          setMovies(response.movies);
          setTotalPages(response.meta?.total_pages || 1);
        } else {
          setMovies([]);
          setTotalPages(1);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch movies.");
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage, selectedGenre, searchTerm, rating]);

  const handleCardClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleEditClick = (movie: Movie) => {
    navigate("/admin", { state: { movieId: movie.id, movie } });
  };

  const handleDeleteClick = async (movieId: number) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this movie?"
      );
      if (confirmDelete) {
        await deleteMovie(movieId);
        setMovies((prevMovies) =>
          prevMovies.filter((movie) => movie.id !== movieId)
        );
      }
    } catch (error) {
      console.error("Failed to delete movie:", error);
      setError("Failed to delete movie.");
    }
  };

  const selectStyles = {
    minWidth: 120,
    backgroundColor: "black",
    "& .MuiInputBase-root": {
      color: "white",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "gray",
    },
    "& .MuiSvgIcon-root": {
      color: "white",
    },
    "& .MuiInputLabel-root": {
      color: "white",
    },
    "& label.Mui-focused": {
      color: "white",
    },
  };

  return (
    <Box sx={{ px: 2, py: 2, backgroundColor: "black" }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 1,
          mb: 3,
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          <TextField
            select
            label="Genre"
            value={selectedGenre}
            onChange={(e) => {
              setSelectedGenre(e.target.value);
              setCurrentPage(1);
            }}
            size="small"
            SelectProps={{
              native: false,
              MenuProps: {
                PaperProps: {
                  sx: {
                    backgroundColor: "#000",
                    color: "#fff",
                  },
                },
              },
            }}
            sx={selectStyles}
          >
            {genreFilters.map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Rating"
            value={rating}
            onChange={(e) => {
              setRating(e.target.value);
              setCurrentPage(1);
            }}
            size="small"
            SelectProps={{
              native: false,
              MenuProps: {
                PaperProps: {
                  sx: {
                    backgroundColor: "#000",
                    color: "#fff",
                  },
                },
              },
            }}
            sx={selectStyles}
          >
            <MenuItem key="All" value="All">
              All
            </MenuItem>
            {[...Array(5)].map((_, i) => {
              const rate = 9 - i;
              return (
                <MenuItem key={rate} value={rate}>
                  {rate}+
                </MenuItem>
              );
            })}
          </TextField>
        </Box>

        <TextField
          variant="outlined"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          size="small"
          sx={{
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
      ) : movies.length === 0 ? (
        <Typography color="textSecondary">No movies found.</Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
          }}
        >
          {movies.map((movie) => (
            <Box
              key={movie.id}
              onClick={() => handleCardClick(movie.id)}
              sx={{
                position: "relative",
                width: { xs: "100%", sm: "45%", md: "30%", lg: "18%" },
                height: { xs: "80vh", md: "65vh" },
                bgcolor: "#2b2b2b",
                color: "#fff",
                cursor: "pointer",
                overflow: "hidden",
                border: "none",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              {movie.premium && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    zIndex: 1,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    borderRadius: "50%",
                    padding: "1px",
                  }}
                >
                  <WorkspacePremiumIcon sx={{ color: "gold" }} />
                </Box>
              )}

              {userRole === "supervisor" && (
                <>
                  <IconButton
                    sx={{
                      width: "2rem",
                      height: "2rem",
                      position: "absolute",
                      top: 8,
                      right: 8,
                      zIndex: 1,
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(movie);
                    }}
                  >
                    <EditIcon sx={{ fontSize: "xl", color: "white" }} />
                  </IconButton>
                  <IconButton
                    sx={{
                      width: "2rem",
                      height: "2rem",
                      position: "absolute",
                      top: 8,
                      right: 45,
                      zIndex: 1,
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(movie.id);
                    }}
                  >
                    <DeleteIcon sx={{ fontSize: "xl", color: "red" }} />
                  </IconButton>
                </>
              )}

              <Card
                sx={{
                  boxShadow: "none",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
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
                    height: "40%",
                    py: 0.4,
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

                  <Box sx={{ display: "flex", alignItems: "center", mt: 0.1 }}>
                    <Typography variant="body2">
                      Rating {movie.rating}/10
                    </Typography>
                    <StarIcon sx={{ color: "yellow", fontSize: 18, ml: 0.5 }} />
                  </Box>
                  <Typography variant="body2" sx={{ mt: 0.1 }}>
                    Year: {movie.release_year}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.1 }}>
                    Director: {movie.director}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "white",
            },
            "& .MuiPaginationItem-previousNext": {
              color: "white",
            },
            "& .MuiPaginationItem-ellipsis": {
              color: "white",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Movies;
