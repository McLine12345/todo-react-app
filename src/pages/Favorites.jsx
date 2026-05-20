import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Favorites () {
const [movies, setMovies] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || []
  })

 return (
    // Добавляем сетку (grid), чтобы карточки стояли красиво в ряд
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6 p-10">
      {movies.map((movie) => {
        return (
          <div
            key={movie.id}
            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 duration-300"
          >
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-[300px] object-cover" // Сделал картинку повыше
              />
            </Link>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-white line-clamp-1">{movie.title}</h3>
              <div className="flex items-center mt-2">
                <span className="text-yellow-400 mr-1">★</span>
                <span className="text-yellow-300 text-xs">{movie.vote_average.toFixed(1)}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}