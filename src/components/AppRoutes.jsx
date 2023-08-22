import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './Home'
import { LogIn } from './LogIn'
import { Main } from './Main'
import { Messages } from './Messages'
import { Post } from './Post'
import { Profile } from './Profile'
import { Search } from './Search'
import { SuStep1 } from './SuStep1'
import { SuStep2 } from './SuStep2'
import { Recipe } from './Recipe'
import { Navigation } from './Navigation'
import { Account } from './Account'
import { PostJob } from './PostJob'
import { Job } from './Job'
import { Resume } from './Resume'
import io from 'socket.io-client'

//const socket = io.connect('http://localhost:4000') 
const socket = io.connect('https://recep-ira-server.vercel.app/') 

export const AppRoutes = () => {

  const [userId, setUserId] = useState('')
  const [userType, setUserType] = useState('')
  const [chatId,setChatId] = useState(null)
  const [messages, setMessages] = useState([])
  const [notifications,setNotifications] = useState([])

  const handleIdSetting = (id) => {
    console.log(id);
    setUserId(id)
  }

const handleTypeSetting = (type) => {
  console.log(type)
    setUserType(type)
}

const handleChatSetting = (chat) => {
  setChatId(chat)
}

const handleUnreadSetting = (messages) => {
  setMessages(messages)
}

const handleNotificationSetting = (notifications) => {
  setNotifications(notifications)
}

  console.log(chatId);

  return (
    <>
    <div style={userId ? {opacity: '1'} : {opacity: '0'}}>
      <Navigation socket={socket} userId={userId} userType={userType} messages={messages} notifications={notifications} />  
    </div>
    <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/sign-up' element={<SuStep1/>} /> 
        <Route path='/sign-up-step2' element={<SuStep2 socket={socket}/>} />
        <Route path='/log-in' element={<LogIn socket={socket}/>} /> 
        <Route path='/profile/:id' element={<Profile socket={socket} returnId={handleIdSetting} returnType={handleTypeSetting} returnUnread={handleUnreadSetting} returnNotifications={handleNotificationSetting}/>} />
        <Route path='/account/:id' element={<Account socket={socket} userId={userId} returnChat={handleChatSetting}/>} />
        <Route path='/resume' element={<Resume socket={socket} userId={userId} />} />
        <Route path='/home' element={<Home socket={socket} userId={userId}/>} />
        <Route path='/search' element={<Search socket={socket} userId={userId}/>} />
        <Route path='/post' element={<Post socket={socket} userId={userId} />} /> 
        <Route path='/post/:id' element={<Recipe socket={socket} userId={userId} />} /> 
        <Route path='/messages' element={<Messages socket={socket} userId={userId} chatId={chatId} type={userType} />} />
        <Route path='/post-job' element={<PostJob socket={socket} userId={userId} />} />
        <Route path='/job/:id' element={<Job socket={socket} userId={userId} userType={userType}/>} />
    </Routes>
    </>
  )
}
