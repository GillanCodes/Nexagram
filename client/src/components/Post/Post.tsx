import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { isEmpty } from '../../Utils';
import PostBox from './PostBox';

var img = 0;

export default function Post() {

    const { id } = useParams();
    const postsData = useSelector((state:any) => state.postsReducer);
    const userData = useSelector((state:any) => state.usersReducer);

    const [state, setState] = useState({
        isLoad: false
    })

    const [imgIndex, setImgIndex] = useState(0);

    useEffect(() => {
        console.log(postsData)
        if (!isEmpty(postsData)){
            setState((state:any) => ({...state, isLoad: true}));
        };
    }, [postsData]);

    const postDisplay = async (e:any, type:string) => {
        const images = document.getElementsByClassName('medias');
        const postBody:any = document.getElementById('post-img-box');
        const prevBtn:any = document.getElementById('post-prev-btn');
        const nextBtn:any = document.getElementById('post-next-btn');
        const boxWidth = 700;

        if (type === "next")
        {
            if (img >= images.length - 1)
                return;
   
            setImgIndex(imgIndex + 1);
            img++
            postBody.style.marginLeft = (boxWidth * -(img)) + "px";
        }

        if (type === "prev")
        {
            if (img <= 0)
                return
            
            setImgIndex(imgIndex-1);
            img--
            postBody.style.marginLeft = (boxWidth * -(img)) + "px";
        }
    }

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
