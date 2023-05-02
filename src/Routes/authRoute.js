const express = require('express')
const router = express.Router();

const authController = require('../Controllers/authController')

router
    .get('/', authController.logout )
    .post('/', authController.login )
    .put('/:id', authController.changePassword )
module.exports = router
