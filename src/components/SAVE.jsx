import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navigation } from './Navigation'
import styles from '../styles/Post.module.css'
import { io, Socket } from 'socket.io-client'
import { Description } from './Description'
import { Ingredients } from './Ingredients'
import { Instructions } from './Instructions'

const socket = io.connect('http://localhost:4000')

const headerStyle = {
  paddingLeft: '0',
  fontSize: '20px',
  border: 'none'
}

const titleStyle = {
  paddingLeft: '0',
  fontSize: '24px',
  border: 'none'
}

const  FIELD_1 = {
    TITLE: "title",
    FILE: "file"
}

const  FIELD_2 = {
  DESCRIPTION: "description",
  INGREDIENTS: "titleIng",
  INSTRUCTIONS: "titleInstr"
}

// const INGS = {
//   AMOUNT: "amount",
//   VALUE: "value",
//   NAME: "name"
// }

const STEP = {
  TEXT: "text",
  PHOTO: "photo"
}


export const Post = () => {

  const {TITLE,FILE} = FIELD_1  
  const {DESCRIPTION,INGREDIENTS,INSTRUCTIONS} = FIELD_2
  //const {AMOUNT,VALUE,NAME} = INGS
  const {TEXT,PHOTO} = STEP  

  const [step2,setStep2] = useState(false)
  const [active,setActive] = useState(true)
  const [values_1,setValues_1] = useState({[TITLE]: "", [FILE]: ""})
  const [values_2,setValues_2] = useState({[DESCRIPTION]: "",[INGREDIENTS]: "",[INSTRUCTIONS]: ""})
  //const [ings,setIngs] = useState({[AMOUNT]: "", [VALUE]: "",[NAME]: ""})
  const [step,setStep] = useState({[TEXT]: "", [PHOTO]: ""})
  const [list,setList] = useState([])
  const [steps,setSteps] = useState([])
  const [open,setOpen] = useState(false)
  const [imported,setImported] = useState({})

  // useEffect(() => {
  //   const title = document.getElementById('title').value
  //   const file = document.getElementById('file').value
  //   if (title && file) setActive(true)
  //   console.log(title,file,active);
  // }, [active])
  
  useEffect(() => {
    socket.on('handledStep1',({result}) => {
      console.log(result)
    })
  },[]) 

  const handleStep1 = (e) => {
    e.preventDefault()
    setStep2(true)
    console.log('in handleStep1');
    socket.emit('post-step1', values_1)
  }

  const notActive = (e) => {
    e.preventDefault()
  }

  const handleChange = ({target: {value, name}}) => {
    setValues_1({...values_1, [name]: value})
  }

  const handleChange2 = ({target: {value, name}}) => {
    setValues_2({...values_2, [name]: value})
    console.log(values_2);
  }

  // const handleChangeIng = ({target: {value, name}}) => {
  //   setIngs({...ings, [name]: value})
  // }

  // const handleChangeStep = ({target: {value, name}}) => {
  //   setStep({...step, [name]: value})
  //   console.log(step);
  // }

  const handleStepSetting = (innerSteps) => {
    setSteps(prev => prev.concat(innerSteps))
  }

  // const handleAddIng = (e) => {
  //   e.preventDefault()
  //   setList(prev => prev.concat(ings))
  //   setIngs({[AMOUNT]: "", [VALUE]: "",[NAME]: ""})

  //   const table = document.getElementById('table')
  //   const row = table.insertRow(0)
  //   const cell1 = row.insertCell(0)
  //   const cell2 = row.insertCell(1)
  //   const cell3 = row.insertCell(2)
  //   const cell4 = row.insertCell(3)
  //   cell1.innerHTML = `<input  type="text" 
  //                             placeholder="100"
  //                             name="amount"
  //                             onChange={handleChangeIng}
  //                           />`
  //                           cell1.childNodes[0].value = ings[AMOUNT]                      
  //   cell2.innerHTML = `<input  type="text" 
  //                             placeholder='g'
  //                             name='value'
  //                             onChange={handleChangeIng}
  //                           />`
  //                           cell2.childNodes[0].value = ings[VALUE]   
  //   cell3.innerHTML = `<input  type="text" 
  //                             placeholder='Tomatoes'
  //                             name='name'
  //                             onChange={handleChangeIng}
  //                           />`
  //                           cell3.childNodes[0].value = ings[NAME]   
  //   cell4.innerHTML = `<button>x</button> `     
  //   cell4.childNodes[0].onclick = handleDeleteIng    
  // }

  // const handleDeleteIng = (e) => {
  //   e.preventDefault()
  //   const table = document.getElementById('table')
  //   const cell = e.target.parentElement
  //   const row = cell.parentElement
  //   const i = Array.from(table.rows).indexOf(row) //rowIndex
    
  //   const values = Array.from(row.cells).map(cell => cell.childNodes[0].value)
  //   setList(prev => prev.filter(item => item.name !== values[2]))
    
  //   table.deleteRow(i)
  // } 

  // const handleAddStep = (e) => {
  //   e.preventDefault()
  //   if (!open) {
  //     setOpen(true)
  //   } else {
  //     setSteps(prev => prev.concat(step))
  //     setStep({[TEXT]: "", [PHOTO]: ""})
  //     setOpen(false)
  //   }
  // }

  // const openStep = (e) => {
  //   e.preventDefault()
  //   setOpen(true)
    
  //   let i = +e.target.innerHTML.slice(5,e.target.innerHTML.length).trim()
  //   console.log(i)
  //   setStep(steps[i-1])
  // }


  return (
    <>
    <Navigation />
    <div className="">
     <form action="">
      <div className="">
        <input id='title' 
               type="text" 
               name='title'
               style={titleStyle} 
               value={values_1[TITLE]} 
               onChange={handleChange}
               placeholder='Title'
               autoComplete="off"
               required 
               />
      </div>
      <div className={styles.file}>
        <input id='file' 
               type="file" 
               name='file'
               value={values_1[FILE]} 
               onChange={handleChange}
               />
      </div>
      {/* <Link to={'/post-step2'}> */}
        <input type="submit" value="Next" onClick={active ? handleStep1 : notActive}/>
      {/* </Link> */}
    </form>

      {!step2 && <form className="">
        <div className="">
          {/* <textarea name="description" 
                    id="" 
                    cols="30" 
                    rows="10" 
                    placeholder="Add some description..."
                    value={values_2[DESCRIPTION]} 
                    onChange={handleChange2}
                  ></textarea> */}
          <Description description={values_2[DESCRIPTION]} handleChange2 />
        </div>
        {/* <div className="">
          <input className={styles.headers} 
                 style={headerStyle} 
                 type="text" 
                 placeholder='Ingredients:'
                 name='titleIng'
                 value={values_2[INGREDIENTS]} 
                 onChange={handleChange2}
                />
          <table id='table'>
            <tr>
              <td className={styles.td1}><input type="text" 
                                                placeholder='100'
                                                name='amount'
                                                value={ings[AMOUNT]} 
                                                onChange={handleChangeIng}
                                              /></td>
              <td className={styles.td2}><input type="text" 
                                                placeholder='g'
                                                name='value'
                                                value={ings[VALUE]} 
                                                onChange={handleChangeIng}
                                              /></td>
              <td className={styles.td3}><input type="text" 
                                                placeholder='Tomatoes'
                                                name='name'
                                                value={ings[NAME]} 
                                                onChange={handleChangeIng}
                                              /></td>
              <td><button onClick={handleDeleteIng}>x</button></td>
            </tr>
          </table>
          <button className={styles.full} onClick={handleAddIng}>+</button>
        </div> */}
        {/* Ingredients = ({handleChange2, ingredients, addToList, removeFromList}) */}
        <Ingredients handleChange2 
                     ingredients={values_2[INGREDIENTS]} 
                     addToList={(ings) => setList(prev => prev.concat(ings))} 
                     removeFromList={(values) => setList(prev => prev.filter(item => item.name !== values[2]))}/>
        {/* <div className={styles.columnGroup}>
          <input className={styles.headers} 
                 style={headerStyle} 
                 type="text" 
                 placeholder='Instructions:'
                 name='titleInstr'
                 value={values_2[INSTRUCTIONS]} 
                 onChange={handleChange2}
                />
          <div className="">
            {steps.map((step,i) => <button onClick={openStep}>Step {i+1} </button> )}
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
          <button onClick={handleAddStep}>{ !open ? `Add step ${steps.length + 1}` : `Save`}</button>
        </div> */}
        {/* Instructions = ({handleChange2,instructions,steps,addSteps}) */}
        <Instructions handleChange2 instructions={values_2[INSTRUCTIONS]} addSteps={handleStepSetting} />

        <div className="">
          Add more:
          <button className={styles.block}>Ingredients</button>
          <button className={styles.block}>Instructions</button>
          <button className={styles.block}>Description</button>
        </div>
        <Link to={`/post?id=`}>
          <input type="submit" value="Next"/>
        </Link>
      </form> }
    </div>
    </>
  )
}
