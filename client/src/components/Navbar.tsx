import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { isEmpty } from '../Utils';
import axios from 'axios';

export default function Navbar() {

    const userData = useSelector((state:any) => state.userReducer);

    const [state, setState] = useState({isLogged: false});

    useEffect(() => {
        if (!isEmpty(userData))
            setState({...state, isLogged:true});
    }, [userData]);

    const logoutHandle = () => {
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}/auth/logout`,
            withCredentials:true
        }).then((res) => {
            const win:Window = window;
            win.location = '/';
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <nav className="main-nav">
            <div className="container">
                <div className="content">
                    <div className="items">
                        <NavLink className={"item"} to="/">
                            Home
                        </NavLink>
                        {!state.isLogged ? (
                            <>
                                <NavLink className={"item"} to="/auth">
                                    Auth
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink className={"item"} to={"/profile"}>
                                    {userData.username}
                                </NavLink>
                                <a className="item" onClick={logoutHandle}>
                                    Logout
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
