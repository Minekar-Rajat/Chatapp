import React, { useState, useEffect } from 'react';
import '../App.css';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';

import { ChatEngine } from 'react-chat-engine'


import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

import config from '../cofig';

const Chats = (props) => {

    const history = useHistory();

    const { user } = useAuth();

    const [loading, setLoading] = useState(true);


    const [newUser, setNewuser] = useState(null);

    const logout = async () => {
        await auth.signOut();
        history.push('/');
    }

    const getFile = async (url) => {
        const resp = fetch(url);
        const data = (await resp).blob();

        return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' })
    }



    const getUser = (user) => {
        fetch('https://api.chatengine.io/users/me/', { headers: { "PRIVATE-KEY": config.REACT_CHAT_APP_KEY } })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                if (res.username === user.email) {
                    setLoading(false);
                    setNewuser(res);
                }
            })
            .catch((err) => {
                console.log("Post Error again");
            });
    }

    const postUser = (user) => {
        var postUser = {
            "email": user.email,
            "username": user.email,
            "secret": user.uid
        }

        var userData = new FormData();
        userData.append('email', user.email);
        userData.append('username', user.email);
        userData.append('secret', user.uid);

        getFile(user.photoURL)
            .then((avatar) => {
                userData.append('avatar', avatar, avatar.name);
            })
            .catch((err) => console.log(err));




        axios.post('https://api.chatengine.io/users/', postUser, { headers: { "PRIVATE-KEY": config.REACT_CHAT_APP_KEY } })
            .then((res) => {
                console.log("post success");
                setLoading(false);
            })
            .catch((err) => {
                console.log("Post Error ");
                console.log(err);
            });

    }

    useEffect(() => {
        if (!user) {
            history.push('/');
            return;
        }


        getUser(user);

        if (!newUser) {
            postUser(user);
        }


    }, [user, history, newUser]);


    if (!user || loading)
        return 'Loading...';

    return (
        <div className='chat-page'>
            <div className='nav-bar'>
                <div className='logo-tab'>
                    Chatup
                </div>
                <div onClick={logout} className='logout-tab'>
                    Logout
                </div>
            </div>

            {/* <ChatEngine projectID={config.REACT_CHAT_APP_ID} userName={user.email} userSecret={user.uid} /> */}

            <ChatEngine
                height="calc(100vh-66px)"
                projectID={config.REACT_CHAT_APP_ID}
                userName={user.email}
                userSecret={user.uid}
            />

        </div>
    );

}

export default Chats;