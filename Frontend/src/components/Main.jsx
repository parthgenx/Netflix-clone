import React, { useEffect, useState } from "react";
import requests from "../Requests";
import axios from "axios";

const Main = () => {
  const [movies, setMovies] = useState([]);

  // Pick a random movie
  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  // --- NEW: Function to Play Trailer ---
  const playTrailer = () => {
    if (movie?.title) {
      // Opens a new tab searching YouTube for "Movie Title + Trailer"
      // This is a smart "lazy" trick to avoid complex API calls for video IDs
      window.open(
        `https://www.youtube.com/results?search_query=${movie.title}+trailer`,
        "_blank"
      );
    }
  };

  // --- NEW: Function to Save Movie (Watch Later) ---
  const saveMovie = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to save movies!");
      return;
    }

    try {
      await axios.post(
        "https://netflix-backend-u33z.onrender.com/add",
        {
          id: movie.id,
          title: movie.title,
          img: movie.backdrop_path,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Movie saved to Watch Later!");
    } catch (error) {
      console.log(error);
      alert("Movie already in your list!");
    }
  };

  return (
    <div className="w-full h-[550px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">{movie?.title}</h1>

          <div className="my-4">
            {/* Attached the functions to onClick */}
            <button
              onClick={playTrailer}
              className="border bg-gray-300 text-black border-gray-300 py-2 px-5 hover:bg-gray-400 transition"
            >
              Play
            </button>
            <button
              onClick={saveMovie}
              className="border text-white border-gray-300 py-2 px-5 ml-4 hover:bg-gray-800 transition"
            >
              Watch Later
            </button>
          </div>

          <p className="text-gray-400 text-sm">
            Released: {movie?.release_date}
          </p>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
            {truncateString(movie?.overview, 150)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
