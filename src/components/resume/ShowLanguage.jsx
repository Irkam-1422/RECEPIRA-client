import React from 'react'
import { useState } from 'react'
import styles from '../../styles/UserInfo.module.css'

export const ShowLanguage = ({lang, handleDelete}) => {

  const [language,setLanguage] = useState(lang)

  const onHandleDelete = (e) => {
    e.preventDefault(e)
    console.log(lang);
    handleDelete(lang)
  }
  return (
    <div className={styles.box}>
        <div>
            <span>{lang.language}</span> ( {lang.level} )
        </div>
        <div className="">
            <button onClick={onHandleDelete}>Delete</button>
        </div>
    </div>
  )
}
