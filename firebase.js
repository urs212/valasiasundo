import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD33qngr4Wrv2vcFtvKWDXunLLsoH1n5GE",
    authDomain: "coffee-spark-ai-barista-d932c.firebaseapp.com",
    projectId: "coffee-spark-ai-barista-d932c",
    storageBucket: "coffee-spark-ai-barista-d932c.firebasestorage.app",
    messagingSenderId: "417001138004",
    appId: "1:417001138004:web:96ebfac33fa40848c20ac1"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);