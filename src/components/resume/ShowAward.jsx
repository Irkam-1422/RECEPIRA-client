import React from 'react'
import styles from '../../styles/UserInfo.module.css'

export const ShowAward = ({award, handleDelete}) => {

  const onHandleDelete = (e) => {
    e.preventDefault(e)
    handleDelete(award)
  }
  
  return (
    <div  className={styles.box}>
        <div>
            <div className="">
                <h3>{award.award}</h3>
            </div>
            <div className="">
                {award.organisation}
            </div>
            <div className="">
                {award.year}
            </div>
            <div className="">
                {award.description}
            </div>
        </div>
        <div className=""> 
            <button onClick={onHandleDelete}>Delete</button>
        </div>
    </div>
  )
}