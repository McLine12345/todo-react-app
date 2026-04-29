import { useEffect } from "react"
import { useState } from "react"

export function Home () {   

    const API_KEY = "233838ce34f617364018d2c70d0ea24e"
    const BASE_URL  = "https://api.themoviedb.org/3"
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = async () => { 
        try {
            const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ru-RU&page=1`)
            const data = await response.json()
            setList(data.results)
            return data.results
        } catch (error){
            console.log("ERROR BRAH", error)
        } finally { 
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchData() 
    }, [])
    return (
        <div>
            <h1 className="!text-white">Movie list</h1>
           { loading ? (
            <h2>Loading movies...</h2>
           ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
                {list.map((movie) => (
                       <div
                       key={movie.id}
                       className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 duration-300"
                       >
                        <img 
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                        alt={movie.title} 
                        className="w-full h-[100px] object-cover"
                        />
                        <div> 
                            <h3 className="text-sm font-semibold text-white line-clamp-1">{movie.title}</h3>
                        </div>
                        <div className="flex items-center mt-2">
                    <span className="!text-yellow-400 mr-1">★</span>
                    <span className="!text-yellow-300 text-xs">{movie.vote_average}</span>
                </div>
                       </div>
                ))}
            </div>
           )}
        </div>
    )
} 