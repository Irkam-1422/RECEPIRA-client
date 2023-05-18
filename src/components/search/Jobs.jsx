import React, { useState } from 'react'
import { useEffect } from 'react'
import styles from '../../styles/Search.module.css'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:4000')
// const jobs = [{
//   position: 'Head Chef',
//   company: 'Grand Hotel',
//   location: 'Amsterdam, The Netherlands',
//   salary: '$2500',
//   from: 'August',
//   fullTime: true
// },{
//   position: 'Head Manager',
//   company: 'Grand Hotel',
//   location: 'Vienna, Austria',
//   salary: '$2500',
//   from: 'August',
//   fullTime: true
// },{
//   position: 'Head Chef',
//   company: 'Grand Hotel',
//   location: 'Amsterdam, The Netherlands',
//   salary: '$2500',
//   from: 'August',
//   fullTime: true
// },{
//   position: 'Head Chef',
//   company: 'Grand Hotel',
//   location: 'Amsterdam, The Netherlands',
//   salary: '$2500',
//   from: 'August',
//   fullTime: true
// },{
//   position: 'Head Chef',
//   company: 'Grand Hotel',
//   location: 'Amsterdam, The Netherlands',
//   salary: '$2500',
//   from: 'August',
//   fullTime: true
// }]

export const Jobs = () => {

  const [jobs,setJobs] = useState([])

  useEffect(() => {
    socket.emit('getRecentJobs')
    socket.on('showJobs', (jobs) => {
      setJobs(jobs)
    })
  }, [])
  

  return (
    <div>
      {jobs.map((job) => {
        return (
          <div className={styles.jobWrap}>
            <Link to={`/job/:${job._id.toString()}`}>
              <div className={styles.jobAvatar}></div>
            </Link>
            <Link to={`/job/:${job._id.toString()}`}>
              <div className={styles.jobInfo}>
                <h3>{job.position}</h3>
                <p>{job.company.name}</p>
                <p>{job.location}</p>
                <div className="">
                  <button>{job.salary}</button>
                  <button>{job.from}</button>
                  <button>{job.fulltime}</button>
                </div>
              </div>
            </Link>
            <div className=""></div>
            <button>+ Apply</button>
          </div>
        )
      })}
    </div>
  )
}
