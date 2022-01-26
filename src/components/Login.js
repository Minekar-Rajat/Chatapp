import React from 'react';
import firebase from 'firebase/app';
import { auth } from '../firebase';
import { GoogleOutlined } from '@ant-design/icons';

const Login = () => {
    return (
        <div id='login-page'>
            <div id='login-card'>
                <h2>Welcome !</h2>

                <div className='login-button google' onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}>
                    Sign in with <GoogleOutlined />
                </div>


            </div>
        </div>
    );
}

export default Login;
