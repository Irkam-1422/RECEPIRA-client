import React, {useState, useEffect} from 'react'
//import io from 'socket.io-client'
import { Link } from 'react-router-dom'
import styles from '../styles/Messages.module.css'
import { Message } from './Message'
//import { Message } from '../Message' 

//const socket = io.connect('http://localhost:4000')

export const Messages = ({socket, userId, chatId, type}) => {

  const [user,setUser] = useState(null)
  const [chats,setChats] = useState([])
  const [chat,setChat] = useState(null)
  const [chatID,setChatID] = useState(chatId)
  const [message,setMessage] = useState('')
  const [messages,setMessages] = useState([])

  useEffect(() => {
    //console.log('messages', messages);
    if (type == 'user') {
      socket.emit('getUser', userId)
      socket.on('showUser', (user) => handleOnLoad(user))
    } else if (type == 'restaurant') {
      socket.emit('getRestaurant', userId)
      socket.on('showRestaurant', (restaurant) => handleOnLoad(restaurant))
    } else {
      console.log('no type')
    }
    socket.on('chatJoined', (chat) => {
      console.log('joined to', chat);
      setChat(chat)
      setMessages(chat.messages)
    }) 

    socket.on('message', (msg) => {
      setMessages(prev => prev.concat(msg))
    })
  },[])

  const handleOnLoad = (user) => {
    setUser(user)
    setChats(user.chats)   

      user.chats.length ? setChat(user.chats[0]) : setChat(null)

      const check = user.chats.map(chat => chat.users.filter(u => u.id == chatID).length).includes(1)
      //console.log(user.chats)   
      if (check) {
        console.log('chat exists')
        console.log('joining chat')  
        if (chat) socket.emit('joinChat', {chat,userId}) 
      } else if (chatID) {
        console.log('chat doesn`t exist')
        socket.emit('createChat', {userId,chatId})
      } else if (chat) {
        console.log('joining chat', chat)  
        socket.emit('joinChat', {chat,userId}) 
      } else {
        console.log('check:', check,'chatID:', chatID,'chat:', chat,)
      }
  }
 
  const handleChange = ({target: {value, name}}) => {
      setMessage(value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!message) return
    //const chatId = chat.users.map(u => u.id).filter(u => u.id !== userId)[0]
    const msg = {message: message, from: userId}
    socket.emit('sendMessage', {msg,chat})
    setMessage('')
  } 

  const handleClick = (chat) => {
    setChat(chat)
    setMessages(chat.messages)
    socket.emit('joinChat', {chat,userId}) 
  }

  return (
    <div> 
      <div className={styles.main}>
        <div className={styles.users_container}>
          <div className={styles.users_header}>
            {user ? user.name : ''}  
            <button className={styles.new}>New</button>
          </div>
          <div className="users">
            {chats.length ? chats.map(ch => {
              const person = ch.users.filter(u => u.id !== userId)[0]
              return (
                <div className={chat.room == ch.room ? `${styles.selected} ${styles.user}` : styles.user}>
                  <div className={styles.avatar} 
                      style={ person.avatar ? 
                      {backgroundImage: `url(${require(`../images/${person.avatar}`)})`}
                      : {backgroundImage: `url(${require(`../images/cook-avatar.png`)})`} } 
                                ></div>
                  <div onClick={() => handleClick(ch)}>{person.name}</div>

                  {user.messages.length !== 0 && <div className={user.messages.filter(m => m.room == ch.room)[0] ? styles.unread : styles.none}>
                    {user.messages.filter(m => m.room == ch.room)[0] && user.messages.filter(m => m.room == ch.room)[0].unread}
                  </div>}

                </div>
              )
            })
             : chat ? <div className={`${styles.selected} ${styles.user}`}>
                <div className={styles.avatar}></div>
                <div onClick={() => handleClick(chat)}>{chat.users.filter(u => u.id !== userId)[0].name}</div>
                {user && user.messages && user.messages.length && <div className={user.messages.filter(m => m.room == chat.room)[0] ? styles.unread : styles.none}>
                    {user.messages.filter(m => m.room == chat.room)[0] && user.messages.filter(m => m.room == chat.room)[0].unread}
                  </div>}
            </div>
           : 'There has been no chats yet'}
          </div> 
        </div>
        <div className={styles.chat_container}>
          {/* <Link to={chat ? `/account/:${chat.users.filter(u => u.id !== userId)[0]._id.toString()}?type=user` : ''}> */}
              <div className={styles.chat_header}>{chat ? chat.users.filter(u => u.id !== userId)[0].name : ''}</div>
          {/* </Link> */}
          <div className={styles.chatbox}>
            <div className={styles.msg_container}>
              {chat ? messages ? <Message messages={messages} userId={userId}/> : 'There has been no messages yet' : 'Select a chat'}
            {/* messages.map(message => <div className="">{message.message}</div> */}
            </div>
            <form onSubmit={handleSubmit} className={styles.form}> 
              <div className={styles.form}> 
                <input className={styles.input} 
                    type="text" 
                    placeholder='Type here...'
                    name='message'
                    value={message}
                    onChange={handleChange}/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
