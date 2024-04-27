import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";


const firebaseConfig: object = {
    apiKey: "AIzaSyBoi80VHSePRHuN5YJr_5udJoavev8ujbE",
    authDomain: "dashboard-de4c8.firebaseapp.com",
    projectId: "dashboard-de4c8",
    storageBucket: "dashboard-de4c8.appspot.com",
    messagingSenderId: "713675792828",
    appId: "1:713675792828:web:b8e889ad03a0910c8b4bb9"
}

const app: FirebaseApp = initializeApp(firebaseConfig);
    
const auth: Auth = getAuth(app);

export { app, auth};