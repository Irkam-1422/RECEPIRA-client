import React from 'react'
import styles from '../../styles/UserInfo.module.css'

export const ShowEducation = ({edu, handleDelete}) => {
  
  const onHandleDelete = (e) => {
    e.preventDefault(e)
    handleDelete(edu)
  }

  return (
    <div  className={styles.box}>
      <div>
          <h4>{edu.institution}</h4>
          <b>{edu.type}</b>
          {edu.from} - {edu.until}
      </div> 
      <div className="">
            <button onClick={onHandleDelete}>Delete</button>
        </div>
    </div>
  )
}
