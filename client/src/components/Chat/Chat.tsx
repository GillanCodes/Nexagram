import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import io from "socket.io-client";
import { isEmpty } from '../../Utils';


export default function Chat() {

    const [socket, setSocket]:[socket:any, setSocket:any] = useState();
    const [message, setMessage] = useState("");

    const userData = useSelector((state:any) => state.userReducer);

    useEffect(() => {
        const s = io(`${process.env.REACT_APP_SOCKET}`);
        setSocket(s);

        return () => {
            s.disconnect();
        }
    }, []);

    const sendHandle = (e:any) => {
        e.preventDefault();
        var data = {
            message,
            users: [userData._id],
            sender: userData._id
        }
        socket.emit('new-message', data);
    };

    useEffect(() => {
        if (!isEmpty(socket))
            socket.emit('get-chat')
    }, [socket])

    return (
        <div>
            <form onSubmit={(e:any) => sendHandle(e)}>
                <input type="text" name="" id="" onChange={(e) => setMessage(e.target.value)}/>
                <input type="submit" value="send" />
            </form>
        </div>
    )
}
