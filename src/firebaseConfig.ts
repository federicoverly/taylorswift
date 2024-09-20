import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkvkY0kg6rPWxfPJDQW-r73eAheZu9Woo",
  authDomain: "ts-app-1ffb2.firebaseapp.com",
  projectId: "ts-app-1ffb2",
  storageBucket: "ts-app-1ffb2.appspot.com",
  messagingSenderId: "1026908848279",
  appId: "1:1026908848279:web:fdf7b7e3e388a847ca69d2",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage };

export default app;
