import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  CircularProgress,
  MenuItem,
  Snackbar,
  Alert,
  Grid,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { addMovie, updateMovie } from "../../Utils/Api";

interface Movie {
  id?: number;
  title: string;
  genre: string;
  rating: number;
  poster_url: string | File;
  banner_url: string | File;
  release_year: number;
  director: string;
  description: string;
}

const genres = [
  "Action",
  "Romance",
  "Thriller",
  "Drama",
  "Comedy",
  "Sci-Fi",
  "Horror",
];

const AdminPanel: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movieId, movie } = location.state || {};

  const [formData, setFormData] = useState<Movie>({
    id: undefined,
    title: "",
    genre: "",
    rating: 0,
    poster_url: "",
    banner_url: "",
    release_year: new Date().getFullYear(),
    director: "",
    description: "",
  });

  const [preview, setPreview] = useState<{
    poster_url?: string;
    banner_url?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const isEditMode = !!movieId;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (isEditMode && movie) {
      setFormData({
        id: movie.id,
        title: movie.title || "",
        genre: movie.genre || "",
        rating: movie.rating || 0,
        poster_url: movie.poster_url || "",
        banner_url: movie.banner_url || "",
        release_year: movie.release_year || new Date().getFullYear(),
        director: movie.director || "",
        description: movie.description || "",
      });

      setPreview({
        poster_url:
          typeof movie.poster_url === "string" ? movie.poster_url : "",
        banner_url:
          typeof movie.banner_url === "string" ? movie.banner_url : "",
      });
    }
  }, [isEditMode, movie, movieId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "rating" || name === "release_year" ? Number(value) : value,
    }));
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "poster_url" | "banner_url"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [field]: file }));
      const reader = new FileReader();
      reader.onloadend = () =>
        setPreview((prev) => ({ ...prev, [field]: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("genre", formData.genre);
      data.append("rating", formData.rating.toString());
      data.append("release_year", formData.release_year.toString());
      data.append("director", formData.director);
      data.append("description", formData.description);

      if (formData.poster_url instanceof File) {
        data.append("poster", formData.poster_url);
      }

      if (formData.banner_url instanceof File) {
        data.append("banner", formData.banner_url);
      }

      if (isEditMode && formData.id !== undefined) {
        await updateMovie(formData.id, data);
        setSnackbar({
          open: true,
          message: "Movie updated successfully!",
          severity: "success",
        });
      } else {
        await addMovie(data);
        setSnackbar({
          open: true,
          message: "Movie added successfully!",
          severity: "success",
        });
      }

      setTimeout(() => navigate("/movies"), 1500);
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: isEditMode
          ? "Failed to update movie."
          : "Failed to add movie.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const textFieldStyle = {
    input: { color: "#fff" },
    textarea: { color: "#fff" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "gray" },
      "&:hover fieldset": { borderColor: "#fff" },
    },
    "& .MuiInputLabel-root": { color: "gray" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#fff" },
  };

  return (
    <Container maxWidth={isMobile ? "sm" : "md"} sx={{ py: 3 }}>
      <Paper
        elevation={3}
        sx={{ p: 3, backgroundColor: "#1e1e1e", color: "#fff" }}
      >
        <Typography variant="h5" textAlign="center" mb={2}>
          {isEditMode ? "Edit Movie" : "Add New Movie"}
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            name="title"
            label="Title"
            value={formData.title}
            onChange={handleChange}
            required
            fullWidth
            sx={textFieldStyle}
          />
          <TextField
            name="genre"
            select
            label="Genre"
            value={formData.genre}
            onChange={handleChange}
            required
            fullWidth
            sx={textFieldStyle}
          >
            {genres.map((g) => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="rating"
            label="Rating (0-10)"
            type="number"
            inputProps={{ min: 0, max: 10, step: 0.1 }}
            value={formData.rating}
            onChange={handleChange}
            required
            fullWidth
            sx={textFieldStyle}
          />

          <Divider sx={{ bgcolor: "#444" }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography>Poster</Typography>
              <Button
                component="label"
                variant="outlined"
                fullWidth
                sx={{ color: "#fff", borderColor: "gray" }}
              >
                Choose Poster
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, "poster_url")}
                />
              </Button>
              {preview.poster_url && (
                <Box
                  sx={{
                    mt: 1,
                    width: "100%",
                    height: 180,
                    bgcolor: "#333",
                    borderRadius: 1,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={preview.poster_url}
                    alt="poster preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>Banner</Typography>
              <Button
                component="label"
                variant="outlined"
                fullWidth
                sx={{ color: "#fff", borderColor: "gray" }}
              >
                Choose Banner
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, "banner_url")}
                />
              </Button>
              {preview.banner_url && (
                <Box
                  sx={{
                    mt: 1,
                    width: "100%",
                    height: 180,
                    bgcolor: "#333",
                    borderRadius: 1,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={preview.banner_url}
                    alt="banner preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              )}
            </Grid>
          </Grid>

          <TextField
            name="release_year"
            label="Release Year"
            type="number"
            value={formData.release_year}
            onChange={handleChange}
            required
            fullWidth
            sx={textFieldStyle}
          />
          <TextField
            name="director"
            label="Director"
            value={formData.director}
            onChange={handleChange}
            required
            fullWidth
            sx={textFieldStyle}
          />

          <TextField
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            required
            fullWidth
            sx={textFieldStyle}
          />

          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 2,
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              fullWidth
              sx={{ backgroundColor: "#333" }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : isEditMode ? (
                "Update"
              ) : (
                "Add"
              )}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/movies")}
              fullWidth
              sx={{ borderColor: "gray", color: "#fff" }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminPanel;
