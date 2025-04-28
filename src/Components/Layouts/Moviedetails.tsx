import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../Services/Api.js";
import alterImage from "../../assets/FightClub.jpeg";

const MovieDetails = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");

  useEffect(() => {
    const getMovieDetails = async () => {
      console.log(movieId);
      const data = await fetchMovieDetails(movieId);
      console.log(data);
      setMovie(data);
    };

    getMovieDetails();
  }, [movieId]);

  const handleRatingClick = (index: number) => {
    setRating(index + 1);
  };

  const handleReviewSubmit = () => {
    alert(`Thanks for rating ${rating} stars!\nYour review: ${review}`);
    setReview("");
    setRating(0);
  };

  if (!movie) return <div className="text-white p-4">Loading...</div>;

  return (
    <div className="p-4" style={{ backgroundColor: "#0C0F14" }}>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <img
            src={movie.poster_url || alterImage}
            alt={movie.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        <div className="w-full md:w-2/3 text-white">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <h2 className="text-xl text-gray-400 mt-2">
            Directed by: {movie.director || "Unknown"}
          </h2>

          <div className="flex flex-wrap gap-6 mt-4 text-gray-300">
            <p>
              <span className="font-semibold">Rating:</span>{" "}
              {movie.rating ? (
                <>
                  {movie.rating}/10 <span className="text-yellow-400">★</span>
                </>
              ) : (
                "N/A"
              )}
            </p>
            <p>
              <span className="font-semibold">Genre:</span>{" "}
              {movie.genre || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Year Released:</span>{" "}
              {movie.release_date
                ? new Date(movie.release_date).getFullYear()
                : "N/A"}
            </p>
          </div>

          <p className="mt-4">{movie.description}</p>

          <div className="mt-4">
            <p>
              <span className="font-semibold">Release Date:</span>{" "}
              {movie.release_date || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Duration:</span>{" "}
              {movie.duration || "N/A"}
            </p>
          </div>

          <div className="flex gap-4 mt-6">
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold">
              Add to Wishlist
            </button>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl mb-2">Customer Feedback</h2>

            <div className="flex gap-1 text-yellow-400 text-2xl mb-4">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className="cursor-pointer"
                  onClick={() => handleRatingClick(index)}
                >
                  {index < rating ? "★" : "☆"}
                </span>
              ))}
            </div>

            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review..."
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white"
              rows={4}
            />

            <button
              onClick={handleReviewSubmit}
              className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 rounded text-white font-semibold"
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
