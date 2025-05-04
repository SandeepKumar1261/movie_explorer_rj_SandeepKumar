import axios from "axios";

const API_URL = "https://movie-explorer-ror-aalekh-2ewg.onrender.com/api/v1";


export const loginUser = async (email,password) => {
  const response = await axios.post(`https://movie-explorer-ror-varun.onrender.com/api/v1/login`, {
    email,
    password,
  });
  localStorage.setItem("user", JSON.stringify(response.data.user));
  return response.data;
};
export const signupUser = async ( user) => {
  const response = await axios.post(`https://movie-explorer-ror-varun.onrender.com/api/v1/signup`, { user });
  return response.data;
};

export const fetchMovies = async () => {
  const response = await axios.get(`https://movie-explorer-ror-varun.onrender.com/api/v1/movies`);
  return response.data.movies;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await fetch(`https://movie-explorer-ror-varun.onrender.com/api/v1/movies/${movieId}`);
  const data = await response.json();
  localStorage.setItem("genre",data.genre);
  return data;
};

export const fetchMoviesAll = async (page: number = 1) => {
  try {
    console.log(`Making API call to ${API_URL}/movies?page=${page}`);
    const response = await axios.get(`https://movie-explorer-ror-varun.onrender.com/api/v1/movies`, {
      params: { page },
    });
    console.log("API response:", response.data);
    return {
      movies: response.data.movies,
      pagination: response.data.meta,
    };
  } catch (error: any) {
    console.error("API error:", error.message);
    throw error;
  }
};
