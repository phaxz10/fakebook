import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBPCv5tdRN0ah9iYfU_xTnhOYaXPKsjQeM',
  authDomain: 'fb-clone-8ea04.firebaseapp.com',
  projectId: 'fb-clone-8ea04',
  storageBucket: 'fb-clone-8ea04.appspot.com',
  messagingSenderId: '242113120124',
  appId: '1:242113120124:web:856a8f4b133aed33e106f9',
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const storage = firebase.storage();

export { db, storage };
