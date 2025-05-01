import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import bgimage from '../../assets/tech-daily-PGuCnUzsRSM-unsplash.jpg';

type Movie = {
  id: number;
  title: string;
  genre: string;
  release_year: number;
  rating: string;
  poster_url: string;
  language: string;
  origin: string;
};

const AdminPanel: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [formData, setFormData] = useState<Omit<Movie, 'id'>>({
    title: '',
    genre: '',
    release_year: new Date().getFullYear(),
    rating: '',
    poster_url: '',
    language: '',
    origin: '',
  });
  const [isImageSelected, setIsImageSelected] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'release_year' ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        poster_url: imageUrl,
      }));
      setIsImageSelected(true);
    } else {
      setIsImageSelected(false);
    }
  };

  const handleAddMovie = () => {
    const newMovie: Movie = {
      id: movies.length + 1,
      ...formData,
    };
    setMovies((prevMovies) => [...prevMovies, newMovie]);
    alert('Movie Added Successfully!');

    setFormData({
      title: '',
      genre: '',
      release_year: new Date().getFullYear(),
      rating: '',
      poster_url: '',
      language: '',
      origin: '',
    });
    setIsImageSelected(false);
  };

  return (
    <Container
    maxWidth={false}
      sx={{
        width: '100vw',
        padding: 0,
        py: { xs: 2, sm: 3, md: 4 },
        backgroundImage: `url(${bgimage})`,
        backgroundSize:'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          p: { xs: 2, sm: 3 },
          color: '#ffffff',
          width: { xs: '90%', sm: '85%', md: '80%', lg: '70%' },
          maxWidth: '900px',
          boxShadow: { xs: 'none', sm: '0 4px 8px rgba(0,0,0,0)' },
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{
            color: '#ffffff',
            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
          }}
        >
          Add New Movie
        </Typography>
        <CardContent
          sx={{
            backgroundColor: 'transparent',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
            }}
          >
            {[
              { label: 'Title', name: 'title' },
              { label: 'Genre', name: 'genre' },
              { label: 'Release Year', name: 'release_year', type: 'number' },
              { label: 'Rating', name: 'rating' },
              { label: 'Language', name: 'language' },
              { label: 'Origin', name: 'origin' },
            ].map((field) => (
              <TextField
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type || 'text'}
                value={(formData as any)[field.name]}
                onChange={handleChange}
                required
                margin="normal"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#ffffff' },
                    '&:hover fieldset': { borderColor: '#b0b0b0' },
                    '&.Mui-focused fieldset': { borderColor: '#ffffff' },
                    color: '#ffffff',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#b0b0b0',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#ffffff',
                  },
                  width: { xs: '100%', sm: '80%', md: '70%' },
                }}
                InputProps={{ style: { color: '#ffffff' } }}
              />
            ))}

            <Button
              variant="outlined"
              component="label"
              sx={{
                color: '#ffffff',
                borderColor: '#ffffff',
                '&:hover': {
                  backgroundColor: 'rgba(51, 51, 51, 0.3)',
                  borderColor: '#cccccc',
                },
                width: { xs: '100%', sm: '80%', md: '70%' },
                py: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
              }}
            >
              {isImageSelected ? 'Image Selected' : 'Upload Poster'}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </Button>

            {isImageSelected && (
              <Box sx={{ mt: 1, textAlign: 'center' }}>
                {formData.poster_url && (
                  <Box
                    component="img"
                    src={formData.poster_url}
                    alt="Selected Poster"
                    sx={{
                      maxWidth: { xs: '150px', sm: '200px', md: '250px' },
                      maxHeight: { xs: '225px', sm: '300px', md: '375px' },
                      objectFit: 'contain',
                    }}
                  />
                )}
              </Box>
            )}

            <Button
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: '#ff0000',
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: '#cc0000',
                },
                width: { xs: '100%', sm: '80%', md: '70%' },
                py: 1.5,
              }}
              onClick={handleAddMovie}
            >
              Add Movie
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AdminPanel;