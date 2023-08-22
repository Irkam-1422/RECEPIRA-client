import React from 'react'
import { useState, useEffect } from 'react'
import styles from '../styles/JobApplication.module.css'
import io from 'socket.io-client'
import { Link } from 'react-router-dom'

//const socket = io.connect('http://localhost:4000')
const socket = io.connect('https://recep-ira-server.vercel.app/') 

export const Applicants = ({job, closeModal}) => {

  const [coverletter,setCoverLetter] = useState(false)

  const setModalClosed = (e) => {
    if (e.target.id == 'wrapper') closeModal()
  }  

  const showCoverLetter = (applicant,i) => {
    if (!coverletter) {
        setCoverLetter(true)
        document.getElementsByClassName('wrap')[i].style.display = 'block'
        document.getElementsByClassName('coverletter')[i].innerHTML = applicant.coverletter
    } else {
        setCoverLetter(false)
        document.getElementsByClassName('wrap')[i].style.display = 'none'
    }
  }

  useEffect(() => {
    //const applicants = job.applicants
    // socket.emit('getApplicants', applicants)
    // socket.on('showApplicants', (users) => {
    //     console.log(users);
    //     setApplicants(users)
    // })
  }, [])

  return (
    <div id='wrapper' className={styles.wrapper} onClick={setModalClosed}>
        <div className={styles.modal}>
            <span>{job.position}</span>, {job.location}
            <div className="">
                <div className="">{'<'}</div>
                <div className="">
                    {job.applicants.map((applicant,i) => {
                        return (
                            <>
                            <div className={styles.box}>
                                <Link to={`/account/:${applicant.id}?type=user`}>
                                    <h3>{applicant.name}</h3>
                                </Link>
                                <div className="">
                                    <button>CV</button>
                                    <button onClick={() => showCoverLetter(applicant,i)}>Cover Letter</button>
                                </div>
                                <div className="wrap">
                                    <div className="coverletter"></div>
                                </div>
                            </div>
                            <p>{i+1} / {job.applicants.length}</p>
                            </>
                        )
                    })}
                </div>
                <div className="">{'>'}</div>
            </div>
        </div>
    </div>
  )
}
