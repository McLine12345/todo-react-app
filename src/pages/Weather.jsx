import { useEffect, useState } from "react"
import { allCities } from "./Cities"
export function Weather() {

    const [city, setCity] = useState("Kyiv")
    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(false)
    const API_KEY = "5762c6a64bda6a2dd1aee744c2422e46"

   

    const fetchWeather = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=eng`)
            const data = await response.json()
            setWeather(data);
        } catch (error) {
            console.log("Error", error);
        }finally{
            setLoading(false)
            useEffect(() => {
        localStorage.setItem("my_tasks", JSON.stringify(city))
        console.log("Saved to Local Storage")
    }, [state])
        }
    }

    useEffect(() => {
        fetchWeather()
    }, [])

    return <div className="flex flex-col items-center p-8 bg-blue-50 rounded-3xl shadow-inner max-w-md mx-auto mt-10">
        <h2>
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
        <div className="text-center bg-white p-6 rounded-2xl shadow-lg w-full">
        {console.log(weather)}
        <h3 className="text-4xl font-black text-gray-800">{weather.main.temp} °C</h3>
        </div>
    ) : (
        <p>Can't find the city</p>
    )}


    </div>

   
}