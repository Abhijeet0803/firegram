import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore'; 

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAcssow5oURsWZCB-pArjZCn5aLWBhN20o",
    authDomain: "fir-3fb09.firebaseapp.com",
    projectId: "fir-3fb09",
    storageBucket: "fir-3fb09.appspot.com",
    messagingSenderId: "380349034781",
    appId: "1:380349034781:web:96f844715b9751f776f1f4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const projectStorage = firebase.storage();
  const projectFirestore = firebase.firestore();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;

  export {projectStorage, projectFirestore, timestamp};