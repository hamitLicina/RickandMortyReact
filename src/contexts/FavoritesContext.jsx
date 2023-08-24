import { useState, createContext, useEffect } from 'react'


// First I need to create this context "thing"
export const FavoritesContext = createContext()

export default function FavoritesContextProvider(props){

      
    // I need to create my Global state in here !!!
    const [favorites, setFavorites] = useState([])


    // Set up useEffect to run when component loads to check localStorage
    useEffect(
        () => {

            // We need to get the value from localStorage
            const storedFavorites = localStorage.getItem('favoritesList')
            // console.log(storedFavorites)
            // We need to check if something was there 
            if (storedFavorites) {
                // use this value for state
                setFavorites(JSON.parse(storedFavorites))
            }
        }, []
    )

    // Set up useEffect to run anytime darkMode changes 
    useEffect(
        () => {
            
            // I need to save Favorites to localStorage
            localStorage.setItem('favoritesList', JSON.stringify(favorites))
        }, [favorites]
    )

    // NOTİCE Where I am (I am above the return) and need a function to add a character to favorites
    const addCharacter = (charToAdd) => {
        console.log('Adding', charToAdd)
        // I need to add this object to favorites state
        // Create new Array with all the old stuff and new object 
        let newFavorites = [...favorites, charToAdd]
        // Update my state to this
        setFavorites(newFavorites)
    }

    // We need to create or add a function to Remove a character
    const removeCharacter = (charId) => {
        console.log('removing', charId)
        // Keep all that are not this id 
        let newFavorites = favorites.filter(item => item.id != charId)
        // Then we need to update state to this
        setFavorites(newFavorites)

        
    }

    return(
        <FavoritesContext.Provider value={{addCharacter, favorites, removeCharacter}} >
            {props.children}
        </FavoritesContext.Provider>
    )
}