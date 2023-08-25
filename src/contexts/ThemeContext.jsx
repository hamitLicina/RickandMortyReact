import { useState, createContext, useEffect } from 'react'

// First I need to create this context "thing"
export const ThemeContext = createContext()

export default function ThemeContextProvider(props){
    
    // I need to create my Global state in here !!!
    const [darkMode, setDarkMode] = useState(false)

    // Set up useEffect to run when component loads to check localStorage
    useEffect(
        () => {
            // We need to get the value from localStorage
            const storedDarkMode = localStorage.getItem('darkMode')
            console.log(storedDarkMode)
            // We need to check if something was there 
            if (storedDarkMode) {
                // use this value for state
                setDarkMode(JSON.parse(storedDarkMode))
            }
        }, []
    )

    // Set up useEffect to run anytime darkMode changes 
    useEffect(
        () => {
            console.log('dark mode is now', darkMode)
            // I need to save the value of darkMode to localStorage
            localStorage.setItem('darkMode', JSON.stringify(darkMode))
        }, [darkMode]  // This runs whenever the stage changes
    )

    return(
        <ThemeContext.Provider value={{darkMode, setDarkMode}} >
            {props.children}
        </ThemeContext.Provider>
    )
}