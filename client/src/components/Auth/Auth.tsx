import React, { useState } from 'react'
import Login from './Login';
import Register from './Register';

export default function Auth() {

    const [tab, setTab] = useState(0);

    return (
        <div className="container">
            <div className="tabs">
                <p onClick={() => setTab(0)}>Login</p>
                <p onClick={() => setTab(1)}>Register</p>
            </div>
            <div>
                {tab === 0 && (<Login />)}            
                {tab === 1 && (<Register />)}            
            </div>
        </div>

    )
}
