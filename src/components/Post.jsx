import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navigation } from './Navigation'
import styles from '../styles/Post.module.css'
import { io, Socket } from 'socket.io-client'
import { Description } from './recipe-post/Description'
import { Ingredients } from './recipe-post/Ingredients'
import { Instructions } from './recipe-post/Instructions'
import ReactDOM from "react-dom";

const socket = io.connect('http://localhost:4000')

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

// const FIELD_3 = {
//   CATEGORY: "title",
//   FILE: "file"
// }

export const Post = ({userId}) => {

  const {TITLE,FILE} = FIELD_1  
  const {DESCRIPTION,INGREDIENTS,INSTRUCTIONS} = FIELD_2

  const [step2,setStep2] = useState(false)
  const [active,setActive] = useState(true)
  const [values_1,setValues_1] = useState({[TITLE]: "", [FILE]: ""})
  const [values_2,setValues_2] = useState({[DESCRIPTION]: "",[INGREDIENTS]: "",[INSTRUCTIONS]: ""})
  const [list,setList] = useState([])
  const [steps,setSteps] = useState([])
  const [id,setId] = useState('')
  const [category,setCategory] = useState('')
  const [hashtag,setHashtag] = useState('')
  const [hashtags,setHashtags] = useState([])
  const navigate = useNavigate()
  
  useEffect(() => {
    socket.on('handledStep1',(result) => {
      console.log('Client: receiving handledStep1', result);
      setId(result._id.toString())
    })

    socket.on('showPost', (post) => {
      console.log('Client: receiving showPost', post);
      navigate(`/post/:${post._id.toString()}`)
    })
  },[]) 

  console.log(userId);

  const handleStep1 = (e) => {
    e.preventDefault()
    setStep2(true)
    console.log('Client: emmiting post-step1');
    socket.emit('post-step1', values_1)
  }

  const handleSubmission = (e) => {
    e.preventDefault()
    const data = {
      id: id,
      description: values_2[DESCRIPTION],
      titleIng: values_2[INGREDIENTS],
      titleInstr: values_2[INSTRUCTIONS],
      ings: list,
      steps: steps,
      author: userId,
      category: category,
      hashtags: hashtags
    }
    console.log('Client: emmiting post-submit', data);
    socket.emit('post-submit', data)
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

  const handleStepSetting = (innerSteps) => {
    setSteps(prev => prev.concat(innerSteps))
  }

  const [descList, setDescList] = useState([])

  const addDescription = (e) => {
    e.preventDefault()
    setDescList(prev => prev.concat(<Description description={values_2[DESCRIPTION]} 
    handleChange2={handleChange2} />))

  }
  const addIngredients = (e) => {
    e.preventDefault()
    setDescList(prev => prev.concat(<Ingredients handleChange2={handleChange2} 
                     ingredients={values_2[INGREDIENTS]} 
                     addToList={(ings) => setList(prev => prev.concat(ings))} 
                     removeFromList={(values) => setList(prev => prev.filter(item => item.name !== values[2]))}/>))
  }
  const addInstructions = (e) => {
    e.preventDefault()
    setDescList(prev => prev.concat(<Instructions handleChange2={handleChange2} 
                      instructions={values_2[INSTRUCTIONS]} 
                      addSteps={handleStepSetting} />))
  }

  const addCategory = (e) => {
    e.preventDefault()
    document.getElementById('category').value = e.target.innerHTML
    setCategory(e.target.innerHTML)
  }


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
      <input type="submit" value="Next" onClick={active ? handleStep1 : notActive}/>
    </form>

      {step2 && 
      <form id="Step2">
        <div className="">
          <Description description={values_2[DESCRIPTION]} 
                       handleChange2={handleChange2} />
        </div>
        
        <Ingredients handleChange2={handleChange2} 
                     ingredients={values_2[INGREDIENTS]} 
                     addToList={(ings) => setList(prev => prev.concat(ings))} 
                     removeFromList={(values) => setList(prev => prev.filter(item => item.name !== values[2]))}/>
        
        <Instructions handleChange2={handleChange2} 
                      instructions={values_2[INSTRUCTIONS]} 
                      addSteps={handleStepSetting} />
        {descList}
        <div className="">
          Add more:
          <button className={styles.block} onClick={addDescription}>Description</button>
          <button className={styles.block} onClick={addIngredients}>Ingredients</button>
          <button className={styles.block} onClick={addInstructions}>Instructions</button>
        </div>
        <div className="">
          Add Category:
          <input type="text" 
                 name="category" 
                 id="category"
                 vslue={category}
                 placeholder="E.g: Meat, Fish, Dessert, etc..." 
                 onChange={({target: {value, name}}) => {
                  setCategory(value)
                  console.log(category);
                 }} />
          {/* <button>Save</button> */}
          <div className="">
            My Categories:
            <button onClick={addCategory}>Meat</button>
            <button onClick={addCategory}>Fish</button>
            <button onClick={addCategory}>Dessert</button>
          </div>
        </div>
        <div className="">
          Add Hashtags: {hashtags.map(h => <button>{h}</button> )}
          <input type="text" 
                 name="category" 
                 placeholder="Type here..."
                 value={hashtag}
                 onChange={({target: {value, name}}) => {
                  setHashtag(value)
                 }} />
          <button onClick={(e) => {
            e.preventDefault()
            setHashtags(prev => prev.concat(hashtag))
            setHashtag('')
          }}>Add Hashtag</button>
        </div>
        {/* <Link to={`/post/:${id}`}> */}
          <input type="submit" value="Next" onClick={handleSubmission}/>
        {/* </Link> */}
      </form> 
      }
    </div>
    </>
  )
}
