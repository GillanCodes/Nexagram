import React, { useEffect, useState } from 'react'
import { isEmpty } from '../../Utils';
import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/posts.action';
import { useSelector } from 'react-redux';
import PostCropper from './PostCropper';

var filesArr:any = [];
var dataFile:any = [];
var imgIndex:number = 0;

export default function CreatePost() {

    const dispatch:any = useDispatch();
    const userData = useSelector((state:any) => state.userReducer);

    const [caption, setCaption] = useState("");
    const [imgIndexState, setImgIndexState] = useState(0);

    const [state, setState] = useState({
        isLoad: false
    })
    const [files, setFiles] : [files:any, setFiles:any] = useState([]);

    const filesAddHandle = async(files:any) => {
        for (let index = 0; index < files.length; index++) {
            filesArr.push(URL.createObjectURL(files[index]));
        }
        setFiles(filesArr);
    }

    useEffect(() => {
        if(!isEmpty(files))
        {
            setState(state => ({...state, isLoad:true}));
        }
    }, [files])

    useEffect(() => {
        console.log(dataFile);
    }, [dataFile])

    const createPostHandle = () => {
        const data = new FormData()
        for (let index = 0; index < dataFile.length; index++) {
            const element = dataFile[index];
            data.append('files', element)
        }
        data.append('caption', caption);
        data.append("id", userData._id);
        dispatch(createPost(data));
        setImgIndexState(0);
        filesArr = [];
        dataFile = [];
        imgIndex = 0;
    };

    const imageDisplay = (type:string, file:any) => {
        const size:number = files.length;
        
        if (type === "next")
        {
            if (imgIndex >= size) return;
            else 
            {
                imgIndex++;
                setImgIndexState(imgIndex);
                dataFile.push(file);
                return;
            }
        }
        // if (type === "prev")
        // {
        //     if (imgIndex === 0) return;
        //     else
        //     {
        //         imgIndex--
        //         setImgIndexState(imgIndex)
        //     }
        // }
    }

    return (
        <div className='post-container'>        
            <div className="post-content">
                {!state.isLoad && (
                    <div className="files-input">
                        <label htmlFor='files' className='input-title'><i className="fa-solid fa-upload"></i> Files Upload</label>
                        <input type="file" name='files' id='files' multiple onChange={(e) => filesAddHandle(e.target.files)}  />
                        <p className='tips'>You can select multiple files</p>
                    </div>
                )} 
                {state.isLoad && (
                    <>
                        
                        <div className="post-cropper">
                            {files.map((file:any, key:number) => {
                                if (imgIndex === key)
                                {
                                    return (
                                        <PostCropper img={file} imageDisplay={imageDisplay} />
                                    )
                                }
                            })}
                        </div>
                        {imgIndex === files.length  && (
                            <div className="form">
                                <p className='title'>Caption your post !</p>
                                <input className='input' type="text" name="caption" id="caption" placeholder="I have captioned my pics !" onChange={(e) => setCaption(e.target.value)}  />
                                <button className='button' onClick={createPostHandle}>Post !</button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
