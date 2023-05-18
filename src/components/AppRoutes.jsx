import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './Home'
import { LogIn } from './LogIn'
import { Main } from './Main'
import { Messages } from './Messages'
import { Post } from './Post'
import { PostStep2 } from './PostStep2'
import { Profile } from './Profile'
import { Search } from './Search'
import { SignUp } from './SignUp'
import { SuStep1 } from './SuStep1'
import { SuStep2 } from './SuStep2'
import { Recipe } from './Recipe'
import { Navigation } from './Navigation'
import { Account } from './Account'
import { PostJob } from './PostJob'
import { Job } from './Job'

export const AppRoutes = () => {

  const [userId, setUserId] = useState('')
  const [userType, setUserType] = useState('')

  const handleIdSetting = (id) => {
    console.log(id);
    setUserId(id)
  }

const handleTypeSetting = (type) => {
  console.log(type)
    setUserType(type)
}

  console.log(userId);

  return (
    <>
    <Navigation userId={userId} userType={userType}/>
    <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/sign-up' element={<SuStep1/>} />
        <Route path='/sign-up-step2' element={<SuStep2/>} />
        <Route path='/log-in' element={<LogIn/>} /> 
        <Route path='/profile/:id' element={<Profile returnId={handleIdSetting} returnType={handleTypeSetting}/>} />
        <Route path='/account/:id' element={<Account/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/search' element={<Search/>} />
        <Route path='/post' element={<Post userId={userId} />} /> 
        <Route path='/post/:id' element={<Recipe />} /> 
        <Route path='//post-step2' element={<PostStep2/>} />
        <Route path='/messages' element={<Messages/>} />
        <Route path='/post-job' element={<PostJob userId={userId} />} />
        <Route path='/job/:id' element={<Job/>} />
    </Routes>
    </>
  )
}
