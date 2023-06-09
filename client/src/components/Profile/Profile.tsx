import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { isEmpty } from '../../Utils';
import { IUser } from '../../interfaces/user.interface';
import ProfileGrid from './ProfileGrid';
import { useDispatch } from 'react-redux';
import { followUser, unfollowUser, updateUser, updateUserSetting } from '../../actions/user.action';
import UploadAvatar from './Modals/UploadAvatar';
import FollowButton from './FollowButton';

export default function Profile() {

    const { username } = useParams();

    const usersData = useSelector((state:any) => state.usersReducer);
    const userData:IUser = useSelector((state:any) => state.userReducer);

    const dispatch:any = useDispatch();

    const [state, setState] = useState({
        isLoad: false,
        isOwner: false,
        editMode: false,
        avatarMode: false,
        isFollow: false
    });

    const [userState, setUserState] = useState({
        _id: "",
        bio: "",
        fullname: ""
    });

    const [isPrivate, setIsPrivate] = useState(false);

    const updateUserHandle = () => {
        dispatch(updateUser(userState));
        setState(state => ({...state, editMode: false}));
        var settings = {
            theme: userData.settings.theme,
            lang: userData.settings.lang,
            isPrivate,
        }
        dispatch(updateUserSetting(userData._id, settings));
    }

    const settingsHandle = (checked:boolean) => {
        setIsPrivate(checked); 
    }   

    const modalHandle = () => {
        setState(state => ({...state, avatarMode:!state.avatarMode}))
    }

    useEffect(() => {
        if (!isEmpty(usersData))
            setState(state => ({...state, isLoad: true}));
        if (!isEmpty(userData) && userData.username === username)
        {
            setState(state => ({...state, isOwner: true}));
            setUserState(state => ({...state, _id: userData._id, bio:userData.bio, fullname:userData.fullname}));
            setIsPrivate(userData.settings.isPrivate);
        }
    }, [usersData, userData]);



    return (
        <div className='profile-container'>
            {state.isLoad && usersData.map((user:IUser) => {
                if (user.username?.toLocaleLowerCase() === username?.toLocaleLowerCase()) 
                    return (
                        <div className="profile-page">
                            <div className="profile-header">
                                <div className="avatar">
                                    <img src={`${process.env.REACT_APP_CDN_URL}/profile/${user.avatar}`} alt="avatar" onClick={() => state.isOwner && modalHandle()} />
                                </div>
                                <div className="infos">
                                    <div className="user">
                                        <div className="username">
                                            <h2>{user.username}</h2>
                                            {state.editMode ? (
                                                <input type="text" value={userState.fullname} onChange={(e) => setUserState(userState => ({...userState, fullname: e.target.value}))} className="input" />
                                            ) : (
                                                <h3>{user.fullname}</h3>
                                            )}
                                        </div>
                                        {!state.isOwner && (
                                            <>
                                               <FollowButton userData={userData} usersData={user} />
                                           </>
                                        )}
                                        {state.isOwner && (<button className='button' onClick={() => state.editMode ? updateUserHandle() : setState(state => ({...state, editMode:!state.editMode}))}>Edit</button>)}
                                        {state.editMode && ( 
                                           <div className="private-switch">
                                                <p>Private account</p>
                                                <label className="switch">
                                                    <input type="checkbox" checked={isPrivate} onChange={(e) => settingsHandle(e.target.checked)} />
                                                    <span className='slider'></span>
                                                </label>
                                           </div> 
                                        )}
                                    </div>
                                    <div className="stats">
                                        <div className="stats-content">
                                            <p>{user.followers.length} follower{user.followers.length > 1 && "s"}</p>
                                            <p>{user.follow.length} follow{user.follow.length > 1 && "s"}</p>
                                        </div> 
                                    </div>
                                    <div className="bio">
                                        {state.editMode ? (
                                            <textarea style={{resize: "none"}} name="bio" cols={60} rows={5} value={userState.bio} onChange={(e) => setUserState(userState => ({...userState, bio:e.target.value}))}></textarea>
                                        ) : (
                                            <p style={{whiteSpace: 'pre-wrap'}} >{user.bio}</p>
                                        )}
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
            {state.avatarMode && ( <UploadAvatar userData={userData} setState={setState} state={state} /> )} 
        </div>
    )
}
