import React, { useState } from 'react'
import styles from '../styles/Search.module.css'
import { Categories } from './search/Categories'
import { People } from './search/People'
import { Jobs } from './search/Jobs'
import { Restaurants } from './search/Restaurants'
import { useEffect } from 'react'
//import io from 'socket.io-client'

//const socket = io.connect('http://localhost:4000')

export const Search = ({socket, userId}) => {

  const [search,setSearch] = useState('Posts')
  const [searcher,setSearcher] = useState('Search by name...')
  const [searchbar,setSearchbar] = useState(false)
  const [request,setRequest] = useState('')
  const [open,setOpen] = useState(true)
  const [result,setResult] = useState([])
  const [resultPosts,setResultPosts] = useState([])

  const handleClick = (e) => {
    setSearch(e.target.innerHTML)
    e.target.innerHTM == 'Posts' ? setSearcher('name')
    : e.target.innerHTM == 'People' ? setSearcher('name')
    : e.target.innerHTM == 'Jobs' ? setSearcher('position')
    : e.target.innerHTM == 'Restaurants' ? setSearcher('name')
    : setSearcher('name')
  }

  const handleSearcherChange = (e) => {
    const str = e.target.innerHTML
    setSearcher(str.slice(10,str.length))
  }

  const handleChange = ({target: {value, name}}) => {
    setRequest(value)
  }

  const handleSearchRequest = () => {
    if (request !== '') {
      socket.emit('searchRequest', {searcher,request,search})
      setRequest('')
      setResultPosts([])
    }
    if (request == '') {
      setOpen(true)
      setResultPosts([])
    }
  }

  console.log(resultPosts);

  useEffect(() => {
    // search == 'Posts' ? setSearcher('name')
    // : search == 'People' ? setSearcher('name')
    // : search == 'Jobs' ? setSearcher('position')
    // : search == 'Restaurants' ? setSearcher('name')
    // : setSearcher('name')

    socket.on('showMyPosts', (creations) => {
      //console.log('showMyPosts', creations);
      setResultPosts(prev => [...prev, creations])
    })
    socket.on('showPosts', (result) => {
      setOpen(false)
      setResult(result)
      console.log('showPosts',result);
    })
    socket.on('showPeople', (result) => {
      setOpen(false)
      setResult(result)
      console.log('showPeople',result);

      console.log('getResultsPosts');
      result.forEach((user) => {
          console.log('getPosts for',user.name);
          socket.emit('getPosts', user._id.toString())
      })
    })
    socket.on('showJobs', (result) => {
      setOpen(false)
      setResult(result)
      console.log('showJobs',result);
    })
    socket.on('showRestaurants', (result) => {
      setOpen(false)
      setResult(result)
      console.log('showRestaurants',result);
    })
  },[])

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.menu}>
          <button onClick={handleClick} className={styles.serachCategory}>Posts</button>
          <button onClick={handleClick} className={styles.serachCategory}>People</button>
          <button onClick={handleClick} className={styles.serachCategory}>Jobs</button>
          <button onClick={handleClick} className={styles.serachCategory}>Restaurants</button>
        </div>
        <div className={styles.searchbar} 
             onMouseEnter={() => setSearchbar(true)}
             onMouseLeave={() => setSearchbar(false)}
             >
          <div className={styles.inputDiv}>
            <input type="text"
                  name='request'
                  className={styles.searchInput}
                  value={request}
                  onChange={handleChange}
                  placeholder={`Search by ${searcher}...`}
                  style={{marginBottom: '0'}}
            />
            <button className={styles.searchBtn} onClick={handleSearchRequest}>Search</button>
          </div>
          {searchbar && <div id='searchbar' className={styles.searchbarBtns}>
            {search == 'Jobs' && <button className={styles.searchbarBtn} onClick={handleSearcherChange}>Search by position</button>}
            {search == 'Jobs' && <button className={styles.searchbarBtn} onClick={handleSearcherChange}>Search by restaurant</button>}
            {search == 'Jobs' && <button className={styles.searchbarBtn} onClick={handleSearcherChange}>Search by location</button>}
            {search == 'Restaurants' && <button className={styles.searchbarBtn} onClick={handleSearcherChange}>Search by location</button>}
            {search == 'Restaurants' && <button className={styles.searchbarBtn} onClick={handleSearcherChange}>Search by name</button>}
          </div>}
        </div>
      </header>
      {search == 'Posts' && <Categories open={open} result={result}/>}
      {search == 'People' && <People open={open} result={result} resultPosts={resultPosts}/>}
      {search == 'Jobs' && <Jobs open={open} result={result} userId={userId}/>}
      {search == 'Restaurants' && <Restaurants open={open} result={result}/>}
    </div>
  )
}
