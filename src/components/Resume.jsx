import React, { useState } from 'react'
import { useEffect } from 'react'
import { Award } from './resume/Award'
import { Education } from './resume/Education'
import { Experience } from './resume/Experience'
import { Language } from './resume/Language'
//import { io } from 'socket.io-client'
import { useNavigate } from 'react-router-dom'
import { ShowExperience } from './resume/ShowExperience'
import { ShowEducation } from './resume/ShowEducation'
import { ShowLanguage } from './resume/ShowLanguage'
import { ShowAward } from './resume/ShowAward'


//const socket = io.connect('http://localhost:4000')

export const Resume = ({socket, userId}) => {

  const navigate = useNavigate()

  const [description, setDescription] = useState('') 
  const [location, setLocation] = useState('') 
  const [experience, setExperience] = useState([]) 
  const [education, setEducation] = useState([]) 
  const [languages, setLanguages] = useState([]) 
  const [awards, setAwards] = useState([]) 

  const [openExp, setOpenExp] = useState(false)
  const [openEdu, setOpenEdu] = useState(false)
  const [openLangs, setOpenLangs] = useState(false)
  const [openAwards, setOpenAwards] = useState(false)

  useEffect(() => {
    socket.emit('getUser', userId)
    socket.on('showUser', (user) => {
      console.log(user);
      setDescription(user.resume.description ? user.resume.description : '')
      setLocation(user.resume.location ? user.resume.location : '')
      setExperience(user.resume.experience ? user.resume.experience : [])
      setEducation(user.resume.education ? user.resume.education : [])
      setLanguages(user.resume.languages ? user.resume.languages : [])
      setAwards(user.resume.awards ? user.resume.awards : [])
    })

    socket.on('resumeAdded', () => {
      navigate(`/profile/:${userId}?type=user`)
    })
  },[])

  const handleExperienceSetting = (experience) => {
    console.log(experience);
    setExperience(prev => [...prev,experience])
    setOpenExp(false)
  }  
  const handleEducationSetting = (education) => {
    console.log(education);
    setEducation(prev => [...prev,education])
    setOpenEdu(false)
  }  
  const handleLanguagesSetting = (language) => {
    console.log(language);
    setLanguages(prev => [...prev,language])
    setOpenLangs(false)
  }  
  const handleAwardsSetting = (award) => {
    console.log(award);
    setAwards(prev => [...prev,award])
    setOpenAwards(false)
  }  
  const handleDescriptionSetting = ({target: {value, name}}) => {
    setDescription(value)
  }  
  const handleLocationSetting = ({target: {value, name}}) => {
    setLocation(value)
  }  
  const addExperience = (e) => {
    e.preventDefault()
    setOpenExp(true)
  }
  const addEducation = (e) => {
    e.preventDefault()
    setOpenEdu(true)
  }
  const addLanguage = (e) => {
    e.preventDefault()
    setOpenLangs(true)
  }
  const addAward = (e) => {
    e.preventDefault()
    setOpenAwards(true)
  }
  const deleteExperience = (exp) => {
    const i = experience.indexOf(exp)
    const list1 = experience.slice(0,i)
    const list2 = experience.slice(i+1, experience.length)
    setExperience(list1.concat(list2))
  }
  const deleteEducation = (edu) => {
    const i = education.indexOf(edu)
    const list1 = education.slice(0,i)
    const list2 = education.slice(i+1, education.length)
    setEducation(list1.concat(list2))
  }
  const deleteLanguage = (lang) => {
    const i = languages.indexOf(lang)
    const list1 = languages.slice(0,i)
    const list2 = languages.slice(i+1, languages.length)
    setLanguages(list1.concat(list2))
  }
  const deleteAward = (award) => {
    const i = awards.indexOf(award)
    const list1 = awards.slice(0,i)
    const list2 = awards.slice(i+1, awards.length)
    setAwards(list1.concat(list2))
  }  
  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('addResume', {description,location,experience,education,languages,awards,userId})
  }

  return (
    <div>
        <form className="" onSubmit={handleSubmit}>
            <div className="">
                <textarea name="description"
                          value={description} 
                          onChange={handleDescriptionSetting}
                          id="" 
                          cols="30" 
                          rows="10"
                          placeholder='Tell about yourself...'
                ></textarea>
            </div>
            <div className="">
                <h3>What is your current location?</h3>
                <input type="text" 
                       name="location"
                       value={location} 
                       onChange={handleLocationSetting}
                       id="" 
                       placeholder='Amsterdam, The Netherlands'
                />
            </div>
            <div className="">
                <h3>Experience:</h3>
                <div style={{display: 'flex'}}>
                  {experience.map(exp => <ShowExperience experience={exp} handleDelete={deleteExperience}/>)}
                </div>
                {openExp && <Experience handleSetting={handleExperienceSetting}/>}
                <button onClick={addExperience}>+ Add expreience</button>
            </div>
            <div className="">
                <h3>Education:</h3>
                <div style={{display: 'flex'}}>
                  {education.map(edu => <ShowEducation edu={edu} handleDelete={deleteEducation}/>)}
                </div>
                {openEdu && <Education handleSetting={handleEducationSetting } />}
                <button onClick={addEducation}>+ Add education</button>
            </div>
            <div className="">
                <h3>Languages:</h3>
                <div style={{display: 'flex'}}>
                  {languages.map(lang => <ShowLanguage lang={lang} handleDelete={deleteLanguage}/>)}
                </div>
                {openLangs && <Language handleSetting={handleLanguagesSetting}/>}
                <button onClick={addLanguage}>+ Add language</button>
            </div>
            <div className="">
                <h3>Awards:</h3>
                <div style={{display: 'flex'}}>
                  {awards.map(award => <ShowAward award={award} handleDelete={deleteAward}/>)}
                </div>
                {openAwards && <Award handleSetting={handleAwardsSetting}/>}
                <button onClick={addAward}>+ Add award</button>
            </div>
            <input type="submit" 
                name="" 
                id=""
                value="Save" 
                onClick={handleSubmit}
            />
        </form>
    </div>
  )
}
