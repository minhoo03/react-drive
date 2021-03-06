import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'

var firebaseConfig = {
    apiKey: "AIzaSyB_sVR6AcHBW3i-YRXArFLUIWDwj08RDS0",
    authDomain: "react-drive-5551a.firebaseapp.com",
    projectId: "react-drive-5551a",
    storageBucket: "react-drive-5551a.appspot.com",
    messagingSenderId: "148276369622",
    appId: "1:148276369622:web:3e7c0af9102d8cdd6cd177",
    measurementId: "G-3XZ9CDV098"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase