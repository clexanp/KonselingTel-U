import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBlNOW15DuK1U7B7H4eZabpuAf8paZy1B8",
    authDomain: "telkomcounseling.firebaseapp.com",
    databaseURL: "https://telkomcounseling-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "telkomcounseling",
    storageBucket: "telkomcounseling.appspot.com",
    messagingSenderId: "170333181953",
    appId: "1:170333181953:web:5ed44c54455d74a3ac8800",
    measurementId: "G-4DQZQHRZ75"
};

initializeApp(firebaseConfig);
export const database = getDatabase();
export const getTable = (table) => ref(database, table);
