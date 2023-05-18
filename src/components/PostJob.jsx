import React, { useState } from 'react'
import styles from '../styles/Post.module.css'
import { io } from 'socket.io-client'
import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const socket = io.connect('http://localhost:4000')

const  FIELD = {
    POSITION: "position",
    LOCATION: "location",
    SALARY: "salary",
    FROM: "from",
    FULLTIME: "fulltime",
    DESCRIPTION: "description"
}

export const PostJob = (userId) => {

const {POSITION,LOCATION,SALARY,FROM,FULLTIME,DESCRIPTION} = FIELD

const navigate = useNavigate()
const [values,setValues] = useState({[POSITION]: "", [LOCATION]: "",[SALARY]: "",[FROM]: "",[FULLTIME]: "",[DESCRIPTION]: ""})
   
useEffect(() => {
  socket.on('showJob', (job) => {
    console.log(job);
    navigate(`/job/:${job._id.toString()}`)
  })
}, [])

const handleChange = ({target: {value, name}}) => {
    setValues({...values, [name]: value})
}

const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('post-job', {values, userId})
}

return (
    <div>
        <form action="" onSubmit={handleSubmit}>
            <div className="">
                Position:
                <input type="text"
                       name='position'
                       placeholder='Head Chef' 
                       value={values[POSITION]}
                       onChange={handleChange}
                 />
            </div>
            <div className="">
                Location:
                <input type="text" 
                       name='location'
                       placeholder='Amsterdam, The Netherlands' 
                       value={values[LOCATION]}
                       onChange={handleChange}
                 />
            </div>
            <div className="">
                <table>
                    <tr>
                        <td>Salary:</td>
                        <td>From:</td>
                        <td>Full-Time:</td>
                    </tr>
                    <tr>
                        <td><input type="text" 
                                   name='salary'
                                   placeholder='$2500' 
                                   value={values[SALARY]}
                                   onChange={handleChange}
                        /></td>
                        <td><input type="text" 
                                   name='from'
                                   placeholder='From now on'
                                   value={values[FROM]}
                                   onChange={handleChange}
                        /></td>
                        <td><input type="text"
                                   name='fulltime'
                                   placeholder='Full-time'
                                   value={values[FULLTIME]}
                                   onChange={handleChange}
                        /></td>
                    </tr>
                </table>
            </div>
            <div className="">
                <textarea name="description" 
                          id="" 
                          cols="30" 
                          rows="10"
                          placeholder='Add job description...'
                          value={values[DESCRIPTION]}
                          onChange={handleChange}
                ></textarea>
            </div>
            <div className="">
                <input type="submit" value="Next" onClick={handleSubmit}/>
            </div>
        </form>
    </div>
  )
}
