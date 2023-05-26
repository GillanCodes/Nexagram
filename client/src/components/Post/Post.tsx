import React, { useEffect, useState } from 'react'
import { isEmpty } from '../../Utils';
import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/posts.action';
import { useSelector } from 'react-redux';

var filesArr:any = [];

export default function Post() {

    const dispatch:any = useDispatch();
    const userData = useSelector((state:any) => state.userReducer);

    const [caption, setCaption] = useState("");

    const [state, setState] = useState({
        isLoad: false
    })
    const [files, setFiles] : [files:any, setFiles:any] = useState([]);
    const [dataFile, setDataFile] : [dataFile:any, setDataFile:any] = useState();

    const filesAddHandle = async(files:any) => {
        setDataFile(files);
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
    };

    return (
        <div className='post-container'>        
            <div className="post-content">
                <input type="file" multiple onChange={(e) => filesAddHandle(e.target.files)}  />
                {state.isLoad && (
                    <>
                        {files.map((file:any) => {
                            return (
                                <img style={{height:'250px', width:"250px", objectFit:"cover"}} src={file} alt="file" />
                            )
                        })}
                        <input type="text" name="caption" id="caption" onChange={(e) => setCaption(e.target.value)}  />
                        <button onClick={createPostHandle}>Post !</button>
                    </>
                )}
            </div>
        </div>
    )
}
