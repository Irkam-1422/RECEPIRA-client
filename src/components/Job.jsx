import React, { useState } from 'react'
import styles from '../styles/Job.module.css'
//import { io } from 'socket.io-client'
import { useEffect } from 'react'
import { JobApplication } from './JobApplication'

//const socket = io.connect('http://localhost:4000')

export const Job = ({socket, userId, userType}) => {

const [job,setJob] = useState({})
const [modal, setModal] = useState(false)

useEffect(() => {
    const queryString = window.location.href.split(':')
    const id = queryString[queryString.length-1]
    socket.emit('getJob',id)

    socket.on('showJob', (job) => {
        setJob(job)
        document.getElementById('desc').innerHTML = job.description
    })
}, [])

const handleApplyClick = (job) => {
    setModal(true)   
}

const closeModal = () => {
    setModal(false)   
}

return (
    <div>
        <div className={styles.wrap}>
            <div className={styles.header}>
                <div className={styles.avatar}
                     style={ job.company && job.company.avatar ? 
                     {backgroundImage: `url(${require(`../images/${job.company.avatar}`)})`}
                     : {backgroundImage: `url(${require(`../images/cook-avatar.png`)})`} } 
                ></div> 
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
            {/* <button className={styles.btn}>Apply now</button> */}
            {userType == 'user' && <>
                {job.applicants && job.applicants.includes(userId) ? 
                <button>Applied</button> :
                <button onClick={() => handleApplyClick(job)}>
                    + Apply now
                </button>
                }
            </>}
        </div>
        {modal && <JobApplication job={job} closeModal={closeModal} userId={userId}/>}
    </div>
  )
}
