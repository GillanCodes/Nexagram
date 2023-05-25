import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { isEmpty } from '../../Utils';
import { IUser } from '../../interfaces/user.interface';
import ProfileGrid from './ProfileGrid';

export default function Profile() {

    const { username } = useParams();
    const usersData = useSelector((state:any) => state.usersReducer);
    const userData:IUser = useSelector((state:any) => state.userReducer);

    const [state, setState] = useState({
        isLoad: false,
        isOwner: false
    });

    useEffect(() => {
        if (!isEmpty(usersData))
            setState(state => ({...state, isLoad: true}));
        if (!isEmpty(userData) && userData.username === username)
            setState(state => ({...state, isOwner: true}));
    }, [usersData, userData]);

    return (
        <div className='profile-container'>
            {state.isLoad && usersData.map((user:IUser) => {
                if (user.username === username?.toLocaleLowerCase()) 
                    return (
                        <div className="profile-page">
                            <div className="profile-header">
                                <div className="avatar">
                                    <img src={`${process.env.REACT_APP_CDN_URL}/profile/${user.avatar}`} alt="avatar" />
                                </div>
                                <div className="infos">
                                    <div className="user">
                                        <h2>{user.username}</h2>
                                        <button className='button'>Follow</button>
                                        {state.isOwner && (<button className='button'>Edit</button>)}
                                    </div>
                                    <div className="stats">
                                        <div className="stats-content">
                                            <p>{user.followers.length} follower{user.followers.length > 1 && "s"}</p>
                                            <p>{user.follow.length} follow{user.follow.length > 1 && "s"}</p>
                                        </div> 
                                    </div>
                                    <div className="bio">
                                        <p>{user.bio}</p>
                                    </div>
                                </div> 
                            </div>
                            <div className="profile-body">
                                {state.isOwner ? (
                                    <ProfileGrid user={user} />
                                ) : (
                                    <>
                                        {user.settings.isPrivate ? (
                                            <>
                                                {!isEmpty(userData) && userData.follow.includes(user._id) ? (
                                                    <ProfileGrid user={user} />
                                                ) : (
                                                    <>
                                                        <p>This user has a private profile !</p>
                                                    </>
                                                )}        
                                            </>
                                        ) : (
                                            <ProfileGrid user={user} />
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    );
            })} 
        </div>
    )
}
