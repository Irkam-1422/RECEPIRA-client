import React from 'react'

export const Description = ({description,handleChange2}) => {
  return (
    <div className="">
          <textarea name="description" 
                    id="" 
                    cols={30} 
                    rows={10} 
                    placeholder="Add some description..."
                    value={description} 
                    onChange={handleChange2}
                  ></textarea>
        </div>
  )
}
