const { initializeApp, cert } = require('firebase-admin/app');

const serviceAccount = require('./project-fenix-7af65-firebase-adminsdk-uh3gi-d1facb18a9.json')
const firebase = initializeApp({
    credential: cert(serviceAccount)
})
/* const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const firestore = getFirestore(firebase) */
module.exports = firebase