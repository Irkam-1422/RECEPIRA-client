import React, {useState}  from 'react'

const FIELD = {
    LANGUAGE: "language",
    LEVEL: "level"
}

export const Language = ({handleSetting}) => {

const {LANGUAGE,LEVEL} = FIELD
  const [values,setValues] = useState({
      [LANGUAGE]: "",
      [LEVEL]: ""
  })

  const handleChange = ({target: {value, name}}) => {
    setValues({...values, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSetting(values)
  }

  return (
    <div>
        <div className="">
            <table>
                <tr>
                    <td>
                        <input type="text" 
                               name="language"
                               value={values[LANGUAGE]}
                               onChange={handleChange}
                               id="" 
                               placeholder='English'
                        />
                    </td>
                    <td>
                        <input type="text" 
                               name="level"
                               value={values[LEVEL]}
                               onChange={handleChange}
                               id="" 
                               placeholder='Native'
                        />
                    </td>
                </tr>
            </table>
        </div>
        <button onClick={handleSubmit}>Save</button>
    </div>
  )
}
