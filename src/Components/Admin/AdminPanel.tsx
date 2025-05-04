import React, { useState } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

type Movie = {
  id: number;
  title: string;
  genre: string;
  release_year: number;
  rating: string;
  description: string;
  director: string;
  duration: number;
  poster_url: string;
  banner_url: string;
};

const AdminPanel: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState<Omit<Movie, 'id'>>({
    title: '',
    genre: '',
    release_year: new Date().getFullYear(),
    rating: '',
    description: '',
    director: '',
    duration: 0,
    poster_url: '',
    banner_url: '',
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isEditing, setIsEditing] = useState(false);
  const [editingMovieId, setEditingMovieId] = useState<number | null>(null);

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};
    for (const key in formData) {
      if (
        formData[key as keyof typeof formData] === '' ||
        formData[key as keyof typeof formData] === null ||
        (typeof formData[key as keyof typeof formData] === 'number' &&
          formData[key as keyof typeof formData] === 0)
      ) {
        errors[key] = 'This field is required';
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'poster_url' | 'banner_url'
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, [field]: imageUrl }));
      setFormErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleAddOrUpdateMovie = () => {
    if (!validateForm()) return;

    if (isEditing && editingMovieId !== null) {
      alert('Movie updated successfully!');
    } else {
      alert('Movie added successfully!');
    }

    setFormData({
      title: '',
      genre: '',
      release_year: new Date().getFullYear(),
      rating: '',
      description: '',
      director: '',
      duration: 0,
      poster_url: '',
      banner_url: '',
    });
    setIsEditing(false);
    setEditingMovieId(null);
    setFormErrors({});
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt:1,
        mb:0.2,
        // minHeight: '100vh',
        p: { xs: 1, sm: 1 },
        width: '100%',
        // maxWidth: '800px',
        bgcolor: 'black',
        mx: 'auto',
      }}
    >
      <Card
        sx={{
          p: { xs: 2, sm: 3 },
          width: '100%',
          maxWidth: '800px',
          bgcolor: 'rgba(0, 0, 0, 0.1)',
          color: '#fff',
          border: '2px solid lightgray',
          borderRadius: 2,
          backdropFilter: 'blur(5px)',
        }}
      >
        <Box>
          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            mb={2}
            align="center"
            sx={{ fontWeight: 'bold', color: '#fff' }}
          >
            {isEditing ? 'Edit Movie' : 'Add New Movie'}
          </Typography>

          <CardContent sx={{ p: { xs: 0, sm: 1 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* First row - Title and Director */}
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                <TextField
                  label="Movie Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  error={!!formErrors.title}
                  helperText={formErrors.title}
                  InputLabelProps={{ style: { color: '#ccc' } }}
                  InputProps={{ style: { color: '#fff' } }}
                  sx={{
                    flex: 1,
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      '& fieldset': { borderColor: 'red' },
                      '&:hover fieldset': { borderColor: 'red' },
                      '&.Mui-focused fieldset': { borderColor: 'red' },
                    },
                  }}
                  size={isMobile ? 'small' : 'medium'}
                />
                <TextField
                  label="Director"
                  name="director"
                  value={formData.director}
                  onChange={handleChange}
                  error={!!formErrors.director}
                  helperText={formErrors.director}
                  InputLabelProps={{ style: { color: '#ccc' } }}
                  InputProps={{ style: { color: '#fff' } }}
                  sx={{
                    flex: 1,
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      '& fieldset': { borderColor: 'red' },
                      '&:hover fieldset': { borderColor: 'red' },
                      '&.Mui-focused fieldset': { borderColor: 'red' },
                    },
                  }}
                  size={isMobile ? 'small' : 'medium'}
                />
              </Box>

              {/* Second row - Genre, Year, Duration */}
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                <TextField
                  label="Genre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  error={!!formErrors.genre}
                  helperText={formErrors.genre}
                  InputLabelProps={{ style: { color: '#ccc' } }}
                  InputProps={{ style: { color: '#fff' } }}
                  sx={{
                    flex: 1,
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      '& fieldset': { borderColor: 'red' },
                      '&:hover fieldset': { borderColor: 'red' },
                      '&.Mui-focused fieldset': { borderColor: 'red' },
                    },
                  }}
                  size={isMobile ? 'small' : 'medium'}
                />
                <Box sx={{ flex: 1, display: 'flex', gap: 2 }}>
                  <TextField
                    label="Release Year"
                    name="release_year"
                    type="number"
                    value={formData.release_year}
                    onChange={handleChange}
                    error={!!formErrors.release_year}
                    helperText={formErrors.release_year}
                    InputLabelProps={{ style: { color: '#ccc' } }}
                    InputProps={{ style: { color: '#fff' } }}
                    sx={{
                      width: '100%',
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        '& fieldset': { borderColor: 'red' },
                        '&:hover fieldset': { borderColor: 'red' },
                        '&.Mui-focused fieldset': { borderColor: 'red' },
                      },
                    }}
                    size={isMobile ? 'small' : 'medium'}
                  />
                  <TextField
                    label="Duration (min)"
                    name="duration"
                    type="number"
                    value={formData.duration}
                    onChange={handleChange}
                    error={!!formErrors.duration}
                    helperText={formErrors.duration}
                    InputLabelProps={{ style: { color: '#ccc' } }}
                    InputProps={{ style: { color: '#fff' } }}
                    sx={{
                      width: '100%',
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        '& fieldset': { borderColor: 'red' },
                        '&:hover fieldset': { borderColor: 'red' },
                        '&.Mui-focused fieldset': { borderColor: 'red' },
                      },
                    }}
                    size={isMobile ? 'small' : 'medium'}
                  />
                </Box>
              </Box>

              {/* Third row - Rating and Description */}
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                <TextField
                  label="Rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  error={!!formErrors.rating}
                  helperText={formErrors.rating}
                  InputLabelProps={{ style: { color: '#ccc' } }}
                  InputProps={{ style: { color: '#fff' } }}
                  sx={{
                    flex: 1,
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      '& fieldset': { borderColor: 'red' },
                      '&:hover fieldset': { borderColor: 'red' },
                      '&.Mui-focused fieldset': { borderColor: 'red' },
                    },
                  }}
                  placeholder="PG-13, R, G, etc."
                  size={isMobile ? 'small' : 'medium'}
                />
                <TextField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  error={!!formErrors.description}
                  helperText={formErrors.description}
                  InputLabelProps={{ style: { color: '#ccc' } }}
                  InputProps={{ style: { color: '#fff' } }}
                  sx={{
                    flex: 1,
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      '& fieldset': { borderColor: 'red' },
                      '&:hover fieldset': { borderColor: 'red' },
                      '&.Mui-focused fieldset': { borderColor: 'red' },
                    },
                  }}
                  multiline
                  rows={isMobile ? 2 : 3}
                  size={isMobile ? 'small' : 'medium'}
                />
              </Box>

              {/* Fourth row - Poster and Banner */}
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<AddPhotoAlternateIcon />}
                    sx={{
                      color: '#ccc',
                      borderColor: 'red',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      '&:hover': { borderColor: 'red', bgcolor: 'rgba(255, 255, 255, 0.2)' },
                      height: '100px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    fullWidth
                  >
                    <Typography variant="body2">
                      {formData.poster_url ? 'Poster Selected' : 'Upload Movie Poster'}
                    </Typography>
                    {formData.poster_url && (
                      <img
                        src={formData.poster_url}
                        alt="Selected poster"
                        style={{ height: '60px', marginTop: '8px', borderRadius: 4 }}
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => handleFileChange(e, 'poster_url')}
                    />
                  </Button>
                  {formErrors.poster_url && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                      {formErrors.poster_url}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<AddPhotoAlternateIcon />}
                    sx={{
                      color: '#ccc',
                      borderColor: 'red',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      '&:hover': { borderColor: 'red', bgcolor: 'rgba(255, 255, 255, 0.2)' },
                      height: '100px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    fullWidth
                  >
                    <Typography variant="body2">
                      {formData.banner_url ? 'Banner Selected' : 'Upload Movie Banner'}
                    </Typography>
                    {formData.banner_url && (
                      <img
                        src={formData.banner_url}
                        alt="Selected banner"
                        style={{ height: '60px', marginTop: '8px', borderRadius: 4 }}
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => handleFileChange(e, 'banner_url')}
                    />
                  </Button>
                  {formErrors.banner_url && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                      {formErrors.banner_url}
                    </Typography>
                  )}
                </Box>
              </Box>

              {/* Action buttons */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, width: '100%' }}>
                  {isEditing && (
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setIsEditing(false);
                        setEditingMovieId(null);
                        setFormData({
                          title: '',
                          genre: '',
                          release_year: new Date().getFullYear(),
                          rating: '',
                          description: '',
                          director: '',
                          duration: 0,
                          poster_url: '',
                          banner_url: '',
                        });
                        setFormErrors({});
                      }}
                      sx={{
                        color: '#fff',
                        borderColor: 'red',
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        '&:hover': { borderColor: 'red', bgcolor: 'rgba(255, 255, 255, 0.2)' },
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleAddOrUpdateMovie}
                    sx={{
                      bgcolor: 'red',
                      '&:hover': { bgcolor: '#d00000' },
                      color: '#fff',
                      px: 4,
                      width: '100%',
                      maxWidth: '200px',
                    }}
                  >
                    {isEditing ? 'Update Movie' : 'Add Movie'}
                  </Button>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default AdminPanel;