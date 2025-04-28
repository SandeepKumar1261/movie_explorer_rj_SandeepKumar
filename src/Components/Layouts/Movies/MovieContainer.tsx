import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchMovies } from "../../../Services/Api.js";
import alterImage from "../../../assets/FightClub.jpeg";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Pagination,
  PaginationItem,
  Container,
} from "@mui/material";

const itemsPerPage = 8;

const MovieContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesData, setMoviesData] = useState<any[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies();
      setMoviesData(data);
    };

    getMovies();
  }, []);

  const totalPages = Math.ceil(moviesData.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentMovies = moviesData.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <Box sx={{ width: "100%", p: 4, bgcolor: "#0C0F14" }}>
      <Typography
        variant="h5"
        component="h5"
        fontWeight="bold"
        mb={2}
        color="white"
        align="left"
        sx={{
          marginLeft: { xs: 1, sm: 5.3, md: 4, lg: 6 },
        }}
      >
        Movies
      </Typography>

      <Container maxWidth={false} disableGutters sx={{ px: 0 }}>
        <Grid container spacing={3} justifyContent="flex-start">
          {currentMovies.map((movie) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={movie.id}
              sx={{  ml: { xs: 1, sm: 6, md: 4, lg: 6 },}}
            >
              <Card
                component={Link}
                to={`/movie/${movie.id}`}
                sx={{
                  height: "100%",
                  width: "100",
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                  borderRadius: 1,
                  overflow: "hidden",
                  "&:hover": {
                    transform: "scale(1.02)",
                    transition: "transform 0.3s ease",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="400"
                  image={movie.poster_url ? movie.poster_url : alterImage}
                  alt={movie.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ bgcolor: "white", p: 2 }}>
                  <Typography variant="h6" component="h2">
                    {movie.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          color="primary"
          renderItem={(item) => (
            <PaginationItem
              {...item}
              sx={{
                bgcolor: item.selected ? "primary.main" : "grey.200",
                color: item.selected ? "white" : "text.primary",
                "&:hover": {
                  bgcolor: item.selected ? "primary.main" : "grey.300",
                },
              }}
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default MovieContainer;
