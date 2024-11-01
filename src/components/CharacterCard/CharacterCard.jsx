import React, { useContext, useState, useEffect } from 'react'
import './CharacterCard.css'
import { Link } from 'react-router-dom'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FavoritesContext } from '../../contexts/FavoritesContext';



function CharacterCard({ character }) {
  // I need access to global context
  // NOTE this going to be {} not []
  const { addCharacter, favorites, removeCharacter } = useContext(FavoritesContext)

  // We are going to test create variable to test conditional rendering
  // const isFavorite = false;
  // Change to State
  const [isFavorite, setIsFavorite] = useState(false)

  // Create useEffect to run anytime favorites changes
  useEffect(
    () => {
      // console.log(favorites)
      // Is this character in favorites ?
      setIsFavorite(favorites?.find(item => item.id === character.id))
    }, [favorites]
  )

  return (
    <div className='character-card'>
      <img src={character.image} />
      <p>{character.name}</p>
      <Link to={`/details/${character.id}`}>See Details</Link>
      {
        isFavorite ?
          <FaHeart className='heart-icon' onClick={() => removeCharacter(character.id)} />
          :
          <FaRegHeart className='heart-icon' onClick={() => addCharacter(character)} />
      }
    </div>
  )
}

export default CharacterCard