import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA5QPFo7KKkLQnUEDKTl2kRW77xymCPbqY",
    authDomain: "ahr-chat-2905b.firebaseapp.com",
    projectId: "ahr-chat-2905b",
    storageBucket: "ahr-chat-2905b.appspot.com",
    messagingSenderId: "226198834600",
    appId: "1:226198834600:web:1e32e8bf30eb82cbb4219d"
};

firebase.initializeApp(firebaseConfig);

export {firebase};
