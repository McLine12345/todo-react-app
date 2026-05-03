import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useSearchParams } from "react-router-dom"
export function Home () {   

    const API_KEY = "233838ce34f617364018d2c70d0ea24e"
    const BASE_URL  = "https://api.themoviedb.org/3"
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get("page")) || 1;
    const [searchTerm, setSearchTerm] = useState("")

    const fetchSearch = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}&language=eng-ENG&page=${page}`);
            const data = await response.json();
            setList(data.results);
        } catch (error) { 
            console.log("ERROR BRATISHKA", error);
        } finally {
            setLoading(false)
        }
    }

    const fetchData = async () => { 
        setLoading(true)
        try {
            const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=eng-ENG&page=${page}`)
            const data = await response.json()
            setList(data.results)
            setPage(page)
            localStorage.setItem("page", page)
        } catch (error){
            console.log("ERROR BRAH", error)
        } finally { 
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchData() 
        localStorage.setItem("page", page)
        window.scrollTo(0, 0)
    }, [page])
    return (
        <div>
            <input
            className=""
            placeholder="Enter the movie..."
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            type="text"
            />
            <button
            onClick={fetchSearch}
            className="font -bold transition-all duration-300 hover:scale-105 hover:bg-gray-900 bg-gray-700 active:scale-95 rounded-lg p-2"
            >Search</button>
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
                        <Link to={`/movie/${movie.id}`}>
                        <img 
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                        alt={movie.title} 
                        className="w-full h-[100px] object-cover"
                        />
                        </Link>
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
<div className="flex justify-center items-center gap-6 mt-10 mb-10">
                <button
                disabled={page === 1}
                onClick={() => setPage(prev => prev - 1 )}
                className="px-6 py-2 bg-purple-600 rounded-lg disabled:bg-gray-700 disabled cursor-not-allowed hover:bg-purple-700 transition"
                >Back</button>
                <span className="text-xl font-bold text-white">
                    Page {page}
                </span>
                <button 
                onClick={() => setPage(prev => prev + 1)}
                className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
                >Forward</button>
            </div>

        </div>
    )
} 