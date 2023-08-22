import React from 'react'
import styles from '../styles/Messages.module.css'

export const Message = ({ messages, userId }) => { 
  return (
    <div className={styles.messages}>
        {messages.map(({message, from}, i) => {

            const itsMe = userId && from === userId
            const className = itsMe ? styles.me : styles.username

            return (
                <div key={i} className={`${styles.message} ${className}`}>
                    {/* <span className={styles.username}> {from.name} </span> */}
                    <div className={styles.text}> {message} </div>
                </div>
            )
        } )}
      </div>
  )
}
