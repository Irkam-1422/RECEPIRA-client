import React, { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import styles from '../styles/LogIn.module.css'
// import io from 'socket.io-client'

// const socket = io.connect('http://localhost:4000')

const  FIELD = {
    NAME: "name",
    EMAIL: "email",
    PASSWORD: "password"
}

export const SuStep2 = ({socket}) => {

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
    <div className={styles.outer} >
      <div >
    {type == 'cook' && <div className={styles.inner} style={{flexDirection: 'row-reverse'}}>
        <div className={styles.sidebar}>
          <h1>Welcome!</h1>
        </div>
      <form onSubmit={handleSubmission} className={styles.form}>
        <h2>Sign Up</h2>
        <div className="">
            <input type="text" 
                   name='name' 
                   className={styles.input}
                   placeholder='Name'
                   value={values[NAME]}
                   onChange={handleChange} 
                   autoComplete="off"
                   required />
        </div>
        <div className="">
            <input type="text" 
                   name='email' 
                   className={styles.input}
                   placeholder='Email'
                   value={values[EMAIL]}
                   onChange={handleChange} 
                   autoComplete="off"
                   required />
        </div>
        <div className="">
            <input type="password" 
                   name='password' 
                   className={styles.input}
                   placeholder='Password'
                   value={values[PASSWORD]}
                   onChange={handleChange} 
                   autoComplete="off"
                   required />
        </div>
          <input type="submit" value="Next" onClick={handleSubmission} className={`${styles.input} ${styles.submit}`}/>
      </form>
    </div>}
    {type == 'recruiter' && <div>
        <div className={styles.sidebar}>
          <h1>Welcome!</h1>
        </div>
      <form onSubmit={handleSubmission} className={styles.form}>
        <div className="">
            <input type="text" 
                   name='name' 
                   className={styles.input}
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
                   className={styles.input}
                   value={values[EMAIL]}
                   onChange={handleChange} 
                   autoComplete="off"
                   required />
        </div>
        <div className="">
            <input type="password" 
                   name='password' 
                   placeholder='Password'
                   className={styles.input}
                   value={values[PASSWORD]}
                   onChange={handleChange} 
                   autoComplete="off"
                   required />
        </div> 
          <input type="submit" value="Next" onClick={handleSubmission} className={`${styles.input} ${styles.submit}`}/>
      </form>
    </div>}
    </div>
    </div>
  )
}
