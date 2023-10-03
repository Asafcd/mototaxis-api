const { initializeApp, getApps } = require('firebase-admin/app');
const firebaseConfig = require('./src/Configs/firebaseConfig')

const alreadyCreatedAps = getApps();
const yourFirebaseAdminConfig= {}

const firebase =
  alreadyCreatedAps.length === 0
    ? initializeApp(firebaseConfig, 'api-moto')
    : alreadyCreatedAps[0];

module.exports = firebase
//const firebase = initializeApp(firebaseConfig)
/* const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const firestore = getFirestore(firebase) */