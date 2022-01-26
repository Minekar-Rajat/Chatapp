import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';


import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';


const Chats = () => {

    const history = useHistory();

    const { user } = useAuth();

    const [loading, setLoading] = useState(true);


    const [newUser, setNewuser] = useState(null);

    const logout = async () => {
        await auth.signOut();
        history.push('/');
    }

    // const getFile = async (url) => {
    //     const resp = fetch(url);
    //     const data = (await resp).blob();

    //     return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' })
    // }



    const getUser = (user) => {
        fetch('https://api.chatengine.io/users/me/', { headers: { "PRIVATE-KEY": "78c3e2bf-6096-4147-bbc8-dfdf6d903285" } })
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




        axios.post('https://api.chatengine.io/users/', postUser, { headers: { "PRIVATE-KEY": "78c3e2bf-6096-4147-bbc8-dfdf6d903285" } })
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
                    Chat App
                </div>
                <div onClick={logout} className='logout-tab'>
                    Logout
                </div>
            </div>

            <ChatEngine height="calc(100vh-66px)" projectID="e6c0bf94-36fc-44ac-97e6-a9953508914a" userName={user.email} userSecret={user.uid} />

        </div>
    );

}

export default Chats;