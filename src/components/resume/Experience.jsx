import React, { useState } from 'react'

const FIELD = {
    POSITION: "position",
    COMPANY: "company",
    FROM: "from",
    UNTIL: "until",
    DESCRIPTION: "description"
}

export const Experience = ({handleSetting}) => {

  const {POSITION,COMPANY,FROM,UNTIL,DESCRIPTION} = FIELD
  const [values,setValues] = useState({
      [POSITION]: "",
      [COMPANY]: "",
      [FROM]: "",
      [UNTIL]: "",
      [DESCRIPTION]: ""
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
        <form action="">
            <div className="">
                Position
                <input type="text" 
                    name="position"
                    value={values[POSITION]}
                    onChange={handleChange} 
                    id=""
                    placeholder='Meat Specialist'
                />
            </div>
            <div className="">
                Company
                <input type="text" 
                    name="company"
                    value={values[COMPANY]}
                    onChange={handleChange} 
                    id=""
                    placeholder='Reataurant name'
                />
            </div>
            <div className="">
                From
                <input type="text" 
                    name="from"
                    value={values[FROM]}
                    onChange={handleChange} 
                    id=""
                    placeholder='September, 2022'
                />
            </div>
            <div className="">
                Until
                <input type="text" 
                    name="until"
                    value={values[UNTIL]}
                    onChange={handleChange} 
                    id="" 
                    placeholder='May, 2023'
                />
            </div>
            <div className="">
                <textarea name="description"
                        value={values[DESCRIPTION]}
                        onChange={handleChange} 
                        id="" 
                        cols="30" 
                        rows="10"
                        placeholder='Describe what did you do there...'
                ></textarea>
            </div>
            <button onClick={handleSubmit}>Save</button>
        </form>
    </div>
  )
}
