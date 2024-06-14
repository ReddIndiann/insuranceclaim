import { getApp, initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDCW9xVztBjdrc0i-t2ikXi0Dd8B9uBtQA",
    authDomain: "insuranceclaim-9df4f.firebaseapp.com",
    projectId: "insuranceclaim-9df4f",
    storageBucket: "insuranceclaim-9df4f.appspot.com",
    messagingSenderId: "344045429969",
    appId: "1:344045429969:web:4f3c2da9408449f5d111f0",
    measurementId: "G-8T1KKMSZTG"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

const auth = getAuth(app);

export { app, auth, analytics };
