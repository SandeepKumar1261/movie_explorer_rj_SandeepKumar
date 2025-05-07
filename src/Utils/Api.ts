import axios from "axios";
const API_URL = "https://movie-explorer-ror-varun.onrender.com/api/v1";
export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });
  localStorage.setItem("user", JSON.stringify(response.data.user));
  return response.data;
};
export const signupUser = async (user) => {
  const response = await axios.post(`${API_URL}/signup`, { user });
  return response.data;
};
export const fetchMovies = async () => {
  const response = await axios.get(`${API_URL}/movies`);
  return response.data.movies;
};
export const fetchMovieDetails = async (movieId) => {
  const response = await fetch(`${API_URL}/movies/${movieId}`);
  const data = await response.json();
  localStorage.setItem("genre", data.genre);
  return data;
};
export const fetchMoviesAll = async (page: number = 1) => {
  try {
    const response = await axios.get(`${API_URL}/movies`, {
      params: { page },
    });
    return {
      movies: response.data.movies,
      pagination: response.data.meta,
    };
  } catch (error: any) {
    throw error;
  }
};
export const fetchMoviesAlll = async (
  page: number,
  genre: string,
  search: string,
  rating:number,
) => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      genre,
      search,
      rating: rating.toString(),
    });
    const response = await fetch(`${API_URL}/movies?${params.toString()}`);
    return await response.json();
  } catch (err) {
    return null;
  }
};
export const addMovie = async (data: FormData) => {
  const token = localStorage.getItem("token");
  console.log(token);
  return axios.post(`${API_URL}/movies`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const deleteMovie = async (movieId: number) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No auth token found");
    }

    const response = await fetch(`${API_URL}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete movie (status ${response.status})`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updateMovie = (id: number, data: FormData) => {
  const token = localStorage.getItem("token");
  return axios.put(`${API_URL}/movies/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

interface UserData {
  token?: string;
}

interface ApiErrorResponse {
  message?: string;
}

export const sendTokenToBackend = async (token: string): Promise<any> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No user data found. User might not be logged in.');
    }

    // const user: UserData = JSON.parse(userData);
    // const authToken = user?.token;
    if (!token) {
      throw new Error('No authentication token found in user data.');
    }

    console.log('Sending FCM token to backend:', token);
    console.log('Using auth token:', token);

    const response = await fetch('https://movie-explorer-ror-aalekh-2ewg.onrender.com/api/v1/update_device_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':` Bearer ${token}`,
      },
      body: JSON.stringify({ device_token: token }),
    });

    if (!response.ok) {
      const errorData: ApiErrorResponse = await response.json().catch(() => ({}));
      throw new Error(`Failed to send device token: ${response.status} ${response.statusText} - ${errorData.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('Device token sent to backend successfully:', data);
    return data;
  } catch (error) {
    console.error('Error sending device token to backend:', error);
    throw error;
  }
};