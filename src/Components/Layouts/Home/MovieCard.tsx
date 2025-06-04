import React, { useState } from "react";
import {
  Card,
  CardMedia,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Movie, MovieCardProps } from "../../../types/Moviecard";

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  isSupervisor,
  cardWidth,
  isXsScreen,
  onCardClick,
  onEditClick,
  onDeleteClick,
}) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    if (isXsScreen) {
      // On mobile, toggle overlay instead of navigating
      setIsOverlayVisible(!isOverlayVisible);
      e.stopPropagation();
    } else {
      // On desktop, trigger navigation
      onCardClick(movie.id, movie.premium);
    }
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        width: cardWidth,
        bgcolor: "#2b2b2b",
        color: "#fff",
        borderRadius: 2,
        overflow: "hidden",
        flexShrink: 0,
        cursor: "pointer",
        position: "relative",
        "&:hover .hover-overlay": {
          opacity: isXsScreen ? 0 : 1, // Disable hover on mobile
        },
      }}
    >
      {isSupervisor && (
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 2,
            display: "flex",
            gap: 1,
          }}
        >
          <IconButton
            size="small"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onEditClick(movie);
            }}
            sx={{
              bgcolor: "rgba(0,0,0,0.7)",
              color: "#fff",
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.9)",
                color: "#00bcd4",
              },
              width: isXsScreen ? 28 : 32,
              height: isXsScreen ? 28 : 32,
            }}
          >
            <EditIcon sx={{ fontSize: isXsScreen ? 16 : 18 }} />
          </IconButton>
          <IconButton
            size="small"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onDeleteClick(e, movie.id);
            }}
            sx={{
              bgcolor: "rgba(0,0,0,0.7)",
              color: "red",
              width: isXsScreen ? 28 : 32,
              height: isXsScreen ? 28 : 32,
            }}
          >
            <DeleteIcon sx={{ fontSize: isXsScreen ? 16 : 18 }} />
          </IconButton>
        </Box>
      )}

      {movie.premium && (
        <Box
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 1,
            bgcolor: "rgba(0,0,0,0.6)",
            borderRadius: "50%",
            p: 0.8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <WorkspacePremiumIcon
            sx={{
              color: "#FFD700",
              fontSize: isXsScreen ? 18 : 24,
            }}
          />
        </Box>
      )}

      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height={isXsScreen ? 240 : 300}
          image={
            movie.poster_url ||
            "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.title || "Movie poster"}
          sx={{ height: isXsScreen ? 240 : 300, objectFit: "cover" }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 10,
            left: 10,
            zIndex: 1,
            bgcolor: "rgba(0,0,0,0.6)",
            borderRadius: 1,
            p: 0.5,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" sx={{ color: "#fff" }}>
            {movie.rating}/10
          </Typography>
          <StarIcon
            sx={{ color: "#FFD700", fontSize: isXsScreen ? 16 : 18, ml: 0.5 }}
          />
        </Box>

        {/* Overlay for both hover (desktop) and tap (mobile) */}
        <Box
          className="hover-overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.8)",
            opacity: (isOverlayVisible ? 1 : 0),

            // opacity: isXsScreen ? (isOverlayVisible ? 1 : 0) : 0,
            transition: "opacity 0.3s ease",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: isXsScreen ? 1 : 2,
            zIndex: 1,
            overflow: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          <Typography
            variant={isXsScreen ? "subtitle2" : "subtitle1"}
            sx={{ fontWeight: "bold", mb: isXsScreen ? 0.5 : 1, textAlign: "center" }}
          >
            {movie.title}
          </Typography>
          <Typography variant="body2" sx={{ mb: isXsScreen ? 0.3 : 0.5 }}>
            Released Year: {movie.release_year}
          </Typography>
          <Typography variant="body2" sx={{ mb: isXsScreen ? 0.3 : 0.5 }}>
            Director: {movie.director}
          </Typography>
          <Typography variant="body2" sx={{ mb: isXsScreen ? 0.3 : 0.5 }}>
            Duration: {movie.duration || "N/A"}
          </Typography>
          <Typography variant="body2" sx={{ mb: isXsScreen ? 0.3 : 0.5 }}>
            Genre: {movie.genre || "N/A"}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2">{movie.rating}/10</Typography>
            <StarIcon sx={{ color: "#FFD700", fontSize: isXsScreen ? 14 : 16, ml: 0.5 }} />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default MovieCard;