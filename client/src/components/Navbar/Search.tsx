import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { isEmpty } from '../../Utils';

export default function Search() {
  
    const usersData = useSelector((state:any) => state.usersReducer);

    const [state, setState] = useState({
        load: false,
        drop: false,
        search: "",
    });
 
    useEffect(() => {
        if (!isEmpty(usersData))
            setState((state) => ({...state, load: true}));
    }, [usersData])

    useEffect(() => {
        if (state.search.length >= 3)
            setState((state) => ({...state, drop:true}));
        else setState((state) => ({...state, drop:false}));
    }, [state.search]);

    return (
        <div className='search-box'>
            <div className="search-input">
                <input type="text" placeholder='Search WIP' className="input" onChange={(e) => setState((state) => ({...state, search: e.target.value}))} />
            </div>
            {state.drop && state.load && (
                <div className="search-dropdown">
                    {usersData.map((user:any) => {
                        if (user.username.toLowerCase().includes(state.search.toLocaleLowerCase()))
                            return(
                                <div className="user">
                                    <img src={`${process.env.REACT_APP_CDN_URL}/profile/${user.avatar}`} alt="" className='avatar' />
                                    <a className='username' href={`/u/${user.username}`}>{user.username}</a>
                                </div>
                            )
                    })}
                </div>
            )} 
        </div>
    )
}
