import React from 'react'
import { Link } from 'react-router-dom'

export const Main = () => {
  return (
    <div>
        <h1>App</h1>
        <div className="btns">
            <Link to={`/sign-up?step=su`}><button>Sign Up</button></Link>
            <Link to={'/sign-up?step=li'}><button>Log In</button></Link>
        </div>
    </div>
  )
}
