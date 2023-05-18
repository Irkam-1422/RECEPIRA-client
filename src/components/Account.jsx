import React from 'react'
import { useEffect,useState } from 'react'
import io from 'socket.io-client'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { User } from './profile/User'
import { Restaurant } from './profile/Restaurant'

const socket = io.connect('http://localhost:4000')

export const Account = () => {

  const { search } = useLocation()
  const [type,setType] = useState()
  const [user,setUser] = useState({})
  const [creations,setCreations] = useState([])
  const [jobs,setJobs] = useState([])  

  useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(search))
        setType(searchParams.type)

        const url = window.location.href.split(':')
        const id = url[url.length-1].split('?')[0]
        
        if (searchParams.type == 'user') socket.emit('getUser', id)
        if (searchParams.type == 'restaurant') socket.emit('getRestaurant', id)
  },[])

  useEffect(() => {
        socket.on('showUser',(user) => {
          setUser(user)
          socket.emit('getPosts', user._id.toString())
        })
        socket.on('showRestaurant',(restaurant) => {
          setUser(restaurant)
          socket.emit('getPosts', restaurant._id.toString())
          socket.emit('getJobs', restaurant._id.toString())
        })
        socket.on('showMyPosts', (creations) => {
          setCreations(creations)
        })
        socket.on('showMyJobs', (jobs) => {
          setJobs(jobs)
        })
  },[])   

  return (
    <div className="">
      {type == 'user' && <User user={user} creations={creations} current={false}/>}
      {type == 'restaurant' && <Restaurant restaurant={user} creations={creations} jobs={jobs} current={false}/>}
    </div>
  )
}
