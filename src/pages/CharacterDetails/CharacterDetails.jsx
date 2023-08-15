import React, {useEffect} from 'react'
import './CharacterDetails.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'


function CharacterDetails() {
    // This page shows details of a specific character
    // When the page loads
    // How do I know which character ?
    // The id is in the Url 
    // Extract the id with useParams hook
    const{characterId} = useParams()

    // Create state to hold character details
    const [character, setCharacter] = React.useState('')

    // https://rickandmortyapi.com/api/character/12
    // We need to set up useEffect to run when the page loads
    useEffect(
        () => {
            console.log('get data for id', characterId)
            // I need to make api call to get the data for this character 
            axios.get(`https://rickandmortyapi.com/api/character/${characterId}`)
            .then(res => {
                console.log(res.data)
                // I have the data for this character, where do I have to store it ?
                // Store in State

                setCharacter(res.data)

            })
            .catch(err => console.log(err))

        }, [] // Runs only once when the page loads.
    )


  return (
    <div className='details-container'>
        <img src={character?.image} />
        <div className='container-info'>
            <p>Name: {character?.name} </p>
            <p>Gender: {character?.gender} </p>
            <p>Location: {character?.location?.name} </p>
            <p>Species: {character?.species} </p>
        </div>
    </div>
  )
}

export default CharacterDetails