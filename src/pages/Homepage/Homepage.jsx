import React, {useEffect, useState} from 'react'
import './Homepage.css'
import axios from 'axios'
import CharacterCard from '../../components/CharacterCard/CharacterCard'

function Homepage() {
    // Create state to hold the Characters 
    const [characters, setCharacters] = useState([])
    // This page should show all the characters when it loads
    // Create useEffect for this 
    // https://rickandmortyapi.com/api/character
    useEffect(
        ()=>{
            //console.log("homepage-loaded")
            // Make API call to get All Characters
            axios.get(`https://rickandmortyapi.com/api/character`)
            .then(res => {
                console.log(res.data.results)
                // I have the character data where do I store it 
                // Store it in State
                setCharacters(res.data.results)
            })
            .catch(err => console.log(err))

        }, [] // Means it runs only once when the page loads
    )

  return (
    <div className='home-container'>
        <h1>Main Characters</h1>
        <div className='characters-container'>
            {
                characters.map(item => < CharacterCard character={item}
                    key={item.id} />)


                // characters.map(item => <p key={item.id}>{item.name}</p>)
            }
        </div>
    </div>
  )
}

export default Homepage