// Import the functions you need from the SDKs you need
import  firebase from "firebase";




  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBv6GXEIJuLULnZkPSr30T2xUV2eJ-HFSI",
    authDomain: "mensaapp-a7220.firebaseapp.com",
    projectId: "mensaapp-a7220",
    storageBucket: "mensaapp-a7220.appspot.com",
    messagingSenderId: "687847008953",
    appId: "1:687847008953:web:b13b11b390aa4234e94968"
  };


// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };