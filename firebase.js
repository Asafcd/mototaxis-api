const { initializeApp } = require('firebase-admin/app');
const firebaseConfig = require('./src/Configs/firebaseConfig')

const firebase = initializeApp(firebaseConfig)
firebase? console.log('Connected to [project-fenix]') : console.error()
/* const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const firestore = getFirestore(firebase) */
module.exports = firebase