import { useEffect, useState } from "react"
import { allCities } from "./Cities"
import { useContext } from "react"
import { ThemeContext } from "./ThemeContext"

export function Weather() {

    const {isDarkMode, ToggleTheme} = useContext(ThemeContext)
    const [city, setCity] = useState(() => {
        return localStorage.getItem("last_city") || "Kyiv"
    })
    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(false)
    const API_KEY = "5762c6a64bda6a2dd1aee744c2422e46"
    
   

    const fetchWeather = async () => { 
        if (!city) return;
        setLoading(true);
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=eng`)
            const data = await response.json()
            if (data.cod === 200) {
                setWeather(data);
                localStorage.setItem("last_city", city)

            
            } else { 
                setWeather(data)
            }

        } catch (error) {
            console.log("Error", error);
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchWeather()
    }, [])

    return <div className={`flex flex-col items-center p-8 rounded-3xl shadow-inner max-w-md mx-auto mt-10 transition-colors duration-500 ${
    isDarkMode ? "bg-gray-700 text-white" : "bg-blue-50 text-black"}`}>
        <h2 className={isDarkMode ? "!text-white" : "!text-black"}>
            Weather Broadcast
        </h2> 
        <div>
    <input 
    className="px-4 py-2 m-5 rounded-lg border focus:outline-blue-400"
        type="text"
        list="citiesList"
        value={city}
        onChange={(e)=> setCity(e.target.value)}
        placeholder="Enter City name"
    />

    <datalist id="citiesList">
        {allCities.map((c, index) => ( <option key={index} value ={c} /> ))} 
    </datalist>

    


    
    <button className="bg-gray-500 rounded-lg transform-all duration-300 p-2 px-3 text-white hover:scale-105 hover:bg-gray-700 active:scale-95"
    onClick={fetchWeather}>
        Search
    </button>
    </div>

    {loading ? (
        <p>Loading...</p>
    ) : weather && weather.main ? (
        (city == "Moscow") ? <h3 className="bg-red-500 text-white px-5">
            This place should not exist
        </h3> : 
        <div className={`items-center flex text-center p-6 rounded-2xl shadow-lg w-full ${isDarkMode ? "bg-gray-500" : "bg-white"}`}>
        {console.log(weather)}
        <h3 className={`text-4xl font-black ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>{weather.main.temp} °C</h3>
        <img src ={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
        alt="weather status"
        className="w-32 h-32 "
        
        ></img>
<div className={isDarkMode ? "bg-slate-900 text-white" : "bg-blue-50 text-black"}>
        <button onClick={ToggleTheme}>
            {isDarkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
    </div>
        
        </div>
    ) : (
        <p>Can't find the city</p>
    )}


    </div>

   
}