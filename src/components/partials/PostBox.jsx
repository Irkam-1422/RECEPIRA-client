import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../../styles/Search.module.css'

export const PostBox = ({post}) => {
  return (
    <div className={styles.allPost}
         style={ post.file ? 
         {backgroundImage: `url(${require(`../../images/${post.file}`)})`}
         : {backgroundImage: `url(${require(`../../images/cook-avatar.png`)})`} } 
    >
        <Link to={`/post/:${post._id}`}>
            <h3 className={styles.postH3}>{post.title}</h3> 
        </Link>
        <div style={{marginLeft: '5px'}}> 
            {post.category && <button className={styles.restBtn}>{post.category}</button>}
            <button className={styles.restBtn}>↑ {post.likes.length}</button>
        </div>
    </div>
  )
}
