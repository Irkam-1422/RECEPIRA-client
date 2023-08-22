import React from 'react'
import styles from '../../styles/Search.module.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:4000')
// const restaurants = [{
//   name: 'Bon Maman',
//   locatoin: 'Paris, Fracne',
//   creations: [{},{},{},{},{}],
//   jobs: [{},{},{}]
// },{
//   name: 'Bon Maman',
//   locatoin: 'Paris, Fracne',
//   creations: [{},{},{},{},{}],
//   jobs: [{},{},{}]
// },{
//   name: 'Bon Maman',
//   locatoin: 'Paris, Fracne',
//   creations: [{},{},{},{},{}],
//   jobs: [{},{},{}]
// },{
//   name: 'Bon Maman',
//   locatoin: 'Paris, Fracne',
//   creations: [{},{},{},{},{}],
//   jobs: [{},{},{}]
// },{
//   name: 'Bon Maman',
//   locatoin: 'Paris, Fracne',
//   creations: [{},{},{},{},{}],
//   jobs: [{},{},{}]
// }]

export const Restaurants = ({open, result}) => {

  const [restaurants,setRestaurants] = useState([])

  useEffect(() => {
    if (open) {
      socket.emit('getRestaurants')
      socket.on('showRestaurants', (restaurants) => {
        setRestaurants(restaurants)
      })
    }
  }, [])

  return (
    <div>
      {open && restaurants.map(restaurant => {
        return (
          <div className={styles.restWrap}>
            <div className={styles.restAvatar} style={ restaurant.avatar ? 
               {backgroundImage: `url(${require(`../../images/${restaurant.avatar}`)})`}
               : {backgroundImage: `url(${require(`../../images/restaurant.png`)})`} } 
               ></div>
            <Link to={`/account/:${restaurant._id.toString()}?type=restaurant`} className={styles.restA}>
            <div className={styles.restInfo}>
              <h3 className={styles.h3}>{restaurant.name}</h3>
              <p>{restaurant.locatoin}</p>
              <div className="">
                <button className={styles.sm}> {restaurant.creations.length} creations</button>
                <button className={styles.sm}>{restaurant.jobs.length} jobs</button>
              </div>
            </div>
            </Link>
            <button>+ Follow</button>
          </div>
        )  
      })}
      {!open && result.map(restaurant => {
        return (
          <div className={styles.restWrap}>
            <div className={styles.restAvatar}></div>
            <Link to={`/account/:${restaurant._id.toString()}?type=restaurant`} className={styles.restA}>
            <div className={styles.restInfo}>
              <h3 className={styles.h3}>{restaurant.name}</h3>
              <p>{restaurant.locatoin}</p>
              <div className="">
                <button className={styles.sm}> {restaurant.creations.length} creations</button>
                <button className={styles.sm}>{restaurant.jobs.length} jobs</button> 
              </div>
            </div>
            </Link>
            {/* <button>+ Follow</button> */}
          </div>
        )  
      })}
    </div>
  )
}
