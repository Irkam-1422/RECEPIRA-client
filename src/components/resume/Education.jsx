import React, {useState} from 'react'

const FIELD = {
    INSTITUTION: "institution",
    TYPE: "type",
    FROM: "from",
    UNTIL: "until",
    DESCRIPTION: "description"
}

export const Education = ({handleSetting}) => {

  const {INSTITUTION,TYPE,FROM,UNTIL,DESCRIPTION} = FIELD
  const [values,setValues] = useState({
      [INSTITUTION]: "",
      [TYPE]: "",
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
        <div className="">
            Educational Institution
            <input type="text" 
                   name="institution"
                   value={values[INSTITUTION]} 
                   onChange={handleChange}
                   id=""
                   placeholder='Coocking Colledge no.1'
            />
        </div>
        <div className="">
            Type of education
            <input type="text" 
                   name="type"
                   value={values[TYPE]} 
                   onChange={handleChange}
                   id=""
                   placeholder='Colledge'
            />
            <button>Colledge</button>
            <button>University</button>
            <button>School</button>
            <button>Courses</button>
        </div>
        <div className="">
            From
            <input type="text" 
                   name="from"
                   value={values[FROM]} 
                   onChange={handleChange}
                   id=""
                   placeholder='September, 2011'
            />
        </div>
        <div className="">
            Until
            <input type="text" 
                   name="until"
                   value={values[UNTIL]} 
                   onChange={handleChange}
                   id=""
                   placeholder='June, 2013'
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
    </div>
  )
}
