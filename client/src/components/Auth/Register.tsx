import axios from 'axios';
import React, { useState } from 'react'
import { isEmpty } from '../../Utils';

export default function Register() {

  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    fullname: ""
  });
  
  const [errors, setErrors]:[errors:any, setErrors:any] = useState()

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
            if (res.data.errors) return setErrors(res.data.errors);
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
          <p className='error'>{!isEmpty(errors) && errors.email}</p>
          <input className="input" type="email" name="email" id="email" placeholder='Email' onChange={(e) => setState(state => ({...state, email: e.target.value}))} />
          <p className='error'>{!isEmpty(errors) && errors.username}</p>
          <input className="input" type="text" name="username" id="username" placeholder='Username' onChange={(e) => setState(state => ({...state, username: e.target.value}))} />
          <p className='error'>{!isEmpty(errors) && errors.fullname}</p>
          <input className="input" type="text" name="fullname" id="fullname" placeholder='Full Name' onChange={(e) => setState(state => ({...state, fullname: e.target.value}))} />
          <p className='error'>{!isEmpty(errors) && errors.password}</p>
          <input className="input" type="password" name="password" id="password" placeholder='Password' onChange={(e) => setState(state => ({...state, password: e.target.value}))} />
          <input type="submit" value="Register" className='button' />
        </form>
      </div>
    </div>
  )
}
