import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig)
//const firebaseAnalytics = getAnalytics(app);

module.exports = { 
    firebaseApp,
    //firebaseAnalytics
}