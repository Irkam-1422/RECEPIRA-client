import React, { useState, useEffect } from 'react'
import styles from '../../styles/Post.module.css'

const headerStyle = {
  paddingLeft: '0',
  fontSize: '20px',
  border: 'none'
}

const STEP = {
  TEXT: "text",
  PHOTO: "photo"
}

export const Instructions = ({handleChange2,instructions,addSteps}) => {

  const {TEXT,PHOTO} = STEP 
  const [step,setStep] = useState({[TEXT]: "", [PHOTO]: ""})
  const [open,setOpen] = useState(false)
  const [innerSteps,setInnerSteps] = useState([])
  const [used,setUsed] = useState(-1)

  const handleChangeStep = ({target: {value, name}}) => {
    setStep({...step, [name]: value})
    console.log(step);
  }

  const handleAddStep = (e) => {
    e.preventDefault()
    if (!open) {
      setOpen(true)
    } else if (used !== -1) {
        setInnerSteps(prev => prev.map(st => prev.indexOf(st) === used ? step : st))
        addSteps(innerSteps)
        setStep({[TEXT]: "", [PHOTO]: ""})
        setOpen(false)
        setUsed(-1)
    } else {
      setInnerSteps(prev => prev.concat(step))
      addSteps(innerSteps)
      setStep({[TEXT]: "", [PHOTO]: ""})
      setOpen(false)
    }
  }

  const openStep = (e) => {
    e.preventDefault()
    setOpen(true)
    
    let i = +e.target.innerHTML.slice(5,e.target.innerHTML.length).trim()
    console.log(i)
    setUsed(i-1)
    setStep(innerSteps[i-1])
  }

  return (
    <div className={styles.columnGroup}>
          <input className={styles.headers} 
                 style={headerStyle} 
                 type="text" 
                 placeholder='Instructions:'
                 name='titleInstr'
                 value={instructions} 
                 onChange={handleChange2}
                />
          <div className="">
            {innerSteps.map((step,i) => <button onClick={openStep}>Step {i+1} </button>)}
          </div>
          {open && <div className="">
            <textarea name="text" 
                    id="" 
                    cols="10" 
                    rows="10" 
                    placeholder="Add some description..."
                    value={step[TEXT]} 
                    onChange={handleChangeStep}
                  ></textarea>
            <div className={styles.file}>
              <input id='photo' 
                    type="file" 
                    name='photo'
                    value={step[PHOTO]} 
                    onChange={handleChangeStep}
                    />
            </div>
          </div> }
          <button onClick={handleAddStep}>{ !open ? `Add step ${innerSteps.length + 1}` : `Save`}</button>
        </div>
  )
}
