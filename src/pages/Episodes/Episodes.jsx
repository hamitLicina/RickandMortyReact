import React, { useEffect, useState, useContext } from 'react'
import './Episodes.css'
import axios from 'axios'
import CharacterCard from '../../components/CharacterCard/CharacterCard'
import { ThemeContext } from '../../contexts/ThemeContext'

function Episodes() {
  // Change to use global state
  // NOTE {} Not []
  const { darkMode, setDarkMode } = useContext(ThemeContext)

  // When the user chooses an episodes number, the page shows the infos and characters about that episode

  // Create state to hold the option numbers
  const [options, setOptions] = useState([])
  // Create state to hold selected option
  const [selectedOption, setSelectedOption] = useState(1)
  // Create state for episode data 
  const [selectedEpisode, setSelectedEpisode] = useState('')
  // Create state for the characters
  const [characterList, setCharacterList] = useState([])

  // I need to know and find out how many episodes there are in order to build dropdown element

  // https://rickandmortyapi.com/api/episode

  useEffect(
    () => {
      //  Make Api call to find out number of episodes
      axios.get(`https://rickandmortyapi.com/api/episode`)
        .then(res => {
          // console.log(res.data.info.count)
          // I need to create an array with [1, 2, 3, ..., 51]
          const nums = []
          for (let i = 1; i <= res.data.info.count; i++) {
            nums.push(i)
          }
          // console.log(nums)
          // Store in state
          setOptions(nums)
        })
        .catch(err => console.log(err))

    }, [] // That runs one time when the page loads
  )

  const handleSelectChange = (e) => {
    // console.log(e.target.value)
    // Store this value in state
    setSelectedOption(e.target.value)
    // I could call the function here to get data from api
  }

  useEffect(
    () => {
      // console.log('You selected', selectedOption)
      // Call function to get data from api
      fetchEpisodeData()
    }, [selectedOption] // This means runs anytime this stage changes
  )

  // https://rickandmortyapi.com/api/episode/28

  const fetchEpisodeData = async () => {
    console.log('fetch data')
    try {
      // We need to make api call for this episode
      const res = await axios.get(`https://rickandmortyapi.com/api/episode/${selectedOption}`)
      // console.log(res.data)
      // This is my episode data, need to store it in state
      setSelectedEpisode(res.data)
      // Now I need to make api calls for all the characters 
      // console.log(res.data.characters)
      // Gather the data from all these api calls to show the cards 
      const episodeCharacters = await Promise.all(
        res.data.characters.map(url => {
          return axios.get(url).then(res => res.data)
        })
      )
      console.log(episodeCharacters)
      // Store this in state
      setCharacterList(episodeCharacters)
    }
    catch {
      console.log(err)
    }
  }

  return (
    <div className={darkMode ? 'episodes-container episodes-dark' : 'episodes-container'}>
      <div>
        <label htmlFor='select-episode'>Select an Episode</label>
        <select id='select-episode' onChange={handleSelectChange}>
          {
            options.map(num => <option key={num} value={num}>{`Episode ${num}`}</option>)
          }
        </select>
      </div>
      <div>
        <div className='episode-info'>
          <p>Episode Name: {selectedEpisode?.name} </p>
          <p>Air Date: {selectedEpisode?.air_date} </p>

        </div>
        <div className='character-container'>
          {
            characterList.map(item => <CharacterCard character={item}
              key={item.id} />)
          }
        </div>
      </div>

    </div>
  )
}

export default Episodes