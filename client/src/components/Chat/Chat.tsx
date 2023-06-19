import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import io from "socket.io-client";
import { isEmpty } from '../../Utils';


export default function Chat() {

    const [state, setState] = useState({isLoad:false});
    const [socket, setSocket]:[socket:any, setSocket:any] = useState();
    const [message, setMessage] = useState("");

    const userData = useSelector((state:any) => state.userReducer);
    const usersData = useSelector((state:any) => state.usersReducer);

    useEffect(() => {
        if (!isEmpty(usersData) && !isEmpty(userData))
            setState((state) => ({...state, isLoad:true}))
    }, [usersData, userData])

    useEffect(() => {
        const s = io(`${process.env.REACT_APP_SOCKET}`);
        setSocket(s);

        return () => {
            s.disconnect();
        }
    }, []);

    useEffect(() => {
        if (socket !== undefined)
            socket.on('new-chat-created', (chat:any) => {
                const w:Window = window;
                w.location = `/chat/${chat._id}`    
            });
    }, [socket])

    const createChat = (user:any) => {
        var data = {
            owner: userData._id,
            users: [user._id],
            name: `${userData.username} - ${user.username}`
        };

        socket.emit('new-chat', data);
    }

    const sendHandle = (e:any) => {
        e.preventDefault();
        var data = {
            message,
            users: [userData._id],
            sender: userData._id
        }
        socket.emit('new-message', data);
    };



    return (
        <div>
            {state.isLoad && usersData.map((user:any) => {
                if (user._id !== userData._id)
                    return (
                        <div>
                            <p onClick={() => createChat(user)} >{user.username}</p>
                        </div>
                    )
            })}
        </div>
    )
}
