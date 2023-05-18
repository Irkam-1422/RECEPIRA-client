import React from 'react'
import styles from '../../styles/Search.module.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:4000')

const people = [{
    name: 'Name Surname',
    position: 'position',
    creations: [{title: 'post_1'},{title: 'post_2'},{title: 'post_3'}]
},{
    name: 'Name Surname',
    position: 'position',
    creations: [{title: 'post_1'},{title: 'post_2'},{title: 'post_3'}]
},{
    name: 'Name Surname',
    position: 'position',
    creations: [{title: 'post_1'},{title: 'post_2'},{title: 'post_3'}]
},{
    name: 'Name Surname',
    position: 'position',
    creations: [{title: 'post_1'},{title: 'post_2'},{title: 'post_3'}]
},{
    name: 'Name Surname',
    position: 'position',
    creations: [{title: 'post_1'},{title: 'post_2'},{title: 'post_3'}]
}]

export const People = () => {

  const [bestUsers, setBestUsers] = useState([])
  const [posts, setPosts] = useState([])

  useEffect(() => {
    socket.emit('getPopularUsers') 
    socket.on('showPopularUsers', (best) => {
        setBestUsers(best)

        best.forEach((user) => {
            socket.emit('getPosts', user._id.toString())
        })
    })
    socket.on('showMyPosts', (creations) => {
        console.log('creations:',creations);
        setPosts(prev => [...prev, creations]) 
    })
  }, [])

  console.log('posts:',posts);

  return (
    <div className="">
        <h2>Top Users:</h2>
        {bestUsers.map(person => {
            return (
                <div className={styles.peopleBlock}>
                    <div className={styles.flexCol}>
                        <button>Follow</button>
                        <Link to={`/account/:${person._id.toString()}?type=user`}>
                            <div className={styles.peopleAvatar}></div>
                        </Link>
                        <Link to={`/account/:${person._id.toString()}?type=user`}>
                            <div className={styles.textCenter}>{person.name}</div>
                        </Link>
                        <div className={styles.textCenter}>{person.position}</div>
                    </div>
                    <div className={styles.postsWrap}>
                        {posts[bestUsers.indexOf(person)] && posts[bestUsers.indexOf(person)].map((post,i) => {
                            if (i < 4) {
                                return (
                                    <div className={styles.peoplePost}>
                                        {post.title}
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
    </div>
  )
}
