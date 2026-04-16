
import Tasks from "./pages/Tasks"
import { Weather } from "./pages/Weather"
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
function App() {
  return (
    <BrowserRouter>
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg mb-6 flex justify-center gap-8">
        <Link   to="/" className="text-purple-600 font-bold hover:text-purple-800 transition">
        Tasks
        </Link>
        <Link to="/weather"  className="text-blue-600 font-bold hover:text-blue-800 transition">Weather</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/weather" element={<Weather />} />
</Routes>


    </div>
    </BrowserRouter>
    
  )
}

export default App;