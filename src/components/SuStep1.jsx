import React, { useEffect } from 'react'
import styles from '../styles/SignUp.module.css'
import { useState } from 'react'
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom'

export const SuStep1 = () => {
  
  const [type,setType] = useState('cook')  
  const [link, setLink] = useState('')
  
  const { search } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search))
    //setLink(searchParams.link) sign-up-step2
    if (searchParams.step == 'su') setLink(`sign-up-step2`)
    if (searchParams.step == 'li') setLink(`log-in`)
    //console.log(searchParams);
  },[search])

  const handleRecruiter = () => {
    setType('recruiter')
    //console.log(type);
    
  }
  const handleCook = () => {
    setType('cook')
    //console.log(type);
  }

  return (
    <div className={styles.outer}>
    <div className={styles.inner}>
        <h1>Are you a recruiter or a cook?</h1>
        <div className={styles.options}>
          <Link to={`/${link}?type=recruiter`} onClick={handleRecruiter}>
              <div className={styles.recruiter}
                  //style={type == 'recruiter' ? {color: 'red'} : {color: 'black'}} 
                  onClick={handleRecruiter}
                  >
                  Recruiter</div>
          </Link>
          <Link to={`/${link}?type=cook`} onClick={handleCook}>
              <div className={styles.cook}
                  //style={type == 'cook' ? {color: 'red'} : {color: 'black'}}   
                  onClick={handleCook}
                  >
                  Cook</div>
          </Link>
        </div>
       </div>
    </div>
  )
}
