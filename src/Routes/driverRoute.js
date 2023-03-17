const express = require('express')
const router = express.Router();

const driverController = require('../Controllers/driverController')

router
    .post('/', driverController.createDriver )
    .get('/', driverController.getDrivers )
    .get('/:id', driverController.getDriver )
    .put('/:id', driverController.updateDriver )
    .delete('/:id', driverController.deleteDriver )

module.exports = router