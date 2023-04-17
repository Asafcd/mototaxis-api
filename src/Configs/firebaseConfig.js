const { cert } = require('firebase-admin/app');
const serviceAccount = require('../../moto-fenix-firebase-adminsdk-luuc8-220a2fd0d3.json')

const firebaseConfig = { credential: cert(serviceAccount) }
module.exports = firebaseConfig
