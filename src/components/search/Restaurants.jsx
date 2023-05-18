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

export const Restaurants = () => {

  const [restaurants,setRestaurants] = useState([])

  useEffect(() => {
    socket.emit('getRestaurants')
    socket.on('showRestaurants', (restaurants) => {
      setRestaurants(restaurants)
    })
  }, [])

  return (
    <div>
      {restaurants.map(restaurant => {
        return (
          <div className={styles.restWrap}>
            <div className={styles.restAvatar}></div>
            <div className={styles.restInfo}>
              <h3 className={styles.h3}>{restaurant.name}</h3>
              <p>{restaurant.locatoin}</p>
              <div className="">
                <button className={styles.restBtn}> {restaurant.creations.length} creations</button>
                <button className={styles.restBtn}>{restaurant.jobs.length} jobs</button>
              </div>
            </div>
            <button>+ Follow</button>
          </div>
        )  
      })}
    </div>
  )
}
