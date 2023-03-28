const { cert } = require('firebase-admin/app');
const serviceAccount = require('../../project-fenix-7af65-firebase-adminsdk-uh3gi-d1facb18a9.json')

const firebaseConfig = { credential: cert(serviceAccount) }
module.exports = firebaseConfig
