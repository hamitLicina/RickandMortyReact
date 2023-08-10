import React from 'react'
import './Search.css'
import axios from 'axios';

function Search({setCharacters}) {
    // We need create state to hold user input 
    const [query, setQuery] = React.useState('');

    // 1 - I need to store user input in query
    // 2 - We need to know what events triggers the search
    // 3 - I have to figure out where will data come from
    // https://rickandmortyapi.com/api/character/?name=beth
    // 4 - store the data in characters (means need setCharacters as prop) 

    const handleSearch = (e) => {
        // This is to stop form refreshing
        e.preventDefault()
        console.log("search", query);
        // Make API call to get characters that match query
        axios.get(`https://rickandmortyapi.com/api/character/?name=${query}`)
        .then(res => {
            console.log(res.data.results)
            // I have the data, what do I do with it ?
            // I want to change the data in characters on Homepage
            setCharacters(res.data.results)
        })
        .catch(err => {
          console.log(err.response.status)
          // Create alert if not found
          if (err.response.status === 404) {
            alert(`No character named ${query}`)
          }
          else {
            console.log(err)
          }
        })

        // Clear the Textbox
        setQuery('')
    }

  return (
    <form className='search-container' onSubmit={handleSearch}>
        <input type='text' onChange={(e) => setQuery(e.target.value)}
        placeholder='Search all Characters' value={query} />
    </form>
  )
}

export default Search