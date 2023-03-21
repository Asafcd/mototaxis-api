require('dotenv').config();
const {API_KEY} = process.env
const {AUTH_DOMAIN} = process.env
const {PROJECT_ID} = process.env
const {STORAGE_BUCKET} = process.env
const {MESSAGING_SENDER_ID} = process.env
const {APP_ID} = process.env
const {MEASUREMENT_ID} = process.env

const firebaseKeys = {
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
    MEASUREMENT_ID
}

module.exports = firebaseKeys