import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { doc, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyAkQBtccicYPF7xrjL4lEv-tv2EohENbgg',
    authDomain: 'tiktok-clone-khoitran.firebaseapp.com',
    projectId: 'tiktok-clone-khoitran',
    storageBucket: 'tiktok-clone-khoitran.appspot.com',
    messagingSenderId: '32753234511',
    appId: '1:32753234511:web:9191a4f982f7b076f5b03a',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// auth.useEmulator('http://localhost:9099');
// if (window.location.hostname === 'localhost') {
//     db.useEmulator('localhost', '8080');
// }

export { auth, db, doc, deleteDoc };
export default firebase;
