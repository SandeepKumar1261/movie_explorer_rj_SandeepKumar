import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  IconButton,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star";
import alterImage from "../../../assets/FightClub.jpeg";

interface Movie {
  id: number;
  title: string;
  poster_url: string;
  rating: number;
}

interface CarouselProps {
  title: string;
  movies: Movie[];
}

const Carousel: React.FC<CarouselProps> = ({ title, movies }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const cardWidth = 200;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const getVisibleCards = () => {
    if (isMobile) return 1;
    if (isTablet) return 3;
    return 4;
  };

  const getScrollAmount = () => {
    if (isMobile) return cardWidth;
    if (isTablet) return cardWidth * 2;
    return cardWidth * 2;
  };

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount =
        direction === "left" ? -getScrollAmount() : getScrollAmount();
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setScrollPosition(scrollRef.current.scrollLeft + scrollAmount);
    }
  };

  useEffect(() => {
    const handleScrollEvent = () => {
      if (scrollRef.current) {
        setScrollPosition(scrollRef.current.scrollLeft);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScrollEvent);
      return () =>
        scrollElement.removeEventListener("scroll", handleScrollEvent);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (scrollRef.current) {
        setScrollPosition(scrollRef.current.scrollLeft);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isAtStart = scrollPosition <= 0;
  const isAtEnd = scrollRef.current
    ? scrollPosition >=
      scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 5
    : false;

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" color="text.primary" sx={{ mb: 2, pl: 1 }}>
        {title}
      </Typography>
      <Box sx={{ position: "relative" }}>
        {!isMobile && (
          <IconButton
            onClick={() => handleScroll("left")}
            disabled={isAtStart}
            sx={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 1,
              color: "white",
              bgcolor: isAtStart ? "rgba(100,100,100,0.5)" : "rgba(0,0,0,0.5)",
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.7)",
              },
              width: 40,
              height: 40,
            }}
          >
            <ArrowBackIosIcon sx={{ color: "white" }} />
          </IconButton>
        )}
        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            overflowX: "auto",
            scrollBehavior: "smooth",
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            pb: 1,
          }}
        >
          <Grid container spacing={2} sx={{ flexWrap: "nowrap", p: 1 }}>
            {movies.map((movie) => (
              <Grid
                item
                key={movie.id}
                xs={12}
                sm={4}
                md={3}
                sx={{
                  minWidth: isMobile ? "100%" : isTablet ? "33.33%" : "25%",
                  maxWidth: isMobile ? "100%" : isTablet ? "33.33%" : "25%",
                  flexShrink: 0,
                }}
              >
                <Card
                  component={Link}
                  to={`/movie/${movie.id}`}
                  sx={{
                    bgcolor: "background.paper",
                    borderRadius: 1,
                    overflow: "hidden",
                    textDecoration: "none",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0 8px 16px rgba(0,0,0,0.4)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height={isMobile ? "450" : "300"}
                    image={movie.poster_url || alterImage}
                    alt={movie.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <Box
                    sx={{
                      p: 1.5,
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant={isMobile ? "body1" : "body2"}
                      color="text.primary"
                      sx={{
                        fontWeight: "medium",
                        mb: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {movie.title}
                    </Typography>
                    <Box
                      sx={{ display: "flex", alignItems: "center", mt: "auto" }}
                    >
                      <StarIcon
                        sx={{
                          color: "#FFC107",
                          fontSize: isMobile ? 20 : 16,
                          mr: 0.5,
                        }}
                      />
                      <Typography
                        variant={isMobile ? "body2" : "caption"}
                        color="text.secondary"
                      >
                        {movie.rating}/10
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        {!isMobile && (
          <IconButton
            onClick={() => handleScroll("right")}
            disabled={isAtEnd}
            sx={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 1,
              color: "white",
              bgcolor: isAtEnd ? "rgba(100,100,100,0.5)" : "rgba(0,0,0,0.5)",
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.7)",
              },
              width: 40,
              height: 40,
            }}
          >
            <ArrowForwardIosIcon sx={{ color: "white" }} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default Carousel;
