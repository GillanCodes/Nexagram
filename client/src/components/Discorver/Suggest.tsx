import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { isEmpty } from '../../Utils';
import FollowButton from '../Profile/FollowButton';

var users:any = [];

export default function Suggest() {

    const usersData = useSelector((state:any) => state.usersReducer);
    const userData = useSelector((state:any) => state.userReducer);

    const [load, setLoad] = useState(false);

    useEffect(() => {
        for (let index = 0; index < 3; index++) {
            var rdm = Math.floor(Math.random() * usersData.length)
            if (usersData[rdm]._id === userData._id)
                if (rdm > 1) rdm--
                else rdm++
            users.push(usersData[rdm]);
        }
    }, [usersData]);

    useEffect(() => {
        if (!isEmpty(users))
            setLoad(true);
    }, [users])

    return (
        <div className='suggest'>
            {load && (
                <>
                    {users.map((user:any) => {
                        return (
                            <div className="box">
                                <img src={`${process.env.REACT_APP_CDN_URL}/profile/${user.avatar}`} alt="avatar" className="avatar" />
                                <p className='username'>{user.username}</p>
                                <p>{user.fullname}</p>
                                <FollowButton userData={userData} usersData={user} />
                            </div>
                        )
                    })}
                </>
            )}
        </div>
    );
}
