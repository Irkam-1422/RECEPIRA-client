import React, { useState } from 'react'
import { useEffect } from 'react'
import styles from '../../styles/Search.module.css'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'
import { JobApplication } from '../JobApplication'

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

const btnDiv = {
  display: 'flex',
  flexDirection: 'column'
}

export const Jobs = ({open, result, userId}) => {

  const [jobs,setJobs] = useState(open ? [] : result.map(r => r.company))
  const [job, setJob] = useState({})
  const [modal, setModal] = useState(false)
  const [applications, setApplications] = useState([])
  //const [applicants,setApplicants] = useState(open ? [] : result.map(r => r.applicants))

  useEffect(() => {
    socket.emit('checkApplications', userId)
    socket.on('showApplications', (jobIds) => {
      setApplications(jobIds)
    })

    if (open) {
      socket.emit('getRecentJobs')
      socket.on('showJobs', (jobs) => {
      setJobs(jobs)
    })
    }
  }, [])
  
  const handleApplyClick = (job) => {
    setJob(job)
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  return (
    <>
    <div>
      {open && jobs.map((job) => {
        return (
          <div className={styles.jobWrap}>
            <Link to={`/job/:${job._id.toString()}`}>
              <div className={styles.jobAvatar} style={ job.company && job.company.avatar ? 
               {backgroundImage: `url(${require(`../../images/${job.company.avatar}`)})`}
               : {backgroundImage: `url(${require(`../../images/cook-avatar.png`)})`} } 
               ></div>
            </Link>
            <Link to={`/job/:${job._id.toString()}`}>
              <div className={styles.jobInfo}>
                <h3>{job.position}</h3>
                <p>{job.company.name}</p>
                <p>{job.location}</p>
                <div className="">
                  <button className={styles.sm}>{job.salary}</button>
                  <button className={styles.sm}>{job.from}</button>
                  <button className={styles.sm}>{job.fulltime}</button>
                </div>
              </div>
            </Link>
            <div className=""></div>
            <div style={btnDiv}>
              <button>{job.applicants.length} {job.applicants.length == 1 ? 'applicant' : 'applicants'}</button>
              {applications.includes(job._id.toString()) ? 
              <button>Applied</button>
              : <button onClick={() => handleApplyClick(job)}>
                + Apply
              </button>}
            </div>
          </div>
        )
      })}
      {!open && result.map((job) => {
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
            <button onClick={() => handleApplyClick(job)}>+ Apply</button>
          </div>
        )
      })}
    </div>    
    {modal && <JobApplication job={job} closeModal={closeModal} userId={userId}/>}
    </>
  )
}
