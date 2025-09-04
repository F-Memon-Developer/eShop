import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyDXnWxzGFCcWD8c03Xk7HPcxeGl9CTwubg",
  authDomain: "eshop-f1bdf.firebaseapp.com",
  projectId: "eshop-f1bdf",
  storageBucket: "eshop-f1bdf.firebasestorage.app",
  messagingSenderId: "44163001453",
  appId: "1:44163001453:web:8b97dcd80501efc4ae6364"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app;
