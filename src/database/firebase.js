import firebase from 'firebase/app'
import 'firebase/database'
/** 
//BANCO DE DADOS TESTE
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
 //BANCO DE DADOS PRODUÇÃO
 */ 

 var firebaseConfig = {
    apiKey: "AIzaSyBRs8jrZP-z209CkWSyHUxf11jrd0vR7NI",
    authDomain: "deliverymiriense.firebaseapp.com",
    databaseURL: "https://deliverymiriense.firebaseio.com",
    projectId: "deliverymiriense",
    storageBucket: "deliverymiriense.appspot.com",
    messagingSenderId: "565506237608",
    appId: "1:565506237608:web:e2994536c3ffb027bb8e9d",
    measurementId: "G-JK87QZ8C2X"
  };

 
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();

  export default firebase

  