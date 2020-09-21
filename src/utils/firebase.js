import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDaQiEvecNJp6hkV9-kZtCaHvJFDPUEf3c",
  authDomain: "whatsapp-mern-clone-c1c36.firebaseapp.com",
  databaseURL: "https://whatsapp-mern-clone-c1c36.firebaseio.com",
  projectId: "whatsapp-mern-clone-c1c36",
  storageBucket: "whatsapp-mern-clone-c1c36.appspot.com",
  messagingSenderId: "614088665697",
  appId: "1:614088665697:web:f23d55504a718f83e2d820",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
