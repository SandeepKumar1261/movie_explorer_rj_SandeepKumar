import React, { useState, useEffect } from "react";
import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";
import MovieDetails from "../Components/Layouts/Movie/Moviedetails";
import HomeCarousel from "../Components/Layouts/Home/HomeCarousel";
import { fetchMovieDetails, fetchMoviesAll } from "../Utils/Api";
import { Box, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: number;
  release_year: number | string;
  director: string;
  description?: string;
  poster_url?: string;
  banner_url?: string;
  duration?: number;
  premium?: boolean;
}

const Moviedetails = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [relatedMovies, setRelatedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const movieData: Movie = await fetchMovieDetails(movieId);

        let allMovies: Movie[] = [];
        let page = 1;
        let totalPages = Infinity;
        while (allMovies.length < 10 && page <= totalPages) {
          const {
            movies,
            pagination,
          }: { movies: Movie[]; pagination: { totalPages: number } } =
            await fetchMoviesAll(page);
          allMovies = [...allMovies, ...movies];
          totalPages = pagination.totalPages;
          page++;
        }

        const genres =
          movieData.genre
            ?.toLowerCase()
            .split(",")
            .map((g) => g.trim()) || [];
        const filtered = allMovies
          .filter((movie) =>
            genres.some((g) => movie.genre.toLowerCase().includes(g))
          )
          .slice(0, 10);

        setMovie(movieData);
        setRelatedMovies(filtered);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [movieId]);

  return (
    <>
      <Navbar />
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "40vh",
            bgcolor: "black",
            color: "white",
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <>
          <MovieDetails movie={movie} />
          <HomeCarousel genre="Related Movies" movies={relatedMovies} />
        </>
      )}
      <Footer />
    </>
  );
};

export default Moviedetails;
