import React, { useState } from 'react'
import styles from '../../styles/Post.module.css'

const headerStyle = {
  paddingLeft: '0',
  fontSize: '20px',
  border: 'none'
}

const INGS = {
  AMOUNT: "amount",
  VALUE: "value",
  NAME: "name"
}

export const Ingredients = ({handleChange2, ingredients, addToList, removeFromList}) => {

  const {AMOUNT,VALUE,NAME} = INGS
  const [ings,setIngs] = useState({[AMOUNT]: "", [VALUE]: "",[NAME]: ""})

  const handleChangeIng = ({target: {value, name}}) => {
    setIngs({...ings, [name]: value})
  }

  const handleAddIng = (e) => {
    e.preventDefault()
    //setList(prev => prev.concat(ings))
    addToList(ings)
    setIngs({[AMOUNT]: "", [VALUE]: "",[NAME]: ""})

    const table = document.getElementById('table')
    const row = table.insertRow(0)
    const cell1 = row.insertCell(0)
    const cell2 = row.insertCell(1)
    const cell3 = row.insertCell(2)
    const cell4 = row.insertCell(3)
    cell1.innerHTML = `<input  type="text" 
                              placeholder="100"
                              name="amount"
                              onChange={handleChangeIng}
                            />`
                            cell1.childNodes[0].value = ings[AMOUNT]                      
    cell2.innerHTML = `<input  type="text" 
                              placeholder='g'
                              name='value'
                              onChange={handleChangeIng}
                            />`
                            cell2.childNodes[0].value = ings[VALUE]   
    cell3.innerHTML = `<input  type="text" 
                              placeholder='Tomatoes'
                              name='name'
                              onChange={handleChangeIng}
                            />`
                            cell3.childNodes[0].value = ings[NAME]   
    cell4.innerHTML = `<button>x</button> `     
    cell4.childNodes[0].onclick = handleDeleteIng    
  }

  const handleDeleteIng = (e) => {
    e.preventDefault()
    const table = document.getElementById('table')
    const cell = e.target.parentElement
    const row = cell.parentElement
    const i = Array.from(table.rows).indexOf(row) //rowIndex
    
    const values = Array.from(row.cells).map(cell => cell.childNodes[0].value)
    //setList(prev => prev.filter(item => item.name !== values[2]))
    removeFromList(values)
    
    table.deleteRow(i)
  } 

  return (
    <div className="">
    <input className={styles.headers} 
           style={headerStyle} 
           type="text" 
           placeholder='Ingredients:'
           name='titleIng'
           value={ingredients} 
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
  </div>
  )
}
