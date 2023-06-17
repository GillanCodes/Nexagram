import React, { useEffect, useState } from 'react'
import io from "socket.io-client";
import { isEmpty } from '../../Utils';
import { useParams } from 'react-router-dom';

export default function ChatRoom() {

    const {id} = useParams();
    const [socket, setSocket]:[socket:any, setSocket:any] = useState();

    const [state, setState] = useState({
        isChatLoad: false
    });
    const [chat, setChat]:[chat:any, setChat:any] = useState();

    useEffect(() => {
        const s = io(`${process.env.REACT_APP_SOCKET}`)
        setSocket(s);

        return () => {
            s.disconnect();
        }
    }, []);

    useEffect(() => {
        if (!isEmpty(socket))
            socket.emit('get-chat', {id: id});
    }, [socket]);

    useEffect(() => {
        if(!isEmpty(socket))
            socket.on('send-chat', (chatData:any) => {
                setChat(chatData);
            });
    })

    useEffect(() => {
        if (!isEmpty(chat))
            setState((state) => ({...state, isChatLoad: true}));
    }, [chat])

    return (
        <div className='container'>
            {state.isChatLoad && (
                <p>{chat.id}</p>
            )}
        </div>
    )
}
