// RENAME FILE INTO firebaseConfig
// Set your config base on ur project firebase
// Import Database from file data-counseling.json from root in this project

import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

initializeApp(firebaseConfig);
export const database = getDatabase();
export const getTable = (table) => ref(database, table);
