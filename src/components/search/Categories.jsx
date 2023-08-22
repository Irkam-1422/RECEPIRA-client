import React, { useEffect } from 'react'
import styles from '../../styles/Search.module.css'
import io from 'socket.io-client'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const socket = io.connect('http://localhost:4000')

const categories = ["Meat","Fish","Vegetarian","Snacks","Salads","Sauces","Desserts","Drinks","Pastry"]

export const Categories = ({open, result}) => {

  const [bestPosts, setBestPosts] = useState([])  
  const [category,setCategory] = useState('')
  const [posts,setPosts] = useState([]) 
  const [ctgs,setCtgs] = useState(true)

  useEffect(() => {
    if (open) {
        socket.emit('getPopularPosts')
        socket.on('showPopularPosts', (best) => {
            setBestPosts(best)
        })
    } 
  }, [])

  useEffect(() => {
    socket.on('showCategoryPosts', (posts) => {
        setPosts(posts)
    })
  }, [category])

  const handleCategoryChange = (e) => {
    setCategory(e.target.innerHTML)
    socket.emit('getByCategory', category)
  }

  return (
    <>
    {open && <div className="">
        <div className={styles.oneLine}>
            {ctgs && <h2>Popular Categories:</h2> }
            <button className={styles.sm} 
                    style={ctgs ? {marginLeft: '10px'} : {}} 
                    onClick={() => setCtgs(prev => !prev)}>
                {ctgs ? 'close' : 'open categories'}
            </button>
        </div>
        {ctgs && <table>
            {categories.map((category,i) => i%3 == 0 ? <tr>
            <td className={styles.td} onClick={handleCategoryChange} 
            style={{backgroundImage: `url(${require(`../../images/${category}.png`)})`}} >{category}</td>
            <td className={styles.td} onClick={handleCategoryChange} 
            style={{backgroundImage: `url(${require(`../../images/${categories[i+1]}.png`)})`}}>{categories[i+1]}</td>
            <td className={styles.td} onClick={handleCategoryChange} 
            style={{backgroundImage: `url(${require(`../../images/${categories[i+2]}.png`)})`}}>{categories[i+2]}</td>
            </tr> : '' )}
            <tr className={styles.td} >
                <td className={styles.td} colspan="3" onClick={() => setCategory('')}>Popular Posts</td>
            </tr>
        </table>}
    </div>}
    {category == '' && <div className="">
        <h2>Popular Posts:</h2>
        {open && <div className={styles.allWrap}>
            {bestPosts.map((post) => {
                return (
                    <Link to={`/post/:${post._id.toString()}`}>
                        <div className={styles.allPost}
                                 style={ post.file ? 
                                    {backgroundImage: `url(${require(`../../images/${post.file}`)})`}
                                    : {backgroundImage: `url(${require(`../../images/cook-avatar.png`)})`} } 
                                >
                            <h3 className={styles.postH3}>{post.title}</h3>
                            {post.category && <button className={styles.restBtn}>{post.category}</button>}
                            <button className={styles.restBtn}>↑ {post.likes.length}</button>
                        </div>
                    </Link>
                )
            })}
        </div>}
        <div className="">
            {!open && <div className={styles.allWrap}>
                {result.map((post) => {
                    return (
                        <Link to={`/post/:${post._id.toString()}`}>
                            <div className={styles.allPost}
                                    style={ post.file ? 
                                        {backgroundImage: `url(${require(`../../images/${post.file}`)})`}
                                        : {backgroundImage: `url(${require(`../../images/cook-avatar.png`)})`} } 
                                    >
                                <h3>{post.title}</h3>
                                {post.category && <button className={styles.restBtn}>{post.category}</button>}
                                <button className={styles.restBtn}>↑ {post.likes.length}</button>
                            </div>
                        </Link>
                    )
                })}
            </div>}
        </div>
    </div>}
    {category !== '' && <div className="">
        <h2>{category}:</h2>
        <div className={styles.allWrap}>
            {posts.map((post) => {
                return (
                    <Link to={`/post/:${post._id.toString()}`}>
                        <div className={styles.allPost}
                                 style={ post.file ? 
                                    {backgroundImage: `url(${require(`../../images/${post.file}`)})`}
                                    : {backgroundImage: `url(${require(`../../images/cook-avatar.png`)})`} } 
                                >
                            <h3>{post.title}</h3>
                            {post.category && <button className={styles.restBtn}>{post.category}</button>}
                            <button className={styles.restBtn}>↑ {post.likes.length}</button>
                        </div>
                    </Link>
                )
            })}
        </div>
    </div>}
    </>
  )
}
