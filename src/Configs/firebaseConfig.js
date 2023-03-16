import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

require('dotenv').config();
const {API_KEY} = process.env
const {AUTH_DOMAIN} = process.env
const {PROJECT_ID} = process.env
const {STORAGE_BUCKET} = process.env
const {MESSAGING_SENDER_ID} = process.env
const {APP_ID} = process.env
const {MEASUREMENT_ID} = process.env

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID //Optional For Firebase JS SDK v7.20.0 and later
};

// Initialize Firebase
try {
    const firebaseApp = initializeApp(firebaseConfig)
    const firebaseAnalytics = getAnalytics(app);
    console.log(firebaseApp)
    module.exports = { firebaseApp, firebaseAnalytics}
} catch (error) {
    console.error(error)
}




