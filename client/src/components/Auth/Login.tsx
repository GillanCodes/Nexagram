import axios from 'axios';
import React, { useState } from 'react'
import { isEmpty } from '../../Utils';

export default function Login() {

    const [errors, setErrors]:[errors:any, setErrors:any] = useState();
    const [state, setState] = useState({email: "", password: ""});

    const submitHandle = (e:React.FormEvent) => {
        e.preventDefault();

        axios({
            method:"POST",
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/auth/login`,
            data: {
                email: state.email,
                password: state.password
            }
        }).then((res) => {
            if (res.data.errors) return setErrors(res.data.errors);
            const win:Window = window;
            win.location = '/';
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className='auth-container'>
            <div className="content">
                <form onSubmit={(e) => submitHandle(e)}>
                    <p className='error'>{!isEmpty(errors) && errors.log}</p>
                    <input className={!isEmpty(errors) && !isEmpty(errors.log) ? "input error" : "input"} type="email" name="email" id="email" placeholder='Email' onChange={(e) => setState({...state, email:e.target.value})} />
                    <p className='error'>{!isEmpty(errors) && errors.password}</p>
                    <input className={!isEmpty(errors) && !isEmpty(errors.password) ? "input error" : "input"} type="password" name="password" id="password" placeholder='Password' onChange={(e) => setState({...state, password:e.target.value})} />
                    <input className="button" type="submit" value="Login!" />
                </form>
            </div>
        </div>
    )
}
