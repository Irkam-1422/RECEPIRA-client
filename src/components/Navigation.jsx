import React, {useState, useRef} from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../styles/Navigation.module.css'

const divStyles = {
    display: 'none',
    flexDirection: 'column',
    width: '100%',
}

const wrapStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    marginLeft: '-175px'
}

const unreadStyles = {
    background: 'red',
    width: '15px',
    height: '15px',
    marginLeft: '3px',
    borderRadius: '40%',
    color: 'white',
    paddingLeft: '6px'
}

const activityStyles = {
    width: '100%',
    background: '#ddd',
    position: 'fixed',
    top: '30px',
    zIndex: '100',
    padding: '15px',
}

const avatarStyles = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: '#fff',
    marginRight: '10px'
}

const btnStyles = {
    // border: '1px solid',
    padding: '5px 15px',
    color: '#000',
    borderRadius: '5px',
    fontWeight: '100',
}

const btnSelectedStyles = {
    color: '#1ca31c',
    fontWeight: '400',
    padding: '5px 15px',
    borderRadius: '5px',
}

const aStyles = {
    margin: '0',
    padding: '0',
    height: '38px',
    marginTop: '-10px',
}

const postBtnSelStyles = {
    width: '100px',
    position: 'relative',
    boxShadow: '0px 0px 5px 1px',
    width: '100px'
}

export const Navigation = ({socket, userId, userType, messages, notifications}) => {
  
  const navigate = useNavigate()
  const post = useRef(null)
  const job = useRef(null)
  const [activity,setActivity] = useState(false)
  const [btn,setBtn] = useState('Profile')

  const handleActivitySetting = (e) => {
    if (activity) socket.emit('clearNotifications', userId)
    setActivity(prev => !prev)
    handleClick(e)
  }

  const handleClick = (e) => {
    setBtn(e.target.innerHTML)
  }

  useEffect(() => {
    if (!userId) navigate(`/`)
  },[])

  return (
    <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <Link to={'/home'}>
            <div style={btn !== 'Home' ? btnStyles : btnSelectedStyles} onClick={handleClick}>Home</div>
        </Link>
        <Link to={'/search'}>
            <div style={btn !== 'Search' ? btnStyles : btnSelectedStyles} onClick={handleClick}>Search</div>
        </Link>
        {userType == 'user' && <Link to={'/post'}>
            <div style={btn !== 'Post' ? btnStyles : btnSelectedStyles} onClick={handleClick}>Post</div>
        </Link>}
        {userType == 'restaurant' && <>
        <div className=""></div>
        <div style={wrapStyles} 
                onMouseEnter={() => {
                document.getElementById('options').style.display = 'flex'
                }}
                onMouseLeave={() => {
                document.getElementById('options').style.display = 'none'
                }}>
            <div style={btn !== 'Post' ? btnStyles : btnSelectedStyles} onClick={handleClick}>Post</div>
            <div style={divStyles} id="options">
                <Link style={aStyles} to={'/post'}>
                    <button className={styles.postBtn}>Post</button>
                </Link> 
                <Link to={'/post-job'}>
                    <button className={styles.postBtn}>Job</button> 
                </Link>
            </div>
        </div>
        </>}
        <Link to={'/messages'}>
            <div style={{display: 'flex'}}>
                <div style={btn !== 'Messages' ? btnStyles : btnSelectedStyles} onClick={handleClick}>Messages</div>
                <div style={messages && messages.length ? unreadStyles : {display: 'none'}}>
                    {messages && messages.length && messages.map(m => m.unread).reduce((a,b) => a + b )}
                </div> 
            </div>
        </Link>
        <div style={{display: 'flex', cursor: 'pointer'}}>
            <div onClick={handleActivitySetting} style={btn !== 'Activity' ? btnStyles : btnSelectedStyles}>Activity</div>
            <div style={notifications && notifications.length ? unreadStyles : {display: 'none'}}>
                {notifications && notifications.length && notifications.length}
            </div>
            <div style={activity ? activityStyles : {display: 'none'}}>
                {notifications && notifications.length ? notifications.map(n => {
                    return (
                        <div style={{display: 'flex', alignItems: 'center'}}> 
                            <div style={avatarStyles}></div>
                            {n.name} {n.action}
                        </div>
                    )
                }) : 'There are no new notifications. You are up to date'}
            </div>
        </div>
        {userId && <Link to={`/profile/:${userId}?type=${userType}`}>
            <div style={btn !== 'Profile' ? btnStyles : btnSelectedStyles} onClick={handleClick}>Profile</div>
        </Link>}
    </div>
  )
}
