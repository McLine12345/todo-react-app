import { createContext, useState, useEffect} from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => { 
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    })

    const ToggleTheme = () => {
        setIsDarkMode(prev => !prev)
    }

    useEffect(() => {
        localStorage.setItem("theme", isDarkMode ? "dark" : "light")
    }, [isDarkMode])


    return (
        <ThemeContext.Provider value={{isDarkMode, ToggleTheme}}
 >
    {children}
 </ThemeContext.Provider>   )
}