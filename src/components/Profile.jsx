import React, { useEffect, useState } from 'react'
import { Navigation } from './Navigation'
import styles from '../styles/Profile.module.css'
import io from 'socket.io-client'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { User } from './profile/User'
import { Restaurant } from './profile/Restaurant'


const socket = io.connect('http://localhost:4000')

export const Profile = ({returnId, returnType}) => {

  const { search } = useLocation()
  const [type,setType] = useState()
  const [user,setUser] = useState({})
  const [creations,setCreations] = useState([])
  const [jobs,setJobs] = useState([])

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search))
    setType(searchParams.type)
    returnType(searchParams.type)
    
    const url = window.location.href.split(':')
    const id = url[url.length-1].split('?')[0]

    console.log(id);

    if (searchParams.type == 'user') {
      console.log('Client: emmiting getUser', id)
      socket.emit('getUser', id)
    } else {
      console.log('Client: emmiting getRestaurant', id)
      socket.emit('getRestaurant', id)
    }

    socket.on('showMyPosts', (creations) => {
      console.log('Client: recieving showMyPosts', creations);
      setCreations(creations)
    })
    
    socket.on('showMyJobs', (jobs) => {
      console.log('Client: recieving showMyJobs', jobs);
      setJobs(jobs)
    })
  },[])

  useEffect(() => {
    socket.on('showUser',(user) => {
      console.log('Client: recieving showUser', user);
      setUser(user)
      returnId(user._id.toString())

      console.log('Client: emmiting getPosts', user._id.toString());
      socket.emit('getPosts', user._id.toString())
    })
    socket.on('showRestaurant',(restaurant) => {
      console.log('Client: recieving showRestaurant', restaurant);
      setUser(restaurant)
      returnId(restaurant._id.toString())

      console.log('Client: emmiting getPosts', restaurant._id.toString());
      socket.emit('getPosts', restaurant._id.toString())
      socket.emit('getJobs', restaurant._id.toString())
    })
  },[]) 

  // useEffect(() => {
  //   socket.on('showCreations', ({creations}) => {
  //     setCreations(creations)
  //     console.log(creations);
  //   })

  //   setTimeout(() => {
  //     setTest(creations)
  //   },0)
  // },[])

  // console.log(creations);

  // useEffect(() => {
  //   socket.on('failedToLogIn',({failed}) => {
  //     navigate(`/log-in?failed=${failed}`)
  //   })

  //},[])


  return (
    <div className="">
      {type == 'user' && <User user={user} creations={creations} current={true}/>}
      {type == 'restaurant' && <Restaurant restaurant={user} creations={creations} jobs={jobs} current={true}/>}
    </div>
  )
}

