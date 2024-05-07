import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getDatabase, Database } from "firebase/database";

/**
 * Firebase configuration object.
 * @type {object}
 */
const firebaseConfig: object = {
    apiKey: "AIzaSyBoi80VHSePRHuN5YJr_5udJoavev8ujbE",
    authDomain: "dashboard-de4c8.firebaseapp.com",
    projectId: "dashboard-de4c8",
    storageBucket: "dashboard-de4c8.appspot.com",
    messagingSenderId: "713675792828",
    appId: "1:713675792828:web:b8e889ad03a0910c8b4bb9",
    databaseURL: "https://dashboard-de4c8-default-rtdb.europe-west1.firebasedatabase.app/"}

/**
 * Initialized Firebase app.
 * @type {FirebaseApp}
 */
const app: FirebaseApp = initializeApp(firebaseConfig);
    
/**
 * Firebase Auth instance.
 * @type {Auth}
 */
const auth: Auth = getAuth(app);

/**
 * Firebase Database instance.
 * @type {Database}
 */
const db: Database = getDatabase(app);
export { app, auth, db};