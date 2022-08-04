// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpOKJsjw7vAZA-5-fKMxrfuJ-HCVohO0Q",
  authDomain: "yourmart-8c687.firebaseapp.com",
  databaseURL: "https://yourmart-8c687-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "yourmart-8c687",
  storageBucket: "yourmart-8c687.appspot.com",
  messagingSenderId: "552630804885",
  appId: "1:552630804885:web:fc1412a882eb6bac23569c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getDatabase(app);
export const auth=getAuth();