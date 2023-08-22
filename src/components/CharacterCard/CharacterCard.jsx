import React from 'react'
import './CharacterCard.css'
import { Link } from 'react-router-dom'


function CharacterCard({character}) {
  return (
    <div className='character-card'>
        <img src={character.image} />
        <p>{character.name}</p>
        <Link to={`/details/${character.id}`}>See Details</Link>
    </div>
  )
}

export default CharacterCard
