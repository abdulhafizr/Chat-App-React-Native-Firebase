import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDt-yJoCTNrM11W9NsYnoTYqsn3dfr1Bac",
    authDomain: "ahr-chat-de2b8.firebaseapp.com",
    databaseURL: "https://ahr-chat-de2b8-default-rtdb.firebaseio.com",
    projectId: "ahr-chat-de2b8",
    storageBucket: "ahr-chat-de2b8.appspot.com",
    messagingSenderId: "179796544020",
    appId: "1:179796544020:web:cf60ad792b21535d8bf501",
    measurementId: "G-PBGJP95S24"
};

firebase.initializeApp(firebaseConfig);

export { firebase };
