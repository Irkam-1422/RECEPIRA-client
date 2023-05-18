import React from 'react'
import styles from '../../styles/Profile.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'


export const Restaurant = ({restaurant,creations,jobs,current}) => {
  return (
    <div className="">
        <header className={styles.header}>
            <div className="">
                <div className={styles.avatar}>
                    <button className={styles.button}>+</button>
                </div>
            </div> 
            <div className={styles.details}>
                <h1>{restaurant.name}</h1>
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
                {!current && <div className={styles.button}>
                    <button>Follow</button>
                </div>}
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
            <h1>Jobs</h1>
            <div className={styles.box}>
              {!jobs.length && <div className="">There has been no creations made yet.</div> }
              {jobs.map(j => <div className={styles.post} style={{width: '350px'}}> 
                <div className={styles.jobInfo}>
                  <h3>{j.position}</h3>
                  <p>{j.company.name}</p>
                  <p>{j.location}</p>
                  <div className="">
                    <button>{j.salary}</button>
                    <button>{j.from}</button>
                    <button>{j.fullTime ? 'Full-time' : 'Part-time'}</button>
                  </div>
                  </div>
                  <button>+ Apply</button>
              </div>)}
            </div> 
        </div>
    </div>
  )
}
