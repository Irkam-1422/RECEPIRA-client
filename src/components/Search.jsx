import React, { useState } from 'react'
import styles from '../styles/Search.module.css'
import { Categories } from './search/Categories'
import { People } from './search/People'
import { Jobs } from './search/Jobs'
import { Restaurants } from './search/Restaurants'
import { useEffect } from 'react'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:4000')

export const Search = () => {

  const [search,setSearch] = useState('Posts')
  const [searcher,setSearcher] = useState('Search by name...')
  const [searchbar,setSearchbar] = useState(false)
  const [request,setRequest] = useState('')

  const handleClick = (e) => {
    setSearch(e.target.innerHTML)
  }

  const handleSearcherChange = (e) => {
    const str = e.target.innerHTML
    setSearcher(str.slice(10,str.length))
  }

  const handleChange = ({target: {value, name}}) => {
    setRequest(value)
  }

  const handleSearchRequest = () => {
    socket.emit('searchRequest', {searcher,request,search})
  }

  useEffect(() => {
    search == 'Posts' ? setSearcher('name')
    : search == 'People' ? setSearcher('name')
    : search == 'Jobs' ? setSearcher('position')
    : search == 'Restaurants' ? setSearcher('name')
    : setSearcher('name')
  },[])

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.menu}>
          <button onClick={handleClick}>Posts</button>
          <button onClick={handleClick}>People</button>
          <button onClick={handleClick}>Jobs</button>
          <button onClick={handleClick}>Restaurants</button>
        </div>
        <div className={styles.searchbar} onClick={() => setSearchbar(prev => !prev)}>
          <div className={styles.inputDiv}>
            <input type="text"
                  name='request'
                  value={request}
                  onChange={handleChange}
                  placeholder={`Search by ${searcher}...`}
                  style={{marginBottom: '0'}}
            />
            <button onClick={handleSearchRequest}>Search</button>
          </div>
          {searchbar && <div id='searchbar' className={styles.searchbar}>
            {search == 'Jobs' && <button onClick={handleSearcherChange}>Search by position</button>}
            {search == 'Jobs' && <button onClick={handleSearcherChange}>Search by restaurant</button>}
            {search == 'Jobs' && <button onClick={handleSearcherChange}>Search by location</button>}
            {search == 'Restaurants' && <button onClick={handleSearcherChange}>Search by location</button>}
            {search == 'Restaurants' && <button onClick={handleSearcherChange}>Search by name</button>}
          </div>}
        </div>
      </header>
      {search == 'Posts' && <Categories/>}
      {search == 'People' && <People/>}
      {search == 'Jobs' && <Jobs/>}
      {search == 'Restaurants' && <Restaurants/>}
    </div>
  )
}
