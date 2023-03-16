import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseKeys } from "../Keys/firebaseKeys";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID} = firebaseKeys

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




