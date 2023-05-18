import React, { useState } from 'react'
import styles from '../styles/Job.module.css'
import { io } from 'socket.io-client'
import { useEffect } from 'react'

const socket = io.connect('http://localhost:4000')

export const Job = () => {

const [job,setJob] = useState({})

useEffect(() => {
    const queryString = window.location.href.split(':')
    const id = queryString[queryString.length-1]
    socket.emit('getJob',id)

    socket.on('showJob', (job) => {
        setJob(job)
        document.getElementById('desc').innerHTML = job.description
    })
}, [])

return (
    <div>
        <div className={styles.wrap}>
            <div className={styles.header}>
                <div className={styles.avatar}></div>
                <div className={styles.info}>
                    {job.company && <h2>{job.company.name}</h2>}
                    <h1>{job.position}</h1> 
                    {job.location}
                    <div className="">
                        <button>{job.salary}</button>
                        <button>{job.from}</button>
                        <button>{job.fulltime}</button>
                    </div>
                </div>
            </div>
            <div id='desc' className={styles.desc}></div>
            <button className={styles.btn}>Apply now</button>
        </div>
    </div>
  )
}
