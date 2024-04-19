// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjuAs69WJ6Hgo0dbjmF1ugmsLnKNiZJIM",
  authDomain: "sigemuv-6a91f.firebaseapp.com",
  projectId: "sigemuv-6a91f",
  storageBucket: "sigemuv-6a91f.appspot.com",
  messagingSenderId: "517810514169",
  appId: "1:517810514169:web:48316c7d063baf7db7da28"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
