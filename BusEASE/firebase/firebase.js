
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCBPZYZpgKau5AiOdeu6fvv9ztjhSBGrjg",
  authDomain: "authproject-b3b5b.firebaseapp.com",
  projectId: "authproject-b3b5b",
  storageBucket: "authproject-b3b5b.appspot.com",
  messagingSenderId: "191539177507",
  appId: "1:191539177507:web:6a69320745dfeb7103a996"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };