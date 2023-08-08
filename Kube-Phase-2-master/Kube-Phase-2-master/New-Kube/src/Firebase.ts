// Import the functions you need from the SDKs you need


import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth"
import "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//Dev-SetUp
// const firebaseConfig = {
//   apiKey: "AIzaSyDOcNtlNyCHyRM_ok_wH2FQJX3cYE00QGI",
//   authDomain: "kube-dev-13e3f.firebaseapp.com",
//   projectId: "kube-dev-13e3f",
//   storageBucket: "kube-dev-13e3f.appspot.com",
//   messagingSenderId: "804636016122",
//   appId: "1:804636016122:web:719fad2cca528de518f843",
//   measurementId: "G-X6GNSFYXV7"
// };

//Prod-Setup
const firebaseConfig = {
  apiKey: "AIzaSyCPn2snZMTwwZgw3B7kCOEQ8-qjAyZEKWw",
  authDomain: "kube-retail-tech-app.firebaseapp.com",
  projectId: "kube-retail-tech-app",
  storageBucket: "kube-retail-tech-app.appspot.com",
  messagingSenderId: "54716368334",
  appId: "1:54716368334:web:0b1afe21a2131cf365d79f",
  measurementId: "G-F8CNG4MMZ5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const firestore = firebase.firestore;
export const auth = firebase.auth;
export const storage = firebase.storage;