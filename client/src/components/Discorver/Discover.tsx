import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { convertDatetoTime, isEmpty } from '../../Utils';

export default function Discover() {

    const postsData = useSelector((state:any) => state.postsReducer);

    const [state, setState] = useState({
        isLoad: false
    });

    useEffect(() => {
        if(!isEmpty(postsData))
            setState((state) => ({...state, isLoad: true}));
    }, [postsData])

    return (
        <div className='discover-container'>
            <div className="discover-content">
                {state.isLoad ? (
                    <>
                        {postsData.sort((a:any,b:any) => convertDatetoTime(b.createdAt) - convertDatetoTime(a.createdAt)).map((post:any, key:number) => {
                            return (
                                <div className="post" id={post._id} key={key}>
                                    <img src={`${process.env.REACT_APP_CDN_URL}/posts/${post.medias[0]}`} alt="Post-img" />
                                </div>
                            )
                        })} 
                    </>
                ): (
                    <p>Loading</p>
                )} 
            </div>
        </div>
    )
}
