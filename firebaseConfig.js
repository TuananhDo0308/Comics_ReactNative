import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDTPXO-tZyMBJNJIcRI-8EMb7JM60ZjzVQ",
    authDomain: "comics-cac6c.firebaseapp.com",
    projectId: "comics-cac6c",
    storageBucket: "comics-cac6c.appspot.com",
    messagingSenderId: "28516903947",
    appId: "1:28516903947:web:e7608ce8635f3e058ceb0e",
    measurementId: "G-XWND6H97C7"
  };
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { firebase, auth, db, storage };