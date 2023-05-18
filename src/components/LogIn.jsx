import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:4000')

const  FIELD = {
    EMAIL: "email",
    PASSWORD: "password"
}

export const LogIn = () => {

  const {EMAIL,PASSWORD} = FIELD  
  const [values,setValues] = useState({[EMAIL]: "", [PASSWORD]: ""})

  const { search } = useLocation()
  const [params,setParams] = useState('')
  const [type,setType] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search))
    setParams(searchParams.failed)
    setType(searchParams.type)
    console.log(searchParams.type);
  },[search])

  useEffect(() => {
    socket.on('user', ({result}) => {
      console.log('Client: receiving user', result);
      navigate(`/profile/:${result._id.toString()}?type=user`)
    })  
    socket.on('restaurant', ({result}) => {
      console.log('Client: receiving restaurant', result);
      navigate(`/profile/:${result._id.toString()}?type=restaurant`)
    }) 
    socket.on('failedToLogIn', () => {
      navigate(`/login?type=${type}&failed=error`)
    })  
  }, [])

  const handleChange = ({target: {value, name}}) => {
    setValues({...values, [name]: value})
  }

  const handleClick = (e) => {
    const isDIsabled = Object.values(values).some(value => !value)
    if (isDIsabled) e.preventDefault()
  }

  const handleSubmission = (e) => {
    e.preventDefault()
    console.log('Client: emmitting login');
    socket.emit('login', {values,type})
  }

  return (
    <div>
        <h1>Welcome back!</h1>
        <form onSubmit={handleSubmission}>
        {params == 'error' && <div className="">
            <p style={{color:'red'}}>Your email or password are incorrect. Please, try again!</p>    
        </div>    }
        {params == 'exists' && <div className="">
            <p style={{color:'red'}}>This user already exists. Log in!</p>    
        </div>    }
        <div className="">
            <input type="text" 
                   name="email" 
                   placeholder="Email"
                   value={values[EMAIL]}
                   onChange={handleChange} 
                   autoComplete="off"
                   required />
        </div>
        <div className="">
            <input type="password" 
                   name="password" 
                   placeholder="Password"
                   value={values[PASSWORD]}
                   onChange={handleChange} 
                   autoComplete="off"
                   required />
        </div>
        <div className="">
            Don't have an account yet? 
            <Link to={'/sign-up'}>
               <span>Sign Up</span>
            </Link>
        </div>
            <input type="submit" value="Next" onClick={handleSubmission}/>
    </form>
    </div>
  )
}
