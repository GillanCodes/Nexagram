import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { isEmpty } from '../../Utils';
import PostBox from './PostBox';

export default function Post() {

    const { id } = useParams();
    const postsData = useSelector((state:any) => state.postsReducer);

    const [state, setState] = useState({
        isLoad: false
    })

    useEffect(() => {
        console.log(postsData)
        if (!isEmpty(postsData)){
            setState((state:any) => ({...state, isLoad: true}));
        };
    }, [postsData]);

    return (
        <div className='post-container'>
            {state.isLoad && (
                <>
                    {postsData.map((post:any) => {
                        if (post._id.toString() === id)
                            return (
                               <PostBox post={post} /> 
                            )
                    })}
                </>
            )}
        </div>
    )
}
