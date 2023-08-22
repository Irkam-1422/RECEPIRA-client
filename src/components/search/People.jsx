import React from 'react'
import styles from '../../styles/Search.module.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:4000')

export const People = ({open, result, resultPosts}) => {

  const [bestUsers, setBestUsers] = useState([])
  const [posts, setPosts] = useState([])

  //console.log(resultPosts);

  useEffect(() => {
    //console.log(resultPosts);
    if (open) {
        socket.emit('getPopularUsers') 
        socket.on('showPopularUsers', (best) => {
            setBestUsers(best)
    
            // best.forEach((user) => {
            //     socket.emit('getPosts', user._id.toString())
            // })
        })
    } 
    socket.emit('getAllPosts')
        socket.on('showPosts', (posts) => {
            //console.log('creations:',creations);
            setPosts(posts) 
        })
  }, [])

  const getResultsPosts = () => {
    console.log('getResultsPosts');
        setPosts([])
        result.forEach((user) => {
            console.log('getPosts for',user.name);
            socket.emit('getPosts', user._id.toString())
    })
  }

  return (
    <div className="">
        <h2>Top Users:</h2>
        {open && bestUsers.map(person => {
            return (
                <div className={styles.peopleBlock}>
                    <div className={styles.flexCol}>
                        {/* <button>Follow</button> */}
                        <Link to={`/account/:${person._id.toString()}?type=user`}>
                            <div className={styles.peopleAvatar}
                                 style={ person.avatar ? 
                                    {backgroundImage: `url(${require(`../../images/${person.avatar}`)})`}
                                    : {backgroundImage: `url(${require(`../../images/cook-avatar.png`)})`} } 
                                >
                                {/* style={ user.avatar ? 
                            {backgroundImage: `url(${require(`../../images/${user.avatar}`)})`}
                            : {backgroundImage: `url(${require(`../../images/cook-avatar.png`)})`} } */}
                            </div>
                        </Link>
                        <Link to={`/account/:${person._id.toString()}?type=user`}>
                            <div className={styles.textCenter}>{person.name}</div>
                        </Link>
                        <div className={styles.textCenter}>{person.position}</div>
                    </div>
                    <div className={styles.postsWrap}>
                        {posts.filter(p => p.author == person._id.toString()).map((post,i) => {
                            if (i < 4) {
                                return (
                                    <div className={styles.allPost} 
                                         style={ post.file ? 
                                         {backgroundImage: `url(${require(`../../images/${post.file}`)})`}
                                         : {backgroundImage: `url(${require(`../../images/cook-avatar.png`)})`} } 
                                        >
                                        <Link to={`/post/:${post._id.toString()}`}>
                                            <h3 className={styles.postH3}>{post.title}</h3>
                                        </Link>
                                        {post.category && <button className={styles.restBtn}>{post.category}</button>}
                                        <button className={styles.restBtn}>↑ {post.likes.length}</button>
                                        <br />
                                        {posts[bestUsers.indexOf(person)].length > 4
                                         && i == 3 
                                         && <div className={styles.darken}> 
                                                +{posts[bestUsers.indexOf(person)].length - 4} 
                                        </div> }
                                    </div>
                                ) 
                            } else {
                                return ''
                            }
                        })}
                        {/* {person.creations.map(creation => {
                            return (
                                <div className={styles.peoplePost}>{creation.title}</div>
                            )
                        })} */}
                    </div>
                </div>
            )
        })}
        {!open && result.map(person => {
            return (
                <div className={styles.peopleBlock}>
                    <div className={styles.flexCol}>
                        {/* <button>Follow</button> */}
                        <Link to={`/account/:${person._id.toString()}?type=user`}>
                            <div className={styles.peopleAvatar}>
                                {person._id.toString().slice(-3)}
                            </div>
                        </Link>
                        <Link to={`/account/:${person._id.toString()}?type=user`}>
                            <div className={styles.textCenter}>{person.name}</div>
                        </Link>
                        <div className={styles.textCenter}>{person.position}</div>
                    </div>
                    <div className={styles.postsWrap}>
                        {resultPosts[result.indexOf(person)] && resultPosts[result.indexOf(person)].map((post,i) => {
                            if (i < 4) {
                                return (
                                    <div className={styles.peoplePost}>
                                        {post.title}
                                        <br />
                                        {post.author.slice(-3)}
                                        {resultPosts[result.indexOf(person)].length > 4
                                         && i == 3 
                                         && <div className={styles.darken}> 
                                                +{resultPosts[result.indexOf(person)].length - 4} 
                                        </div> }
                                    </div>
                                ) 
                            } else {
                                return ''
                            }
                        })}
                        {/* {person.creations.map(creation => {
                            return (
                                <div className={styles.peoplePost}>{creation.title}</div>
                            )
                        })} */}
                    </div>
                </div>
            )
        })}
    </div>
  )
}
