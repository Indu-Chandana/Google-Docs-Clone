import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCo26T4r4BUE87AD8IzIjw4osoH9VRqcIo",
    authDomain: "docs-clone-indu.firebaseapp.com",
    projectId: "docs-clone-indu",
    storageBucket: "docs-clone-indu.appspot.com",
    messagingSenderId: "261377883830",
    appId: "1:261377883830:web:824e7338299f4aba45f017"
  };

  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) 
  : firebase.app();

  const db = app.firestore();

  export { db };