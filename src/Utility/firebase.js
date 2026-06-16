import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC8Avf95EPq9Ac0uSnHyJLK7Gv0IlhYz1E",
  authDomain: "clone-d452f.firebaseapp.com",
  projectId: "clone-d452f",
  storageBucket: "clone-d452f.firebasestorage.app",
  messagingSenderId: "1053232615194",
  appId: "1:1053232615194:web:52088b165a77929117a6a3",
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
