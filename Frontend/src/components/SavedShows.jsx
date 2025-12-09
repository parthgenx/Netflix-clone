import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react'; // The "Close" icon
import axios from 'axios';

const SavedShows = () => {
  const [movies, setMovies] = useState([]);

  // 1. Fetch the list when the component loads
  useEffect(() => {
    const fetchSavedMovies = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/mylist', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMovies(response.data.likedMovies);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSavedMovies();
  }, []);

  // 2. Logic to Remove a movie
  const deleteShow = async (passedID) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/remove`,
        { movieId: passedID },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Update the UI immediately (remove the movie from the local list)
      setMovies((prev) => prev.filter((item) => item.id !== passedID));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className='text-white font-bold md:text-xl p-4'>My Shows</h2>
      <div className='relative flex items-center group'>
        <div className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
          {movies.map((item) => (
            <div key={item.id} className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
              <img
                className='w-full h-auto block'
                src={`https://image.tmdb.org/t/p/w500/${item.img}`}
                alt={item.title}
              />
              <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
                  {item.title}
                </p>
                
                {/* The Delete Button (X) */}
                <p onClick={() => deleteShow(item.id)} className='absolute text-gray-300 top-4 right-4'>
                  <X />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SavedShows;