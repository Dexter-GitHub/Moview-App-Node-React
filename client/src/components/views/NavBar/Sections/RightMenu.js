import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { useSelector } from "react-redux";

function RightMenu(props) {
    const user = useSelector(state => state.user)
    const navigate = useNavigate();

    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then(response => {
            if (response.status === 200) {
                navigate('/login');
            }
            else {
                alert('Log Out Failed');
            }
        });
    };
    
    const menuItems = user.userData && user.userData.isAuth ?
        [
            {
                key: 'logout',
                label: <a href="/" onClick={logoutHandler}>Logout</a>
            }
        ] :
        [
            {
                key: 'mail',
                label: <a href="/login">Signin</a>,
            },
            {
                key: 'app',
                label: <a href="/register">Signup</a>,
            }
        ];

    return <Menu mode={props.mode} items={menuItems} />
}

export default RightMenu
