import React from 'react'
import styles from '../../styles/Profile.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'
import { Applicants } from '../Applicants'

const socket = io.connect('http://localhost:4000')
const SocketIOFileUpload = require('socketio-file-upload');

export const Restaurant = ({restaurant,creations,jobs,current,userId,returnChat}) => {
  
  const uploader = new SocketIOFileUpload(socket);
  const avatarInput = useRef(null)
  const div = useRef(null)
  const [eFile, setEFile] = useState(null)
  const [following, setFollowing] = useState(false)
  const [modal, setModal] = useState(false)
  const [job, setJob] = useState({})
 
  useEffect(() => {
      uploader.addEventListener("complete", function(event){
        event.preventDefault()
        setEFile(event.file.name)
    });
    uploader.listenOnInput(avatarInput.current)
  },[])

  useEffect(() => {
    !current && checkFollowing()
    socket.on('following', () => {
        setFollowing(true)
    })

    if (!current && restaurant._id) returnChat(restaurant._id.toString())
  })

  let submitingAvatar = () => {
    if (eFile) {
      console.log(eFile)
      const userId = restaurant._id.toString()
      console.log(userId)
      socket.emit('changeAvatar', {eFile,userId})
      submitingAvatar = null
    }
  }
  submitingAvatar()

  const handleFollow = () => {
    console.log('handleFollow');
     const currentId =  userId
     const toFollowId = restaurant._id.toString()
     socket.emit('followUser', {currentId, toFollowId})
  }

  const checkFollowing = () => {
    if (restaurant.followers && restaurant.followers.includes(userId)) setFollowing(true)
  }

  const viewApplicants = (job) => {
      setModal(true)
      setJob(job)
  }

  const closeModal = () => {
    setModal(false)
  }

  return (
    <div className="">
        <header className={styles.header}>
            <div className="">
                    {restaurant && <div className={styles.avatar} 
                     ref={div} 
                     style={ eFile ? 
                            {backgroundImage: `url(${require(`../../images/${eFile}`)})`}
                            : restaurant.avatar ? 
                            {backgroundImage: `url(${require(`../../images/${restaurant.avatar}`)})`}
                            : {}  
                            //{backgroundImage: `url(${require('../../images/avatar.jpg')})`} //!!!!!!!!!!
                            //{backgroundImage: `url(${require(`../../images/${user.avatar}`)})`}
                      }
                     >
                    {current && <button className={styles.btn} onClick={() => avatarInput.current.click()}>+</button>}
                    <input type="file" 
                           name="file" 
                           ref={avatarInput}
                           style={{opacity: '0'}}/>
                </div>}
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
                        <span>{restaurant.likes}</span>Likes
                    </div>
                </div>
                {!current && <div className={styles.button}>
                    {!following ? <button onClick={handleFollow}>Follow</button> 
                    : <button>Following</button> }
                    <Link to={`/messages`}>
                      <button>Message</button>
                    </Link>

                </div>}
                {current && <Link to={'/'}>
                        <button>LogOut</button>
                    </Link>}
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
              {jobs.map(j => 
              <>
                  <div className={styles.job} style={{width: '350px'}}> 
                    <div style={{display: 'flex', alignItems: 'flex-start'}}>
                <Link to={`/job/:${j._id.toString()}`}>
                      <div className={styles.jobInfo}>
                        <h3>{j.position}</h3>
                        <p>{j.company.name}</p>
                        <p>{j.location}</p>
                        <div className={styles.jobBtns}>
                          <div className={styles.jobBtns1}>
                            <button className={styles.jobBtn}>{j.salary}</button>
                            <button className={styles.jobBtn}>{j.from}</button>
                          </div>
                          <div className={styles.jobBtns2}>
                            <button className={styles.jobBtn}>{j.fullTime ? 'Full-time' : 'Part-time'}</button>
                          </div>
                          </div>
                      </div>
                </Link>
                    <button style={{width: '49%'}}
                            className={styles.jobBtn}
                            onClick={() => viewApplicants(j)}
                            >{j.applicants.length} {j.applicants.length == 1 ? 'applicant' : 'applicants'}</button>
                  </div>
                      {!current && <button>+ Apply</button>}
                  </div>
               </>)}
            </div> 
        </div>
        {modal && <Applicants job={job} closeModal={closeModal}/>}
    </div>
  )
}
