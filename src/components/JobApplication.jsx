import React, { useEffect,useRef } from 'react'
import { useState } from 'react'
import styles from '../styles/JobApplication.module.css'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:4000')

const FIELD = {
    NAME: 'name',
    CV: 'cv',
    COVERLETTER: 'coverletter'
}

export const JobApplication = ({job, closeModal, userId}) => {

  const cvInput = useRef(null)
  const {NAME,CV,COVERLETTER} = FIELD
  const [values,setValues] = useState({[NAME]: '',[CV]: '',[COVERLETTER]: ''})  

  useEffect(() => {
    socket.on('applied', () => {
        console.log('Applied');
        closeModal()
        alert(`Your Application has been sent to ${job.company.name}`)
    })
  }, [])

  const setModalClosed = (e) => {
    if (e.target.id == 'wrapper') closeModal()
  }  

  const handleCgange = ({target: {value, name}}) => {
    setValues({...values, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const jobId = job._id.toString()
    socket.emit('jobApply', {values,userId,jobId})
  }

  const handleClick = (e) => {
    e.preventDefault()
    cvInput.current.click()
  }

  return (
    <div id='wrapper' className={styles.wrapper} onClick={setModalClosed}>
        <div id='modal' className={styles.modal}>
            <form action={styles.col} onSubmit={handleSubmit}>
                <h3>{job.position} at {job.company.name}</h3>
                <div className="">
                    Your full name and surname:
                    <input type="text" 
                           name="name" 
                           value={values[NAME]}
                           onChange={handleCgange}
                           placeholder='John Smith' />
                </div>
                <div className={styles.col}>
                    Upload your CV:
                    <button onClick={handleClick}>Choose file</button>
                    <span>file name</span>
                    <input type="file" 
                           name="cv" 
                           value={values[CV]}
                           style={{opacity: '0'}}
                           ref={cvInput}
                           onChange={handleCgange} />
                </div>
                <div className="">
                    <textarea name="coverletter" 
                              value={values[COVERLETTER]} 
                              onChange={handleCgange}
                              cols="30" 
                              rows="10"
                              placeholder='Your cover letter...'>
                    </textarea>
                </div>
                <button onClick={handleSubmit}>Apply</button>
            </form>
        </div>
    </div>
  )
}
