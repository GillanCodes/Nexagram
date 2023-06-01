import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { isEmpty } from '../../Utils';
import { useDispatch } from 'react-redux';
import { createComment } from '../../actions/posts.action';

export default function CommentsBox({post} : {post:any}) {

    const dispatch:any = useDispatch();

    const usersData = useSelector((state:any) => state.usersReducer);
    const userData = useSelector((state:any) => state.userReducer);

    const [state, setState] = useState({
        usersLoad: false,
        myselfLoad: false,
    });

    const [comment, setComment] = useState('');

    useEffect(() => {
        if (!isEmpty(usersData))
            setState((state) => ({...state, usersLoad:true}));
        if (!isEmpty(userData))
            setState((state) => ({...state, myselfLoad:true}));
    }, [usersData, userData]);

    const commentHandle = () => {
        dispatch(createComment(post._id, comment));
        setComment('');
    }

    return (
        <div className='comments-box'>
            <div className="comments-container">
                <div className="comments-content">
                    <div className="comment">
                        <div className="user">
                            {usersData.map((user:any) => {
                                if (user._id === post.posterId)
                                    return (
                                        <>
                                            <img className='avatar' src={`${process.env.REACT_APP_CDN_URL}/profile/${user.avatar}`} alt="" />
                                            <p className='username'>{user.username} :</p>
                                        </>
                                    )
                            })} 
                            <div className="comment-text">
                                <p>{post.caption}</p>
                            </div>
                        </div>
                    </div>
                    {state.usersLoad ? (
                        <>
                            {post.comments.map((comment:any) => {
                                return (
                                    <div className="comment">
                                        <div className="user">
                                            {usersData.map((user:any) => {
                                                if (user._id === comment.commenterId)
                                                    return (
                                                        <>
                                                            <img className='avatar' src={`${process.env.REACT_APP_CDN_URL}/profile/${user.avatar}`} alt="" />
                                                            <p className='username'>{user.username} :</p>
                                                        </>
                                                    )
                                            })} 
                                            <div className="comment-text">
                                                <p>{comment.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                    ) : (
                        <div className="notload">
                            <p>Comments Cant load !</p>
                        </div>
                    )} 
                </div>
                <div className="comments-footer">
                    {state.myselfLoad ? (
                        <>
                            <img className="avatar" src={`${process.env.REACT_APP_CDN_URL}/profile/${userData.avatar}`} alt="avatar" />
                            <input className="comment-input input" type="text" placeholder='My Comment !' onChange={(e:any) => setComment(e.target.value)} />
                            <button className='send-btn' onClick={commentHandle}><i className="fa-solid fa-circle-arrow-right"></i></button>
                        </>
                    ) : (
                        <p>You must be logged to post a comment</p>
                    )}
                </div>
            </div>            
        </div>
    )
}
