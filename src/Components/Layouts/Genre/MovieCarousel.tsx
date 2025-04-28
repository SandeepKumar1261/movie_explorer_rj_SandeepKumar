import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star";

const allMovies = [
  {
    title: "Kong: Skull Island",
    genre: "Action",
    rating: 6.6,
    poster: "https://image.tmdb.org/t/p/w500//r2517Vz9EhDhj88qwbDVj8DCRZN.jpg",
  },
  {
    title: "The Flash",
    genre: "Action",
    rating: 7.0,
    poster: "https://image.tmdb.org/t/p/w500//rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg",
  },
  {
    title: "Indiana Jones",
    genre: "Adventure",
    rating: 6.2,
    poster: "https://image.tmdb.org/t/p/w500//Af4bXE63pVsb2FtbW8uYIyPBadD.jpg",
  },
  {
    title: "The Electric State",
    genre: "Sci-Fi",
    rating: 7.5,
    poster: "https://via.placeholder.com/300x450?text=Electric+State",
  },
  {
    title: "Action Movie 1",
    genre: "Action",
    rating: 6.8,
    poster: "https://via.placeholder.com/300x450?text=Action+1",
  },
  {
    title: "Action Movie 2",
    genre: "Action",
    rating: 7.3,
    poster: "https://via.placeholder.com/300x450?text=Action+2",
  },
  {
    title: "Action Movie 3",
    genre: "Action",
    rating: 7.0,
    poster: "https://via.placeholder.com/300x450?text=Action+3",
  },
  {
    title: "Action Movie 4",
    genre: "Action",
    rating: 7.2,
    poster: "https://via.placeholder.com/300x450?text=Action+4",
  },
  {
    title: "Action Movie 5",
    genre: "Action",
    rating: 6.9,
    poster: "https://via.placeholder.com/300x450?text=Action+5",
  },
  {
    title: "Action Movie 6",
    genre: "Action",
    rating: 7.1,
    poster: "https://via.placeholder.com/300x450?text=Action+6",
  },
];

const CARD_WIDTH = 220;

interface MovieCarouselProps {
  genre: string; // Genre prop passed from the parent component
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ genre }) => {
  const [scrollX, setScrollX] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter movies based on the genre passed as a prop
  const filteredMovies = allMovies.filter((movie) => movie.genre === genre);

  useEffect(() => {
    const updateMaxScroll = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const totalWidth = filteredMovies.length * CARD_WIDTH;
        const scrollableWidth = totalWidth - containerWidth;
        setMaxScroll(scrollableWidth > 0 ? scrollableWidth : 0);
      }
    };

    updateMaxScroll();
    window.addEventListener("resize", updateMaxScroll);
    return () => window.removeEventListener("resize", updateMaxScroll);
  }, [filteredMovies]);

  const handleScrollLeft = () => {
    setScrollX((prev) => Math.max(prev - CARD_WIDTH, 0));
  };

  const handleScrollRight = () => {
    setScrollX((prev) => Math.min(prev + CARD_WIDTH, maxScroll));
  };

  const isAtStart = scrollX === 0;
  const isAtEnd = scrollX >= maxScroll;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        py: 4,
        bgcolor: "#0b0b0b",
      }}
    >
      <Typography variant="h4" sx={{ color: "#fff", mb: 2, pl: 6 }}>
        {genre} Movies
      </Typography>

      <Box sx={{ position: "relative" }}>
        <IconButton
          onClick={handleScrollLeft}
          disabled={isAtStart}
          sx={{
            position: "absolute",
            top: "50%",
            left: 10,
            transform: "translateY(-50%)",
            zIndex: 2,
            bgcolor: "rgba(0,0,0,0.6)",
            color: "#fff",
            opacity: isAtStart ? 0.5 : 1,
            "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        <Box
          ref={containerRef}
          sx={{
            display: "flex",
            gap: 2,
            transition: "all 0.5s ease",
            transform: `translateX(-${scrollX}px)`,
            pl: 6,
          }}
        >
          {filteredMovies.map((movie, index) => (
            <Card
              key={index}
              sx={{
                minWidth: 200,
                maxWidth: 200,
                bgcolor: "#2b2b2b",
                color: "#fff",
                borderRadius: 2,
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <CardMedia
                component="img"
                height="300"
                image={movie.poster}
                alt={movie.title}
              />
              <CardContent>
                <Typography
                  variant="subtitle1"
                  noWrap
                  sx={{ fontWeight: "bold" }}
                >
                  {movie.title}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <StarIcon sx={{ color: "#FFD700", fontSize: 18, mr: 0.5 }} />
                  <Typography variant="body2">{movie.rating}/10</Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        <IconButton
          onClick={handleScrollRight}
          disabled={isAtEnd}
          sx={{
            position: "absolute",
            top: "50%",
            right: 10,
            transform: "translateY(-50%)",
            zIndex: 2,
            bgcolor: "rgba(0,0,0,0.6)",
            color: "#fff",
            opacity: isAtEnd ? 0.5 : 1,
            "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MovieCarousel;
