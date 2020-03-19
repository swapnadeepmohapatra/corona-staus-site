import firebase from "firebase/app";
import database from "firebase/database";

var config = {
  apiKey: "AIzaSyCMKUf1RVpJxLgYd71ua8ChG4F7QloE-JE",
  authDomain: "corona-live-stats.firebaseapp.com",
  databaseURL: "https://corona-live-stats.firebaseio.com",
  projectId: "corona-live-stats",
  storageBucket: "corona-live-stats.appspot.com",
  messagingSenderId: "583566361791",
  appId: "1:583566361791:web:4b4150c17d81691c8c720a",
  measurementId: "G-E5807ME935"
};
// Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
// firebase.analytics();

let firebaseCache;

export const getFirebase = () => {
  if (firebaseCache) {
    return firebaseCache;
  }

  firebase.initializeApp(config);
  //   firebase.analytics();
  firebaseCache = firebase;
  return firebase;
};
