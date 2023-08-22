import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/Main.module.css'


export const Main = () => {
  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <h1 className={styles.h2}>App</h1>
        <div className="btns">
            <Link to={`/sign-up?step=su`}><button className={`${styles.su} ${styles.btn}`}>Sign Up</button></Link>
            <Link to={'/sign-up?step=li'}><button className={`${styles.li} ${styles.btn}`}>Log In</button></Link>
        </div>
      </div>
    </div>
  )
}
