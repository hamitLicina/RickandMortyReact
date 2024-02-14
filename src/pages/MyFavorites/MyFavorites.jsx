import React, { useContext } from 'react'
import './MyFavorites.css'
import { FavoritesContext } from '../../contexts/FavoritesContext'
import CharacterCard from '../../components/CharacterCard/CharacterCard'
import { ThemeContext } from '../../contexts/ThemeContext'

function MyFavorites() {
  // Change to use global state
  // NOTE {} Not []
  const { darkMode, setDarkMode } = useContext(ThemeContext)

  // I need access to global context
  // NOTE this going to be {} not []
  const { favorites } = useContext(FavoritesContext)

  return (
    <div className={darkMode ? 'favorites-container favorites-dark' : 'favorites-container'}>
      <h1>My Favorite Characters</h1>
      <div className='favorite-characters'>
        {
          favorites?.length > 0 ?
            favorites?.map(item => < CharacterCard character={item} key={item.id} />)
            :
            <p>You have not selected any favorites yet</p>
        }
      </div>
    </div>
  )
}

export default MyFavorites