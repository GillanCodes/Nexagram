import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { isEmpty } from '../Utils';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateUserSetting } from '../actions/user.action';
import Search from './Navbar/Search';

export default function Navbar() {

    const userData = useSelector((state:any) => state.userReducer);

    const dispatch:any = useDispatch();

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

    const theme = (theme:string) => {
        const data = {
            lang: userData.settings.lang,
            theme,
            isPrivate: userData.settings.isPrivate
        }
        dispatch(updateUserSetting(userData._id, data))
    }

    return (
        <nav className="main-nav">
            <div className="container">
                <div className="content">
                    <div className="items">

                        {!state.isLogged ? (
                            <>
                                <NavLink className={"item"} to="/auth">
                                    Auth
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <div className="group left">
                                    <NavLink className={"item"} to="/">
                                        Home
                                    </NavLink>
                                    <NavLink className={"item"} to={`/discover`}>
                                        Discover
                                    </NavLink>
                                </div>                                
                                <div className="group center">
                                    <Search />
                                </div>
                                <div className="group right">
                                    <NavLink className={"item"} to={`/u/${userData.username}`}>
                                        <img src={`${process.env.REACT_APP_CDN_URL}/profile/${userData.avatar}`} alt="" className="avatar" />
                                        {userData.username}
                                    </NavLink>
                                    <NavLink className={"item"} to={`/post`}>
                                        Post
                                    </NavLink>
                                    <a className="item" onClick={logoutHandle}>
                                        Logout
                                    </a>
                                    <p className="item has-dropdown">
                                        Themes

                                        <div className="dropdown">
                                            <p className='item' onClick={() => theme("default-light")}>Light</p>
                                            <p className='item' onClick={() => theme("default-dark")}>Dark</p>
                                        </div>
                                    </p>
                                </div>
                                {/* <p className='item' onClick={() => theme("default-dark")}>
                                    dark
                                </p>
                                <p className='item' onClick={() => theme("default-light")}>
                                    light
                                </p> */}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
