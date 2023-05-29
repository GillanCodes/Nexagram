import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { isEmpty } from '../../Utils';

export default function PostBox({ post } : { post: any}) {
    var img:number = 0;

    const postsData = useSelector((state:any) => state.postsReducer);
    const userData = useSelector((state:any) => state.usersReducer);

    const [state, setState] = useState({
        isLoad: false
    });

    const [imgIndex, setImgIndex] = useState(0);

    useEffect(() => {
        console.log(postsData)
        if (!isEmpty(postsData)){
            setState((state:any) => ({...state, isLoad: true}));
        };
    }, [postsData]);

    const postDisplay = async (e:any, type:string, id:string) => {
        const images = post.medias.length;
        const postBody:any = document.getElementById(`${id}-box`);
        const boxWidth = 700;

        if (type === "next")
        {   
            setImgIndex(imgIndex + 1);
            img = imgIndex + 1;
            postBody.style.marginLeft = (boxWidth * -(img)) + "px";
        }

        if (type === "prev")
        {            
            setImgIndex(imgIndex-1);
            img = imgIndex - 1; 
            postBody.style.marginLeft = (boxWidth * -(img)) + "px";
        }
    }

    return (
        <div className='post-view-container'>
            {state.isLoad && (
                <>
                    <div className="post-box">
                        <div className="post-header">
                            {userData.map((user:any) => {
                                if (user._id === post.posterId)
                                {
                                    return (
                                        <>
                                            <img className='avatar' src={`${process.env.REACT_APP_CDN_URL}/profile/${user.avatar}`} alt="" />
                                            <a className='username' href={`/u/${user.username}`}>{user.username}</a>
                                        </>
                                    )
                                }
                            })}
                        </div>
                        <div className="post-box-body">
                            {post.medias.length > 1 && (
                                <div className="icons">
                                    {imgIndex !== 0 && (<p id="post-prev-btn" onClick={(e) => postDisplay(e, "prev", post._id)}>previous</p>)} 
                                    {imgIndex !== post.medias.length - 1 && (<p id="post-next-btn" onClick={(e) => postDisplay(e, "next", post._id)}>next</p>)}
                                </div>
                            )}
                            <div className="post-body" id={`${post._id}-box`}>
                                {post.medias.map((media:string) => {
                                    return <img className='medias' src={`${process.env.REACT_APP_CDN_URL}/posts/${media}`} alt="image pots" />
                                })}
                            </div>
                            <div className="paginations">
                                {post.medias.length > 1 && post.medias.map((media:string, key:number) => {
                                    return <div id={`pagination-${key}`} className={imgIndex === key ? 'pagination active' : 'pagination'}></div>
                                })}
                            </div>
                        </div>
                        <div className="post-footer">
                            <p>{post.likers.length} Likes</p>
                            <p>{post.comments.length} Coms</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
