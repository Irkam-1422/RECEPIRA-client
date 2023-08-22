import React, {useEffect, useState} from 'react'
import styles from '../styles/Recipe.module.css'
//import io from 'socket.io-client'
import { useLocation, useNavigate } from 'react-router-dom'
import { Navigation } from './Navigation'

//const socket = io.connect('http://localhost:4000')

export const Recipe = ({socket, userId}) => {

  const [post,setPost] = useState({})
  const [current,setCurrent] = useState({}) 
  const [liked,setLiked] = useState(false)
  const [following,setFollowing] = useState(false)
  const { search } = useLocation()
  const [editing,setEditing] = useState(false) 

  const [description,setDescription] = useState('')
  const [ingredients,setIngredients] = useState([])
  const [instructions,setInstructions] = useState([])

  const [steps,setSteps] = useState([])
  const [grid,setGrid] = useState('auto auto auto')

  useEffect(() => {
    const queryString = window.location.href.split(':')
    const id = queryString[queryString.length-1]
    socket.emit('post-access', id)
    socket.emit('getUserRe', userId)
  },[search])

  useEffect(() => {
    socket.on('authorAdded', (post) => {
      console.log('authorAdded') 
      setPost(post) 
    })
    socket.on('showPost',(post) => {
      setPost(post)
      setDescription(post.description)
      setIngredients(post.ingredients.items)
      setInstructions(post.instructions.steps)

      if (!post.author_info) {
        console.log('no author_info') 
        const userId = post.author
        const postId = post._id.toString()   
        socket.emit('setAuthor', {userId,postId}) 
      }

      if (post.instructions && post.instructions.steps) {
      //   for (let step of post.instructions.steps) {
      //     console.log(step)
      //   // if (step.text && step.text.length > 330) setGrid('auto auto')
      //   // if (step.text && step.text.length > 770) setGrid('auto')
      // }
        post.instructions.steps.forEach(step => {
          if (step.text && step.text.length > 330) setGrid('auto auto')
          if (step.text && step.text.length > 770) setGrid('auto')
        })
      }
    })

    socket.on('showUserRe',(user) => {
      setCurrent(user) 
    })

    socket.on('liked', () => {
      setLiked(prev => !prev)
    })

    socket.on('recipeUpdated', (post) => {
      setPost(post)
      setEditing(false)
      setSteps([])
    })
  },[])

  const handleLikePost = () => {
    const postId = post._id.toString()
    socket.emit('like-post', {postId,userId})
  }

  const handleDescriptionChange = ({target: {value, name}}) => {
    setDescription(value)
  }

  const handleIngChange = ({target: {value, name}}, i) => {
    setIngredients(prev => [...prev.slice(0,i) ,{...prev[i],[name]: value}, ...prev.slice(i+1)])
  }

  const handleInstrChange = ({target: {value, name}}, i) => {
    setInstructions(prev => [...prev.slice(0,i), {...prev[i],[name]: value},  ...prev.slice(i+1)])
  }

  const handleAddStep = () => {
    setInstructions(prev => [...prev, {amount: '', value: '', name: ''}])
    const i = instructions.length
    setSteps(prev => [...prev, <div  className={styles.instr}>
        <div className={styles.step}>{i+1}</div>
        <textarea className={styles.textarea} 
          name="text" 
          value={instructions[i] && instructions[i].text}
          onChange={(e) => handleInstrChange(e,i)}
          id="" 
          cols="30" 
          rows="10">{instructions[i] && instructions[i].text}
        </textarea>
      </div>])
  }

  const handleSubmit = () => {
    console.log(post._id.toString())
    const data = {
      id: post._id.toString(),
      description: description ? description : '',
      ingredients: ingredients ? ingredients : [], 
      instructions: instructions ? instructions.filter(inst => inst.text) : []
    }
    socket.emit('editRecipe', data)
  }

  return (
    <>
    <div className={styles.container}>
      <header className={styles.header}> 
        <button className={styles.btn}>Back</button>
        <h3 className={styles.titleSm}>{post.title}</h3> 
        <button onClick={handleLikePost} className={liked ? `${styles.btn} completed` : styles.btn}>{liked ? 'Liked' : 'Like'}</button>
        <button className={styles.btn}>Save</button>
        <button className={styles.btn}>Comment</button>
      </header>
      {post.hashtags && post.instructions && post.ingredients && <div className="">
        <div className={styles.header_box}>
          <div className={styles.image}
              style={ post.file ? 
                {backgroundImage: `url(${require(`../images/${post.file}`)})`}
                : {backgroundImage: `url(${require(`../images/cook-avatar.png`)})`} } 
            >
            </div>
          <div className={styles.info}>
            <div className={styles.row}>
              <h1 className={styles.title}>{post.title}</h1>
              <button className={`${styles.ctgBtn} pink`} >{post.category}</button>
            </div> 
            <div className={styles.author}>
              <div className={styles.avatar} style={ post.author_info && post.author_info.avatar.length ?
                          {backgroundImage: `url(${require(`../images/${post.author_info.avatar}`)})`}
                          : {backgroundImage: `url(${require(`../images/cook-avatar.png`)})`} } ></div>
              <div className={styles.author_info}>
                <h3 className={styles.author_name}>{post.author_info && post.author_info.name}</h3>
                {userId !== post.author ? <button className={current.following && current.following.includes(post.author) ? `${styles.follow} completed` : `${styles.follow}`}>
                  {current.following && current.following.includes(post.author) ? 'Following' : '+ Follow'}  
                </button> : <button className={styles.follow} onClick={() => setEditing(prev => !prev)}>Edit</button> } 
              </div>
            </div>
            <div className="">
              {!editing && <div className={styles.description}>
                {post.description}
              </div>}
              {editing && <textarea name="description" 
                                    className={`${styles.textarea} ${styles.descriptionTxtar}`} 
                                    cols="30" 
                                    rows="10"
                                    value={description}
                                    onChange={handleDescriptionChange}> 
                {post.description}
              </textarea> }
              <div >
                {post.hashtags.map((h) => <button className={styles.hashtag}>{h}</button>)}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.box}>
          <h2>{post.ingredients.titleIng}</h2>
            <table>
              {post.ingredients.items.map((ing,i) => <tr>
                <td className={styles.td1}>
                  {!editing && ing.amount}
                  {editing && <input className={styles.input} 
                               name='amount'
                               type="text" 
                               value={ingredients[i] && ingredients[i].amount}
                               onChange={(e) => handleIngChange(e,i)}/>}
                </td>
                <td className={styles.td2}>
                  {!editing && ing.value}
                  {editing && <input className={styles.input} 
                                     name='value'
                                     type="text" 
                                     value={ingredients[i] && ingredients[i].value}
                                     onChange={(e) => handleIngChange(e,i)}/>}
                </td>
                <td className={styles.td3}>
                  {!editing && ing.name}
                  {editing && <input className={styles.input} 
                                     name='name' 
                                     type="text" 
                                     value={ingredients[i] && ingredients[i].name}
                                     onChange={(e) => handleIngChange(e,i)}/>}
                </td>
              </tr> )} 
            </table>
        </div>
        <div className={styles.box}>
          <h2>{post.instructions.titleInstr} </h2>
            {/* <table>
              {JSON.parse(post.instructions.steps).map((step,i) => {
                    return (<>
                      {JSON.parse(post.instructions.steps).length > 1 && <div className={styles.step}>{i+1}</div> }
                        <tr>
                          <td className={styles.next}>{step.text}</td>
                          {step.photo !== '' && <td>{step.photo}</td>}
                        </tr>
                      </>)
                  })} 
            </table> */}
            <div className={styles.instrs} style={{gridTemplateColumns: grid}}> 
            {post.instructions.steps && post.instructions.steps.map((step,i) => {
                    return (<>
                        <div  className={styles.instr}>
                          {post.instructions.steps.length > 1 && <div className={styles.step}>{i+1}</div> }
                          {!editing && <div className={styles.next}>{step.text}</div>}
                          {editing && <textarea className={styles.textarea} 
                                                name="text" 
                                                value={instructions[i] && instructions[i].text}
                                                onChange={(e) => handleInstrChange(e,i)}
                                                id="" 
                                                cols="30" 
                                                rows="10">{step.text}</textarea> }
                          {/* {step.photo !== '' && <td>{step.photo}</td>} */}
                        </div>
                      </>)
                  })} 
                  {steps}
                  {editing && <div className={styles.instr} onClick={handleAddStep}>+ Add Step</div>}
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>}
      </div>
      </>
  )
}
