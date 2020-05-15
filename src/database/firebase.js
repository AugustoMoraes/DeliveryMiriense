import firebase from 'firebase/app'
import 'firebase/database'

var firebaseConfig = {
    apiKey: "AIzaSyBu_Hc9roFQMwcahEyIytRbBmFKnsnkA_I",
    authDomain: "deliveryteste-18573.firebaseapp.com",
    databaseURL: "https://deliveryteste-18573.firebaseio.com",
    projectId: "deliveryteste-18573",
    storageBucket: "deliveryteste-18573.appspot.com",
    messagingSenderId: "1022734840083",
    appId: "1:1022734840083:web:d0954979404d889224eae6",
    measurementId: "G-C7XJ2J16KP"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();

  export default firebase

  /**
   * service firebase.storage {
      match /b/{bucket}/o {
        match /{allPaths=**} {
          allow read, write: if request.auth != null;
        }
      }
    }
   */