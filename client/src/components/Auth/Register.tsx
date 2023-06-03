import axios from 'axios';
import React, { useState } from 'react'

export default function Register() {

  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    fullname: ""
  });
  
  const submitHandle = (e:React.FormEvent) => {
        e.preventDefault();

        axios({
            method:"POST",
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/auth/register`,
            data: {
              username: state.username,
              fullname: state.fullname,
              email: state.email,
              password: state.password
            }
        }).then((res) => {
            if (res.data.errors) return console.log("err");
            const win:Window = window;
            win.location = '/auth';
        }).catch((err) => {
            console.log(err);
        });
    }

  return (
    <div className='auth-container'>
      <div className="content">
        <form onSubmit={submitHandle}>
          <input className="input" type="email" name="email" id="email" placeholder='Email' onChange={(e) => setState(state => ({...state, email: e.target.value}))} />
          <input className="input" type="text" name="username" id="username" placeholder='Username' onChange={(e) => setState(state => ({...state, username: e.target.value}))} />
          <input className="input" type="text" name="fullname" id="fullname" placeholder='Full Name' onChange={(e) => setState(state => ({...state, fullname: e.target.value}))} />
          <input className="input" type="password" name="password" id="password" placeholder='Password' onChange={(e) => setState(state => ({...state, password: e.target.value}))} />
          <input type="submit" value="Register" className='button' />
        </form>
      </div>
    </div>
  )
}
