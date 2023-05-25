import axios from 'axios';
import React, { useState } from 'react'

export default function Login() {

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
            if (res.data.errors) return console.log("err");
            const win:Window = window;
            win.location = '/';
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div>
            <form onSubmit={(e) => submitHandle(e)}>
                <input type="email" name="email" id="email" onChange={(e) => setState({...state, email:e.target.value})} />
                <input type="password" name="password" id="password" onChange={(e) => setState({...state, password:e.target.value})} />
                <input type="submit" value="Login!" />
            </form>
        </div>
    )
}
