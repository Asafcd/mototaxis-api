const express = require('express')
const router = express.Router();

const driverController = require('../Controllers/driverController')

router.get('/', driverController.getAllDrivers );

module.exports = router