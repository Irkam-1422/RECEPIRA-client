import React, { useEffect, useRef } from 'react'
import styles from '../../styles/Profile.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { UserInfo } from '../UserInfo'
import io from 'socket.io-client'
import { PostBox } from '../partials/PostBox'

const socket = io.connect('http://localhost:4000')
const SocketIOFileUpload = require('socketio-file-upload');

export const User = ({user,creations,current,userId,returnChat,returnAvatar,returnLogOut}) => {

  const uploader = new SocketIOFileUpload(socket);
  const avatarInput = useRef(null)
  const div = useRef(null)
  const [resume, setResume] = useState(false)  
  const [following, setFollowing] = useState(false)
  const [eFile, setEFile] = useState(null)
  const [avatar,setAvatar] = useState(user ? 'a': 'b')
  //const image = require('../../images/')
 
  //console.log(avatar)

  useEffect(() => {
      uploader.addEventListener("complete", function(event){
        event.preventDefault()
        setEFile(event.file.name)
    });
    uploader.listenOnInput(avatarInput.current)
    //div.current.style.setProperty("--bg-img", `url(require(`../images/${name}`))`);
  },[])
  useEffect(() => {
    !current && checkFollowing()
    socket.on('following', () => {
      console.log('following')
        setFollowing(true)
    })

    if (!current && user._id) {
      returnChat(user._id.toString())
    }

    socket.on('avatarUpdated', (user) => {
      console.log('avatarUpdated')
      console.log(user)
    })
  })

  let submitingAvatar = () => {
    if (eFile) {
      console.log(eFile)
      const userId = user._id.toString()
      console.log(userId)
      socket.emit('changeAvatar', {eFile,userId})
      submitingAvatar = null
    }
  }
  submitingAvatar()

  const handleFollow = () => {
    console.log('handleFollow');
     const currentId =  userId
     const toFollowId = user._id.toString()
     socket.emit('followUser', {currentId, toFollowId})
  }

  const checkFollowing = () => {
    if (user.followers && user.followers.includes(userId)) setFollowing(true)
  }

  return (
    <div className="">
        <header className={styles.header}>
            <div className="">
                {user && <div className={styles.avatar} 
                     ref={div} 
                     style={ eFile ? 
                            {backgroundImage: `url(${require(`../../images/${eFile}`)})`}
                            : user.avatar ? 
                            {backgroundImage: `url(${require(`../../images/${user.avatar}`)})`}
                            : {}
                            //{backgroundImage: `url(${require('../../images/avatar.jpg')})`} //!!!!!!!!!!
                            //{backgroundImage: `url(${require(`../../images/${user.avatar}`)})`}
                      }
                     >
                    {current && <button className={`${styles.btn} ${styles.avatarBtn} purple`} onClick={() => avatarInput.current.click()}>+</button>}
                    <input type="file" 
                           name="file" 
                           ref={avatarInput}
                           //onChange={handleAvatarSetting} 
                           style={{opacity: '0'}}/>
                </div>}
            </div> 
            <div className={styles.details}>
                <h1>{user.name}</h1>
                <div className={styles.desc}>
                    {user.resume && user.resume.description}
                </div>
                <div className={styles.row}>
                    <div className="">
                        <span>{user.following ? user.following.length : 0}</span>Folliwing
                    </div>
                    <div className="">
                        <span>{user.followers ? user.followers.length : 0}</span>Followers
                    </div>
                    <div className="">
                        <span>{user.likes}</span>Likes
                    </div>
                </div>
            </div>
            <div className={styles.cont}>
              <button className={styles.creations}>Creations</button>
              <button className={styles.creations}>Applications</button>
              <button className={styles.creations}>Saved Collections</button>
              <div className={styles.button}>
                    {current && <>
                    <Link to={'/resume'}>
                        <button className={`${styles.btn} purple`}>Resume</button>
                    </Link>
                    <Link to={'/'}>
                        <button className={`${styles.btn} disabled`} onClick={returnLogOut}>LogOut</button>
                    </Link>
                    </>
                    }
                    {!current && <div className="">
                    <button onClick={() => setResume(prev => !prev)} className={`${styles.btn} purple`}>Resume</button>
                    {!following ? <button onClick={handleFollow} className={styles.btn}>Follow</button> 
                    : <button className={`${styles.btn} disabled`}>Following</button> }
                    </div> }
                    {!current && <Link to={`/messages`}>
                      <button className={styles.btn}>Message</button>
                    </Link>}
                </div>
            </div>
        </header>
        {!resume && <>
        <div className={styles.wrap}>
            <h1>Creations</h1>
            <div className={styles.box}>
              {!creations.length && <div className="">There has been no creations made yet.</div> }
              {creations.map(c => <PostBox post={c}/>)} 
            </div> 
        </div>
        {/* <div className={styles.wrap}>
            <h1>Collections</h1>
            <div className={styles.box}></div> 
        </div> */}
        </>}
        {resume && <UserInfo user={user} />}
    </div>
  )
}
