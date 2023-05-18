import React from 'react'
import { Link } from 'react-router-dom'

const divStyles = {
    display: 'none',
    flexDirection: 'column',
    width: '100%',
}

const wrapStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute'
}

export const Navigation = ({userId, userType}) => {

    console.log(userId);

  return (
    <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <Link to={'/home'}>
            <div className="">Home</div>
        </Link>
        <Link to={'/search'}>
            <div className="">Search</div>
        </Link>
        {userType == 'user' && <Link to={'/post'}>
            <div className="">Post</div>
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
            Post
            <div style={divStyles} id="options">
                <Link to={'/post'}>
                    <button style={{width: '100px'}}>Post</button>
                </Link>
                <Link to={'/post-job'}>
                    <button style={{width: '100px'}}>Job</button>
                </Link>
            </div>
        </div>
        </>}
        <Link to={'/messages'}>
            <div className="">Messages</div>
        </Link>
        {userId && <Link to={`/profile/:${userId}?type=${userType}`}>
            <div className="">Profile</div>
        </Link>}
    </div>
  )
}
