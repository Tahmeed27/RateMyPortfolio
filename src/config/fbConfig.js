// Your web app's Firebase configuration
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


var firebaseConfig = {
    apiKey: "AIzaSyBfHLYARI5NquqiW23PtRmY-PJPGnze0_I",
    authDomain: "project-maker-ec877.firebaseapp.com",
    databaseURL: "https://project-maker-ec877.firebaseio.com",
    projectId: "project-maker-ec877",
    storageBucket: "project-maker-ec877.appspot.com",
    messagingSenderId: "629628157112",
    appId: "1:629628157112:web:b8165695ad1f28b676c84d",
    measurementId: "G-2ZJWC1C7MC"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
//  firebase.firestore().settings({ timestampsInSnapshot: true})

  export default firebase;
