import React, { useEffect } from 'react'
import styles from '../../styles/Search.module.css'
import io from 'socket.io-client'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const socket = io.connect('http://localhost:4000')

const categories = ["Meat","Fish","Vegetarian","Snacks","Salades","Sauces","Desserts","Drinks","Pastry"]

export const Categories = () => {

  const [bestPosts, setBestPosts] = useState([])  
  const [category,setCategory] = useState('')
  const [posts,setPosts] = useState([])

  useEffect(() => {
    socket.emit('getPopularPosts')
    socket.on('showPopularPosts', (best) => {
        setBestPosts(best)
    })
    socket.on('showCategoryPosts', (posts) => {
        setPosts(posts)
    })
  }, [])

  const handleCategoryChange = (e) => {
    setCategory(e.target.innerHTML)
    socket.emit('getByCategory', category)
  }

  return (
    <>
    <div className="">
        <h2>Popular Categories:</h2>
        <table>
            {categories.map((category,i) => i%3 == 0 ? <tr>
            <td className={styles.td} onClick={handleCategoryChange} >{category}</td>
            <td className={styles.td} onClick={handleCategoryChange} >{categories[i+1]}</td>
            <td className={styles.td} onClick={handleCategoryChange} >{categories[i+2]}</td>
            </tr> : '' )}
        </table>
    </div>
    <div className="">
        <h2>Popular Posts:</h2>
        <div className={styles.allWrap}>
            {bestPosts.map((post) => {
                return (
                    <Link to={`/post/:${post._id.toString()}`}>
                        <div className={styles.allPost}>
                            <h3>{post.title}</h3>
                            {post.category && <button className={styles.restBtn}>{post.category}</button>}
                            <button className={styles.restBtn}>↑ {post.likes}</button>
                        </div>
                    </Link>
                )
            })}
        </div>
    </div>
    </>
  )
}
