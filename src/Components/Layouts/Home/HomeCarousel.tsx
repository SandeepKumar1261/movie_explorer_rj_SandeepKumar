import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  useMediaQuery,
  useTheme,
  Skeleton,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star";
import { fetchMoviesAll } from "../../../Services/Api.ts";
import { useNavigate } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: number;
  poster_url?: string;
  release_year: number;
  director: string;
}

interface MovieCarouselProps {
  genre: string;
}

const HomeCarousel: React.FC<MovieCarouselProps> = ({ genre }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [scrollX, setScrollX] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const theme = useTheme();

  const isXsScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMdScreen = useMediaQuery(theme.breakpoints.between("md", "lg"));

  const getCardWidth = (): number => {
    if (isXsScreen) return 150;
    if (isSmScreen) return 180;
    if (isMdScreen) return 200;
    return 220;
  };

  const CARD_WIDTH = getCardWidth();
  const CARD_GAP = isXsScreen ? 8 : 16;
  const SCROLL_AMOUNT = CARD_WIDTH + CARD_GAP;

  useEffect(() => {
    // const getMovies = async () => {
    //   try {
    //     setLoading(true);
    //     const data = await fetchMovies();
    //     if(genre==="Top Rated"){
    //       setMovies(data.filter((movie) => movie.rating >= 8));
    //     }
    //     else if(genre==="Related Movies"){
    //       console.log(localStorage.getItem("genre"));
    //       let currentGenre = localStorage.getItem("genre");
    //       let relMovies=[];
    //       let genres = currentGenre?.toLowerCase().split(",");
    //       genres=genres.map(genre => genre.trim());
    //       console.log(genres)
    //       relMovies = [...relMovies,data.filter((movie) => genres.includes(movie.genre.toLowerCase()))];
    //       console.log(relMovies);
    //       setMovies(relMovies);
    //       // setMovies(data.filter((movie) => movie.genre ===localStorage.getItem("genre") ).slice(0,5));
    //     }
    //     else{
    //       setMovies(data.filter((movie) => movie.release_year >= 2020));
    //     }
    //     setError(null);
    //   } catch (err) {
    //     setError("Failed to load movies.");
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    const getMovies = async () => {
      try {
        setLoading(true);
        let allMovies: any[] = [];
        let page = 1;
        let totalPages = Infinity;

        while (allMovies.length < 10 && page <= totalPages) {
          const { movies, pagination } = await fetchMoviesAll(page);
          totalPages = pagination.totalPages;

          let filtered: any[] = [];

          if (genre === "Top Rated") {
            filtered = movies.filter((movie) => movie.rating >= 8);
          } else if (genre === "Related Movies") {
            const currentGenre = localStorage.getItem("genre");
            let genres =
              currentGenre
                ?.toLowerCase()
                .split(",")
                .map((g) => g.trim()) || [];
            filtered = movies.filter((movie) =>
              genres.some((g) => movie.genre.toLowerCase().includes(g))
            );
          } else {
            filtered = movies.filter((movie) => movie.release_year >= 2020);
          }

          allMovies = [...allMovies, ...filtered];
          page++;
        }

        // Limit to 10 if more were fetched
        setMovies(allMovies.slice(0, 10));
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [genre]);

  useEffect(() => {
    const updateMaxScroll = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const totalWidth = movies.length * (getCardWidth() + CARD_GAP);
        const scrollableWidth = totalWidth - containerWidth;
        setMaxScroll(scrollableWidth > 0 ? scrollableWidth : 0);
      }
    };

    updateMaxScroll();
    setScrollX(0);

    const handleResize = () => {
      updateMaxScroll();
      setScrollX((prev) => Math.min(prev, maxScroll));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [movies.length, isXsScreen]);

  const handleScrollLeft = () => {
    setScrollX((prev) => Math.max(prev - SCROLL_AMOUNT, 0));
  };

  const handleScrollRight = () => {
    setScrollX((prev) => Math.min(prev + SCROLL_AMOUNT, maxScroll));
  };

  useEffect(() => {
    if (!isXsScreen && containerRef.current) {
      containerRef.current.scrollTo({ left: scrollX, behavior: "smooth" });
    }
  }, [scrollX, isXsScreen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    const threshold = 100;
    if (touchStart - touchEnd > threshold) handleScrollRight();
    if (touchStart - touchEnd < -threshold) handleScrollLeft();
  };

  const handleCardClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  const isAtStart = scrollX <= 0;
  const isAtEnd = scrollX >= maxScroll - 15;

  const renderSkeletons = () => {
    return Array.from(new Array(5)).map((_, index) => (
      <Card
        key={index}
        sx={{
          width: CARD_WIDTH,
          bgcolor: "#2b2b2b",
          borderRadius: 2,
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Skeleton
          variant="rectangular"
          height={isXsScreen ? 200 : 250}
          animation="wave"
          sx={{ bgcolor: "rgba(255,255,255,0.1)" }}
        />
        <CardContent>
          <Skeleton
            variant="text"
            width="80%"
            sx={{ bgcolor: "rgba(255,255,255,0.1)" }}
          />
          <Skeleton
            variant="text"
            width="50%"
            sx={{ bgcolor: "rgba(255,255,255,0.1)", mt: 1 }}
          />
          <Skeleton
            variant="text"
            width="70%"
            sx={{ bgcolor: "rgba(255,255,255,0.1)", mt: 1 }}
          />
        </CardContent>
      </Card>
    ));
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        py: { xs: 2, sm: 3, md: 1 },
        bgcolor: "black",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 2, sm: 4, md: 6 },
          mb: { xs: 1, sm: 2 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#fff",
            fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
          }}
        >
          {genre}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#00bcd4",
            cursor: "pointer",
            fontWeight: "bold",
            textDecoration: "underline",
            "&:hover": { color: "#03a9f4" },
          }}
          onClick={() => navigate(`/movies`)}
        >
          See All
        </Typography>
      </Box>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: { xs: 3, md: 6 },
            minHeight: isXsScreen ? 280 : 350,
          }}
        >
          <Box
            sx={{
              display: "flex",
              overflowX: "hidden",
              gap: 2,
              pl: { xs: 2, sm: 4, md: 6 },
            }}
          >
            {renderSkeletons()}
          </Box>
        </Box>
      ) : error ? (
        <Typography
          color="error"
          align="center"
          sx={{ py: { xs: 3, md: 6 }, px: 2 }}
        >
          {error}
        </Typography>
      ) : movies.length === 0 ? (
        <Typography
          color="textSecondary"
          align="center"
          sx={{ py: { xs: 3, md: 6 }, px: 2 }}
        >
          No movies found for {genre}.
        </Typography>
      ) : (
        <Box sx={{ position: "relative" }}>
          {!isXsScreen && (
            <IconButton
              onClick={handleScrollLeft}
              disabled={isAtStart}
              sx={{
                position: "absolute",
                top: "50%",
                left: { xs: 0, sm: 10 },
                transform: "translateY(-50%)",
                zIndex: 2,
                bgcolor: "rgba(0,0,0,0.6)",
                color: "#fff",
                opacity: isAtStart ? 0.5 : 1,
                "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
              }}
              size={isSmScreen ? "small" : "medium"}
            >
              <ArrowBackIosNewIcon fontSize={isSmScreen ? "small" : "medium"} />
            </IconButton>
          )}

          <Box
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            sx={{
              display: "flex",
              gap: `${CARD_GAP}px`,
              pl: { xs: 2, sm: 4, md: 6 },
              pr: { xs: 2, sm: 0 },
              overflowX: isXsScreen ? "auto" : "hidden",
              overflowY: "hidden",
              WebkitOverflowScrolling: "touch",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
              pb: 1,
            }}
          >
            {movies.map((movie) => (
              <Card
                key={movie.id}
                onClick={() => handleCardClick(movie.id)}
                sx={{
                  width: CARD_WIDTH,
                  bgcolor: "#2b2b2b",
                  color: "#fff",
                  borderRadius: 2,
                  overflow: "hidden",
                  flexShrink: 0,
                  cursor: "pointer",
                }}
              >
                <CardMedia
                  component="img"
                  height={isXsScreen ? 200 : 250}
                  image={
                    movie.poster_url ||
                    "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  alt={movie.title || "Movie poster"}
                  sx={{ height: 250, objectFit: "cover" }}
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
                    <Typography variant="body2">
                      Rating {movie.rating}/10
                    </Typography>
                    <StarIcon
                      sx={{ color: "#FFD700", fontSize: 18, ml: 0.5 }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Released Year: {movie.release_year}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    Director: {movie.director}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          {!isXsScreen && (
            <IconButton
              onClick={handleScrollRight}
              disabled={isAtEnd}
              sx={{
                position: "absolute",
                top: "50%",
                right: { xs: 0, sm: 10 },
                transform: "translateY(-50%)",
                zIndex: 2,
                bgcolor: "rgba(0,0,0,0.6)",
                color: "#fff",
                opacity: isAtEnd ? 0.5 : 1,
                "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
              }}
              size={isSmScreen ? "small" : "medium"}
            >
              <ArrowForwardIosIcon fontSize={isSmScreen ? "small" : "medium"} />
            </IconButton>
          )}
        </Box>
      )}
    </Box>
  );
};

export default HomeCarousel;
