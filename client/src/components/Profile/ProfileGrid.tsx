import React, { useEffect, useState } from 'react'
import { IUser } from '../../interfaces/user.interface'
import { useSelector } from 'react-redux'
import { convertDatetoTime, isEmpty } from '../../Utils';

export default function ProfileGrid({user}:{user:IUser}) {

  var userPosts:object = [];

  const postsData = useSelector((state:any) => state.postsReducer);

  const [state, setState] = useState({
    isLoad: false
  });

  useEffect(() => {
    if(!isEmpty(postsData)) {
      setState(state => ({...state, isLoad:true}));
    }
  }, [postsData]);

  const postDisplay = (id:string) => {
    const win:Window = window;
    win.location = `/p/${id}`
  }

  return (
    <div className='profile-feed'>
      <div className="content">
          {state.isLoad && (
          <>
            {postsData.sort((a:any,b:any) => convertDatetoTime(b.createdAt) - convertDatetoTime(a.createdAt)).map((post:any) => {
              if (post.posterId === user._id) {
                return (
                  <div className="post" onClick={() => postDisplay(post._id)}>
                    <div className="icons">
                      <p>{post.likers.length} LIKES !</p>
                      <p>{post.comments.length} Coms</p>
                    </div>
                    <img className='post-cover' src={`${process.env.REACT_APP_CDN_URL}/posts/${post.medias[0]}`} alt="" />
                  </div>
                )
              }
            })}
          </>
        )}
      </div>
    </div>
  )
}
