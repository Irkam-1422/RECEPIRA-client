import React, {useState}  from 'react'

const FIELD = {
    AWARD: "award",
    ORGANISATION: "organisation",
    YEAR: "year",
    DESCRIPTION: "description",
    FILE: "file"
}

export const Award = ({handleSetting}) => {

  const {AWARD,ORGANISATION,YEAR,DESCRIPTION,FILE} = FIELD
  const [values,setValues] = useState({
      [AWARD]: "",
      [ORGANISATION]: "",
      [YEAR]: "",
      [DESCRIPTION]: "",
      [FILE]: ""
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
            Award
            <input type="text" 
                   name="award" 
                   value={values[AWARD]}
                   onChange={handleChange}
                   id=""
                   placeholder='Certificate, dimploma, award, etc...' 
            />
        </div>
        <div className="">
            Organisation
            <input type="text" 
                   name="organisation" 
                   value={values[ORGANISATION]}
                   onChange={handleChange}
                   id=""
                   placeholder='Who gave you this?' 
            />
        </div>
        <div className="">
            Year
            <input type="text" 
                   name="year" 
                   value={values[YEAR]}
                   onChange={handleChange}
                   id=""
                   placeholder='2023' 
            />
        </div>
        <div className="">
            <textarea name="description" 
                      value={values[DESCRIPTION]}
                      onChange={handleChange}
                      id="" 
                      cols="30" 
                      rows="10"
                      placeholder="Description...">
            </textarea>
        </div>
        <div className="">
            Upload your reward here
            <input type="file" 
                   name="file"
                   value={values[FILE]} 
                   onChange={handleChange}
                   id="" />
        </div>
        <button onClick={handleSubmit}>Save</button>
    </div>
  )
}
