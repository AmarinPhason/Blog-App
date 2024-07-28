// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app-a9678.firebaseapp.com",
  projectId: "blog-app-a9678",
  storageBucket: "blog-app-a9678.appspot.com",
  messagingSenderId: "360710738796",
  appId: "1:360710738796:web:4cb14d6dc1dccbc513d949",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
