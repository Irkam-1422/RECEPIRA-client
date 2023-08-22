import React from 'react'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
//import io from 'socket.io-client'
import { Link } from 'react-router-dom'
import { PostBox } from './partials/PostBox'
import { JobApplication } from './JobApplication'

//const socket = io.connect('http://localhost:4000')
const btnDiv = {
  display: 'flex',
  flexDirection: 'column'
}

export const Home = ({socket, userId}) => {

  const [following,setFollowing] = useState([])
  const [fresh,setFresh] = useState([])
  const [jobs,setJobs] = useState([])
  const [applications,setApplications] = useState([])

  const [job, setJob] = useState({})
  const [modal, setModal] = useState(false)
  const [applied,setApplied] = useState([])

  const [showJobs,setShowJobs] = useState(jobs)

  useEffect(() => { socket.emit('checkApplications', userId)
    socket.on('showApplications', (jobIds) => {
      setApplications(jobIds)
    })
    socket.emit('getPostsFromFollowing', userId)
    socket.on('showPostsFromFollowing', (posts) => {
      setFollowing(posts)
    })
    socket.emit('getFreshPosts')
    socket.on('showFreshPosts', (posts) => {
      setFresh(posts)
    })
    // socket.emit('getRecentJobs')
    // socket.on('showJobs', (jobs) => {
    //   setJobs(jobs)
    // })

    socket.emit('getAllJobs') 
    socket.on('showAllJobs', (jobs) => {
      const resultJobs = jobs.filter(j => !j.applicants.filter(app => app.id == userId).length)
      const resultAppl = jobs.filter(j => j.applicants.filter(app => app.id == userId).length)
      setJobs(resultJobs)
      setApplied(resultAppl) 
    })

  },[])
 
  const handleApplyClick = (job) => {
    setJob(job)
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  return (<> 
    <div className={styles.main}>
      <div className="">
        <div className="">
          <h2>Following:</h2>
          <div className={styles.container}>
          {!following.length && <p>There are no people you follow^ or they haven't postet anything yet. Follow more people to be first one to see their updates!</p>}
            {following.map(post => {
              if (post._id) {
                return (
                  <PostBox post={post}/>
                )
              } else { return ( <div className=""></div> )}
            })}
          </div>
        </div>
        <div className="">
          <h2>Fresh:</h2>
          <div className={styles.container}>
          {!fresh.length && <p>There have been nothing posted yet.</p>}
            {fresh.map(post => {
              if (post._id) {
                return (
                  <PostBox post={post}/>
                )
              } else { return ( <div className=""></div> )}
            })}
          </div>
        </div>
      </div>
        <div style={{marginLeft: '30px'}}>
          <div style={{display: 'flex', minWidth: '400px'}}>
            <h2 onClick={() => setShowJobs(jobs)}
                style={showJobs == jobs ? {fontWeight: '400', cursor: 'pointer'} : {fontWeight: '100', cursor: 'pointer'}}
            >Fresh Jobs</h2>
            <h2 onClick={() => setShowJobs(applied)}
                className={styles.applied}
                style={showJobs == applied ? {fontWeight: '400'} : {fontWeight: '100'}}
            >My Applications</h2>
          </div> 
          <div className={styles.container2}>
          {!showJobs.length && showJobs == jobs && <p>There have been nothing posted yet.</p>}
          {!showJobs.length && showJobs == applied && <p>You haven't applied to any jobs yet.</p>}
          {showJobs.map(job => { 
            if (job && job.applicants) {
              return (
                <div className={styles.item2}>
                  {job._id && <><Link to={`/job/:${job._id.toString()}`}>
                        <div className={styles.jobAvatar}></div>
                  </Link>
                  <Link to={`/job/:${job._id.toString()}`}>
                    <div className={styles.jobInfo}>
                      <h3>{job.position}</h3>
                      <p>{job.company.name}</p>
                      <p>{job.location}</p>
                      <div className="">
                          <button className={styles.infoBtn}>{job.salary}</button>
                          <button className={styles.infoBtn}>{job.from}</button>
                          <button className={styles.infoBtn}> {job.fulltime}</button>
                      </div>
                    </div>
                  </Link></>}
                  <div className=""></div>
                  <div style={btnDiv}>
                    <button className={styles.infoBtn}>{job.applicants.length} {job.applicants.length == 1 ? 'applicant' : 'applicants'}</button>
                    {job._id && applications.includes(job._id.toString()) ? 
                    <button className={styles.btn}>Applied</button>
                    : <button className={styles.btn} onClick={() => handleApplyClick(job)}>
                        + Apply
                      </button>}
                  </div>
                </div>
              ) 
            } else {
              return (<div></div>)
            }
            })}
          </div>
        </div>
        {/* <div className="">
          <h2>My Applications:</h2>
          <div className=""></div>
        </div> */}
    </div>
    {modal && <JobApplication job={job} closeModal={closeModal} userId={userId}/>}
    </>
  )
}
