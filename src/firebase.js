
import firebase from 'firebase/app';
import 'firebase/auth';


export const auth = firebase.initializeApp({
    apiKey: "AIzaSyA4Ww1nJOtB1-dACu8j4OWuCkm2I1g7vJ4",
    authDomain: "chatapp-d7ac0.firebaseapp.com",
    projectId: "chatapp-d7ac0",
    storageBucket: "chatapp-d7ac0.appspot.com",
    messagingSenderId: "689793419824",
    appId: "1:689793419824:web:82e67d37345461b7dc7bf5",
    measurementId: "G-SQTDEDRGKL"
}).auth();