import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { convertDatetoTime, isEmpty } from '../../Utils';

export default function Suggest() {

    const usersData = useSelector((state:any) => state.usersReducer);
    const userData = useSelector((state:any) => state.userReducer);

    const [load, setLoad] = useState(false);

    var users:Array<object> = [];

    useEffect(() => {
        for (let index = 0; index < 3; index++) {
            var rdm = Math.floor(Math.random() * usersData.length)
            if (usersData[rdm]._id === userData._id)
                if (rdm > 1) rdm--
                else rdm++
            users.push(usersData[rdm]);
        }
        console.log(users)
    }, [usersData]);

    useEffect(() => {
        if (!isEmpty(users) && users.length === 3)
            setLoad(true);
    }, [users])

    return (
        <div className='suggest'>
            {load && (
                <>
                    {usersData.sort((a:any,b:any) => convertDatetoTime(b.updatedAt) - convertDatetoTime(a.updatedAt)).slice(0,3).map((user:any) => {
                        return (
                            <div className="box">
                                <img src={`${process.env.REACT_APP_CDN_URL}/profile/${user.avatar}`} alt="avatar" className="avatar" />
                                <p className='username'>{user.username}</p>
                                <p>{user.fullname}</p>
                                <button className='button'>Follow !</button>
                            </div>
                        )
                    })}
                </>
            )}
        </div>
    );
}
