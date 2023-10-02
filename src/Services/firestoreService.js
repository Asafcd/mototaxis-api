const admin = require('firebase-admin');
const serviceAccount = require('../../moto-fenix-firebase-adminsdk-luuc8-220a2fd0d3.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = {
  db
};
