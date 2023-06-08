import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { convertDatetoTime, isEmpty } from '../../Utils';
import PostBox from '../Post/PostBox';
import Suggest from '../Discorver/Suggest';

export default function FollowFeed() {

    const userData = useSelector((state:any) => state.userReducer);
    const postsData:any = useSelector((state:any) => state.postsReducer);

    const [state, setState] = useState({
        isLoad:false
    });

    useEffect(() => {
        if (!isEmpty(userData) && !isEmpty(postsData))
            setState(state => ({...state, isLoad:true}))
    }, [userData, postsData]);

    return (
        <div className='feed'>
            <div className="container">
                <div className="content">
                    {state.isLoad && (
                       <>
                        {isEmpty(userData.follow) ? (
                            <div className="empty-feed">
                                <h2>Discover Peoples !</h2>
                                <a href="/discover">Discover page</a>
                                <Suggest />
                            </div>
                        ) : (
                            <>
                                {postsData.sort((a:any,b:any) => convertDatetoTime(b.createdAt) - convertDatetoTime(a.createdAt)).map((post:any) => {
                                    if (userData.follow.includes(post.posterId))
                                    {
                                        return (
                                            <PostBox post={post} comments={false} />
                                        )
                                    }
                                })}
                            </>
                            )}
                        </> 
                    )}
                </div>
            </div>
        </div>
    )
}
