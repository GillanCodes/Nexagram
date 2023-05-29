import React, { useEffect, useState } from 'react'
import { isEmpty } from '../../Utils'
import { useDispatch } from 'react-redux';
import { followUser, unfollowUser } from '../../actions/user.action';

export default function FollowButton({userData, usersData}:{userData:any, usersData:any}) {
    
    const dispatch:any = useDispatch();

    const [isFollow, setIsFollow] = useState(false);

    const followHandle = (followedId:string) => {
        dispatch(followUser(userData._id, followedId));
        setIsFollow(true);
    }

    const unfollowHandle = (unfollowedId:string) => {
        dispatch(unfollowUser(userData._id, unfollowedId));
        setIsFollow(false);
    }

    useEffect(() => {
        if (!isEmpty(userData) && !isEmpty(usersData))
        {
            if(usersData.followers.includes(userData._id))
                setIsFollow(true);
            else
                setIsFollow(false);
        }
    }, [])

  return (
    <>
        {!isEmpty(userData) ? (
        <>
            {isFollow ? (
                <button className='button' onClick={() => unfollowHandle(usersData._id)}>Unfollow</button>
            ) : (
                <button className='button' onClick={() => followHandle(usersData._id)}>Follow</button>
            )}
        </>
        ) : (
            <p className='button'>Login to follow</p>
        )}
    </>
  )
}
