import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { isEmpty } from '../../Utils';
import { useDispatch } from 'react-redux';
import { likePost, unlikePost } from '../../actions/posts.action';

export default function PostBox({ post } : { post: any}) {
    var img:number = 0;

    const postsData = useSelector((state:any) => state.postsReducer);
    const usersData = useSelector((state:any) => state.usersReducer);
    const userData  = useSelector((state:any) => state.userReducer);

    const dispatch:any = useDispatch();

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

    const likeHandle = () => {
        dispatch(likePost(post._id));
    }

    const unlikeHandle = () => {
        dispatch(unlikePost(post._id));
    }

    return (
        <div className='post-view-container'>
            {state.isLoad && (
                <>
                    <div className="post-box">
                        <div className="post-header">
                            {usersData.map((user:any) => {
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
                            <div className="info like">
                                <p>{post.likers.includes(userData._id) ? (<i onClick={unlikeHandle} className="fa-solid fa-heart"></i>) : (<i onClick={likeHandle} className="fa-regular fa-heart"></i>)}</p>
                                <p>{post.likers.length}</p>
                            </div>
                            <div className="info comments">
                                <p><i className="fa-regular fa-heart"></i></p>
                                <p>{post.comments.length}</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
