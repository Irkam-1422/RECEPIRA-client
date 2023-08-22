import React from 'react'
import styles from '../styles/UserInfo.module.css'

export const UserInfo = ({user}) => {

  return (
    <div style={{marginTop: '100px'}}>
        {user.resume.location.length && <div className={styles.wrapper_2}>
            <h3>Location:</h3>
            {user.resume.location}
        </div>}
        {user.resume.languages.length && <div className={styles.wrapper_2}>
            <h3>Languages:</h3>
            <div className={styles.wrapper}>
                {user.resume.languages.map(lang => {
                    return (
                        <div className={styles.box}>
                            <span>{lang.language}</span> ( {lang.level} )
                        </div>
                    )
                })}
            </div>
        </div>}
        {user.resume.experience.length && <div className={styles.wrapper_2}>
            <h3>Experience:</h3>
            <div className="">
                {user.resume.experience.map(exp => {
                    return (
                        <div className={styles.box}>
                            <h4>{exp.position}</h4>
                            <b>{exp.company}</b>
                            {exp.from} - {exp.until}
                        </div>
                    )
                })}
            </div>
        </div>}
        {user.resume.education.length && <div className={styles.wrapper_2}>
            <h3>Education:</h3>
            {user.resume.education.map(edu => {
                return (
                    <div className={styles.box}>
                        <h4>{edu.institution}</h4>
                        <b>{edu.type}</b>
                        {edu.from} - {edu.until}
                    </div> 
                )
            })}
        </div>}
        {user.resume.awards.length && <div className={styles.wrapper_2}>
            <h3>Awards:</h3>
            {user.resume.awards.map(aw => {
                return (
                    <div className={styles.box}>
                        <h4>{aw.award}</h4>
                        <b>{aw.organization}</b>
                        {aw.year}
                        {aw.file !== '' && <button>{aw.award}</button> }
                    </div>
                )
            })}
        </div>}
    </div>
  )
}
