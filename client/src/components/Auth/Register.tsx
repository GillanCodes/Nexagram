import React, { useState } from 'react'

export default function Register() {

  const [state, setState] = useState({
    username: "",
    email: "",
    password: ""
  })

  return (
    <div className='auth-container'>
      <div className="content">
        <form>
          <input className="input" type="text" name="username" id="username" placeholder='Username' />
          <input className="input" type="email" name="email" id="email" placeholder='Email' />
          <input className="input" type="password" name="password" id="password" placeholder='Password' />
          <input type="submit" value="Register" className='button' />
        </form>
      </div>
    </div>
  )
}
