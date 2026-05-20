import { useEffect, useEffectEvent } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useSearchParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
export function Home () {   

    const API_KEY = "233838ce34f617364018d2c70d0ea24e"
    const BASE_URL  = "https://api.themoviedb.org/3"
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get("page")) || 1; 
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate()
    const [liked, setLiked] = useState(false)
    const [favors, setFavors] = useState(() => {
        const saved = localStorage.getItem("favorites");
        return saved ? JSON.parse(saved) : [];
    });

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
        } catch (error){
            console.log("ERROR BRAH", error)
        } finally { 
            setLoading(false)
        }
    }
    const toggleLike = (movie, isLiked) => {
        let updated 
        if (isLiked) {
            updated = favors.filter(item => item.id !== movie.id)
        } else { 
            updated = [...favors, movie]            
        }
        localStorage.setItem("favorites", JSON.stringify(updated))
        setFavors(updated)
        
    }

    const handlePageChange = (newPage) => {
        const params = {page: newPage}
        if (searchTerm) {
            params.query = searchTerm
        }
        setSearchParams(params);
    }
    useEffect(() => {
        if (searchTerm) {
            localStorage.setItem("lastSearch", searchTerm)
            
        }else { 
            localStorage.removeItem("lastSearch")
        }
    }, [searchTerm])
    useEffect(()=> {
        const savedSearch = localStorage.getItem("lastSearch");
        if (savedSearch && !searchTerm) {
            setSearchTerm(savedSearch)
        }
    }, [])

    useEffect(() => {
        const queryInUrl = searchParams.get("query");

        if (queryInUrl || searchTerm) {
            fetchSearch()
        }else {
            fetchData()
        }
        window.scrollTo(0, 0)
    }, [searchParams])
    return (
        <div>
        {/* Контейнер для навигации/поиска */}
        <div className="flex items-center justify-between mb-8 w-full">
            
            {/* 1. Пустой блок слева для идеального центрирования (баланс) */}
            <div className="w-1/4"></div>

            {/* 2. Центрированный поиск */}
            <div className="flex gap-2 justify-center w-2/4">
                <input
                    className="text-white p-2 rounded-lg text-black  max-w-md"
                    placeholder="Enter the movie..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    type="text"
                />
                <button
                    onClick={fetchSearch}
                    className="font-bold transition-all duration-300 hover:scale-105 hover:bg-gray-900 bg-gray-700 active:scale-95 rounded-lg p-2"
                >
                    Search
                </button>
            </div>

            {/* 3. Кнопка Favourites справа */}
            <div className="w-1/4 flex justify-end">
                <button 
                className="bg-yellow-500 font-bold  rounded-lg p-2 hover:bg-yellow-600 transition mr-10"
                onClick={()=> navigate("/favorites")}         >
                    Favorites
                </button>
            </div>
        </div>

        <h1 className="!text-white text-3xl font-bold mb-6">Movie list</h1>
           { loading ? (
            <h2>Loading movies...</h2>
           ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
                {list.map((movie) => {
                    const isLiked = favors ? favors.some(fav => fav.id === movie.id) : false;
                    
                    return (
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
                    <button onClick={()=>toggleLike(movie, isLiked)}
                    className="mx-10 transition-all hover:scale-105 active:scale-95">{isLiked ? `♥️` : `♡`}</button>
                </div>
                       </div>
)})}
            </div>
           )}
<div className="flex justify-center items-center gap-6 mt-10 mb-10">
                <button
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
                className="px-6 py-2 bg-purple-600 rounded-lg disabled:bg-gray-700 disabled cursor-not-allowed hover:bg-purple-700 transition"
                >Back</button>
                <span className="text-xl font-bold text-white">
                    Page {page}
                </span>
                <button 
                onClick={() => handlePageChange(page +   1)}
                className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
                >Forward</button>
            </div>

        </div>
    )
} 