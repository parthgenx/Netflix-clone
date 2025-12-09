import React, { useEffect, useState } from "react";
import axios from "axios";
import { Heart } from "lucide-react";

const Row = ({ title, fetchURL, rowID }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);

  const saveMovie = async (item) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to save movies!");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/add",
        {
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Movie saved!");
    } catch (error) {
      console.log(error);
      alert("Movie already in your list!");
    }
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        <div
          id={"slider" + rowID}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item, id) => (
            <div
              key={id}
              className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
            >
              <img
                className="w-full h-auto block"
                src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
                alt={item?.title}
              />
              <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                  {item?.title}
                </p>

                {/* THE HEART ICON */}
                {/* NEW: Pass the whole 'item' object */}
                <p onClick={() => saveMovie(item)}>
                  <Heart className="absolute top-4 left-4 text-gray-300 hover:text-red-600" />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Row;
