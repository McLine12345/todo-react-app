import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export function MovieDetail() {
    const {id} = useParams();
    const [movie, setMovie] = useState(null);
    const API_KEY = "233838ce34f617364018d2c70d0ea24e";
    const navigate = useNavigate()
    const goBack = () => {
        localStorage.removeItem("lastWatched")
        navigate("/movie")
    }

   useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=eng-ENG`)
        .then(res => res.json())
        .then(data => {
            setMovie(data);
            localStorage.setItem("lastWatched", JSON.stringify(data));
        }); 
    }, [id]);

    if (!movie) return <h2 className="text-white text-center mt-10">Loading</h2>

    return (
        <div className="max-w-4xl mx-auto p-10 bg-white">
             <button 
             onClick={()=> goBack()}
             className="text-black font-bold flex mb-10 rounded-lg bg-yellow-500 p-2 transition-all duration-500 hover:scale-105 hover:bg-yellow-300 action:scale-95">Go back</button>
            <div className="flex gap-10">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="w-80 rounded-2xl shadow-2xl"
                />
                <div>
                    <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
                    <p className="text-black italic mb-6">{movie.tagline}</p>
                    <p className="text-lg leading-relaxed text-black ">{movie.overview}</p>
                    <div className="mt-6">
                        <span className="bg-yellow-500 text-black px-3 py-1 rounded-full font-bold">
                            Rating: {movie.vote_average.toFixed(1)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}