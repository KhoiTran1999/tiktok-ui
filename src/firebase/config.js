import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

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

export { auth };
export default firebase;
