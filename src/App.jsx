
import { useContext, useEffect, useState } from "react"
import { MovieDetail } from "./pages/MovieDetail"
import Tasks from "./pages/Tasks"
import { Home } from "./pages/Cinema"
import { Weather } from "./pages/Weather"
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import { ThemeContext } from "./pages/ThemeContext"
import { useLocation } from "react-router-dom"
function App() {
  
  const {isDarkMode, ToggleTheme} = useContext(ThemeContext);
  const location = useLocation();
  const [lastId, setLastId] = useState(null);
  useEffect(() => {
    const saved = localStorage.getItem("lastWatched")
    if (saved) {
      setLastId(JSON.parse(saved).id)
    } else {
      setLastId(null);
    }
  }, [location])
  return (
    
    <BrowserRouter>
    <div className={isDarkMode ? "bg-slate-900 text-white min-h-screen transition colors duration-500" :  "min-h-screen bg-gray-100 text-black transition-colors duration-500"}>
      <nav className="bg-white shadow-lg mb-6 flex justify-center gap-8">
        <Link   to="/" className="text-gray-600 font-bold hover:text-purple-800 transition">
        Tasks
        </Link>
        <Link to="/weather"  className="text-gray-600 font-bold hover:text-blue-800 transition">Weather</Link>
        <Link 
  to={lastId ? `/movie/${lastId}` : "/movie"} 
  className="text-gray-600 font-bold hover:text-green-800 transition"
>
  Cinema
</Link>
</nav>
  
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/movie" element={<Home/>} />
        <Route path="/movie/:id" element={<MovieDetail />}/>
</Routes>


    </div>
    </BrowserRouter>
    
  )
  
}

export default App;