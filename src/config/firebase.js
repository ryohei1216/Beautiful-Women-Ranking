import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCj1jqLA9H2-gOSgQ8BCAWlTCqDZRRxW8I",
  authDomain: "beautiful-women-2887e.firebaseapp.com",
  projectId: "beautiful-women-2887e",
  storageBucket: "beautiful-women-2887e.appspot.com",
  messagingSenderId: "654711732458",
  appId: "1:654711732458:web:8ceca0f98c29342f95ff93",
  measurementId: "G-1DSS9V97N5",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
