import React, {useEffect, useState} from 'react'
import styles from '../styles/Recipe.module.css'
import io from 'socket.io-client'
import { useLocation, useNavigate } from 'react-router-dom'
import { Navigation } from './Navigation'

const socket = io.connect('http://localhost:4000')

export const Recipe = () => {

  const [post,setPost] = useState({})
  const [ingTitle,setIngTitle] = useState([])
  const [ingList,setIngList] = useState([])
  const [stepsTitle,setStepsTitle] = useState([])
  const [steps,setSteps] = useState([])
  const [hashtags,setHashtags] = useState([])
  const [author,setAuthor] = useState({})
  const { search } = useLocation()

  useEffect(() => {
    const queryString = window.location.href.split(':')
    const id = queryString[queryString.length-1]
    console.log('Client: emmiting post-access', id);
    socket.emit('post-access', id)
  },[search])

  useEffect(() => {
    socket.on('showPost',(post) => {

      console.log('Client: receiving showPost', post)
      setPost(post)

      console.log('Client: emmiting getUser', post.author);
      socket.emit('getUser', post.author)
      // setIngList(JSON.parse(post.ingredients.items))
      // setIngTitle(prev => prev.concat(post.ingredients.titleIng))
      // setSteps(JSON.parse(post.instructions.steps))
      // setStepsTitle(prev => prev.concat(post.instructions.titleInstr))
      // setHashtags(post.hashtags)
      // console.log(post)
    })
    socket.on('showUser',(user) => {
      console.log('Client: receiving showUser', user)
      setAuthor(user)
    })
  },[])

  //console.log(post.ingredients.titleIng);

  return (
    <>
    <div className={styles.container}>
      <header>
        <button>Back</button>
        <h3>{post.title}</h3>
        <button>Like</button>
        <button>Save</button>
        <button>Comment</button>
      </header>
      {post.hashtags && post.instructions && post.ingredients && <div className="">
        <div className={styles.box}>
          <div className={styles.image}></div>
          <div className={styles.row}>
            <h1 className={styles.title}>{post.title}</h1>
            <button className="">{post.category}</button>
          </div>
          <div className={styles.author}>
            <div className={styles.avatar}></div>
            <div className="">
              <h3 className="">{author.name}</h3>
              <div className="">
                {post.hashtags.split('*').map((h) => <button>{h}</button>)}
              </div>
            </div>
            <button>+ Follow</button>
          </div>
        </div>
        <div className={styles.box}>
          <h2>{post.ingredients.titleIng}</h2>
            <table>
              {JSON.parse(post.ingredients.items).map(ing => <tr>
                <td className={styles.td1}>{ing.amount}</td>
                <td>{ing.value}</td>
                <td className={styles.td3}>{ing.name}</td>
              </tr> )} 
            </table>
        </div>
        <div className={styles.box}>
          <h2>{post.instructions.titleInstr} </h2>
            <table>
              {JSON.parse(post.instructions.steps).map((step,i) => {
                    return (<>
                      {JSON.parse(post.instructions.steps).length > 1 && <div className={styles.step}>Step {i}</div> }
                        <tr>
                          <td className={styles.next}>{step.text}</td>
                          {step.photo !== '' && <td>{step.photo}</td>}
                        </tr>
                      </>)
                  })} 
            </table>
        </div>
      </div>}
      </div>
      </>
  )
}
