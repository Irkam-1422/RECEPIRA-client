import React from 'react'
import styles from '../../styles/Profile.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'


export const User = ({user,creations,current}) => {
  return (
    <div className="">
        <header className={styles.header}>
            <div className="">
                <div className={styles.avatar}>
                    <button className={styles.button}>+</button>
                </div>
            </div> 
            <div className={styles.details}>
                <h1>{user.name}</h1>
                <div className={styles.row}>
                    <div className="">
                        <span>0</span>Folliwing
                    </div>
                    <div className="">
                        <span>0</span>Followers
                    </div>
                    <div className="">
                        <span>0</span>Likes
                    </div>
                </div>
                <div className={styles.button}>
                    <button>Resume</button>
                    {!current && <button>Follow</button>}
                </div>
            </div>
        </header>
        <div className={styles.wrap}>
            <h1>Creations</h1>
            <div className={styles.box}>
              {!creations.length && <div className="">There has been no creations made yet.</div> }
              {creations.map(c => <div className={styles.post}> 
                <Link to={`/post/:${c._id}`}>
                  <h3>{c.title}</h3> 
                </Link>
              </div>)}
            </div>
        </div>
        <div className={styles.wrap}>
            <h1>Collections</h1>
            <div className={styles.box}></div> 
        </div>
    </div>
  )
}
