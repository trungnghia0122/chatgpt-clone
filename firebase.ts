import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDdfaY3oRuKevmK2KX8abosH4RCOKgaG5k",
    authDomain: "chatgpt-clone-cd83d.firebaseapp.com",
    projectId: "chatgpt-clone-cd83d",
    storageBucket: "chatgpt-clone-cd83d.appspot.com",
    messagingSenderId: "537162093931",
    appId: "1:537162093931:web:cfb6ab3dab8405f9ab682e"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };