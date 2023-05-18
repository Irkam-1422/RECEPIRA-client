import React, { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:4000')

const  FIELD = {
    NAME: "name",
    EMAIL: "email",
    PASSWORD: "password"
}

export const SuStep2 = () => {

  const {NAME,EMAIL,PASSWORD} = FIELD  
  const [values,setValues] = useState({[NAME]: "", [EMAIL]: "", [PASSWORD]: ""})
  const navigate = useNavigate()

  const handleChange = ({target: {value, name}}) => {
    setValues({...values, [name]: value})
  }

  const handleClick = (e) => {
    const isDIsabled = Object.values(values).some(value => !value)
    if (isDIsabled) e.preventDefault()
  }

  const { search } = useLocation()
  const [type,setType] = useState('')
  
  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search))
    setType(searchParams.type)
    
    console.log(searchParams.type);

    socket.on('user', ({result}) => {
      console.log('Client: receiving user', result._id.toString());
      navigate(`/profile/:${result._id.toString()}?type=user`)
    })  
    socket.on('restaurant', ({result}) => {
      console.log('Client: receiving restaurant', result._id.toString());
      navigate(`/profile/:${result._id.toString()}?type=restaurant`)
    })
    socket.on('failedToSignUp', () => {
      navigate(`/login?failed=exists`)
    })  

  },[search])
  
  const handleSubmission = (e) => {
    e.preventDefault()
    console.log('Client: emmitting signup');
    socket.emit('signup', {values, type})
  }

  return (
    <>
    {type == 'cook' && <form onSubmit={handleSubmission}>
        <div className="">
            <input type="text" 
                   name='name' 
                   placeholder='Name'
                   value={values[NAME]}
                   onChange={handleChange} 
                   autoComplete="off"
                   required />
        </div>
        <div className="">
            <input type="text" 
                   name='email' 
                   placeholder='Email'
                   value={values[EMAIL]}
                   onChange={handleChange} 
                   autoComplete="off"
                   required />
        </div>
        <div className="">
            <input type="password" 
                   name='password' 
                   placeholder='Password'
                   value={values[PASSWORD]}
                   onChange={handleChange} 
                   autoComplete="off"
                   required />
        </div>
          <input type="submit" value="Next" onClick={handleSubmission}/>
    </form>}
    {type == 'recruiter' && <form onSubmit={handleSubmission}>
        <div className="">
            <input type="text" 
                   name='name' 
                   placeholder='Company Name'
                   value={values[NAME]}
                   onChange={handleChange} 
                   autoComplete="off"
                   required />
        </div>
        <div className="">
            <input type="text" 
                   name='email' 
                   placeholder='Email'
                   value={values[EMAIL]}
                   onChange={handleChange} 
                   autoComplete="off"
                   required />
        </div>
        <div className="">
            <input type="password" 
                   name='password' 
                   placeholder='Password'
                   value={values[PASSWORD]}
                   onChange={handleChange} 
                   autoComplete="off"
                   required />
        </div> 
          <input type="submit" value="Next" onClick={handleSubmission}/>
    </form>}
    </>
  )
}
