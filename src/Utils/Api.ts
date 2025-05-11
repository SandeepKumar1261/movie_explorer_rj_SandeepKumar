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
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/movies/${movieId}`,
    {headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    }}
  );
  console.log(response);
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
  rating: number
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

interface ApiErrorResponse {
  message?: string;
}

export const sendTokenToBackend = async (token: string): Promise<any> => {
  try {
    // const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No user data found. User might not be logged in.");
    }
    if (!token) {
      throw new Error("No authentication token found in user data.");
    }

    console.log("Sending FCM token to backend:", token);
    console.log("Using auth token:", token);

    const response = await fetch(
      "https://movie-explorer-ror-varun.onrender.com/api/v1/update_device_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Bearer ${token}`,
        },
        body: JSON.stringify({ device_token: token }),
      }
    );

    if (!response.ok) {
      const errorData: ApiErrorResponse = await response
        .json()
        .catch(() => ({}));
      throw new Error(
        `Failed to send device token: ${response.status} ${
          response.statusText
        } - ${errorData.message || "Unknown error"}`
      );
    }

    const data = await response.json();
    console.log("Device token sent to backend successfully:", data);
    return data;
  } catch (error) {
    console.error("Error sending device token to backend:", error);
    throw error;
  }
};

export const toggleWishList = async (movie_id: number, token: string) => {
  const response = axios.post(
    `${API_URL}/movies/toggle_watchlist`,
    { movie_id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response);
  return response;
};

export const getWishlistMovies = async () => {
  let token = localStorage.getItem("token");
  const response = await axios.get(
    "https://movie-explorer-ror-varun.onrender.com/api/v1/movies/watchlist",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.movies;
};

export const updateProfileImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append("profile_picture", image);

    const token = localStorage.getItem("token");
    const response = await fetch(
      "https://movie-explorer-ror-varun.onrender.com/api/v1/update_profile_picture",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update profile image");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("in error");
    throw new Error(error.message);
  }
};
export const fetchUserDetails = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      "https://movie-explorer-ror-varun.onrender.com/api/v1/user",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user details");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};



interface Plan {
  id: string;
  name: string;
  price: string;
  features: string[];
  duration: string;
  popular?: boolean;
}

interface PaymentResponse {
  success: boolean;
  error?: string;
}


export const createSubscription = async (planType: string): Promise<string> => {
  try {
    // const token = localStorage.getItem("");
    const token="eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoidXNlciIsInN1YiI6IjUxIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNzQ2NzAwMzM5LCJleHAiOjE3NDY3MjE5MzksImp0aSI6IjFiNzM1NzI1LTI3MzktNGUxMi1hOWQxLTYzZmU4YjY0NGJmNiJ9.6IeaIejl1kS00pXapGBsDsPJF0yCbX8mbs77jqGCUOI";
    console.log("Retrieved token:", token);
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.post("https://movie-explorer-ror-aalekh-2ewg.onrender.com/api/v1/subscriptions",
      { plan_type: planType },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization:` Bearer ${token}`,
        },
      }
    );

    console.log('API Response:', response.data);

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    const checkoutUrl = response.data.checkoutUrl || response.data.data?.checkoutUrl || response.data.url;
    if (!checkoutUrl) {
      throw new Error('No checkout URL returned from server.');
    }

    return checkoutUrl;
  } catch (error: any) {
    console.error('Error creating subscription:', error);
    throw new Error(error.message || 'Failed to initiate subscription');
  }
};


export const getSubscriptionStatus = async (tokenn: string): Promise<SubscriptionStatus> => {
  try {
    const token="eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoidXNlciIsInN1YiI6IjUxIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNzQ2NzAwMzM5LCJleHAiOjE3NDY3MjE5MzksImp0aSI6IjFiNzM1NzI1LTI3MzktNGUxMi1hOWQxLTYzZmU4YjY0NGJmNiJ9.6IeaIejl1kS00pXapGBsDsPJF0yCbX8mbs77jqGCUOI";

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response: AxiosResponse<SubscriptionStatus | ApiError> = await axios.get("https://movie-explorer-ror-aalekh-2ewg.onrender.com/api/v1/subscriptions/status",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if ('error' in response.data) {
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (error) {
    console.error('Subscription Status Error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      response: axios.isAxiosError(error) ? error.response?.data : undefined,
      status: axios.isAxiosError(error) ? error.response?.status : undefined,
    });
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Failed to fetch subscription status');
    }
    throw new Error('An unexpected error occurred');
  }
};