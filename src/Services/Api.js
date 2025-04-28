import axios from "axios";

const API_URL = "https://movie-explorer-ror-varun-1.onrender.com/api/v1";

export const loginUser = async (email,password) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });
  return response.data;
};
export const signupUser = async ( user) => {
  const response = await axios.post(`${API_URL}/signup`, { user });
  return response.data;
};

export const fetchMovies = async () => {
  const response = await axios.get(`${API_URL}/movies`);
  return response.data;
};
export const fetchMovieDetails = async (movieId) => {
  const response = await fetch(`${API_URL}/movies/${movieId}`);
  const data = await response.json();
  return data;
};
