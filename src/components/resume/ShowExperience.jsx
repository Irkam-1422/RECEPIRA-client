import React from 'react'
import styles from '../../styles/UserInfo.module.css'

export const ShowExperience = ({experience, handleDelete}) => {
  
  const onHandleDelete = (e) => {
    e.preventDefault(e)
    handleDelete(experience)
  }
    
  return (
    <div className={styles.box}>
        <div>
            <div className="">
                <h3>{experience.position}</h3>
            </div>
            <div className=""> 
                {experience.company}
            </div>
            <div className="">
                {experience.from} - {experience.until}
            </div>
            <div className="">
                {experience.description}
            </div>
        </div>
        <div className="">
            <button onClick={onHandleDelete}>Delete</button>
        </div>
    </div>
  )
}
