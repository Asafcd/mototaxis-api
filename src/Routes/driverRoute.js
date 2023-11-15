const express = require('express')
const router = express.Router();

const driverController = require('../Controllers/driverController');
//const upload = require('../Configs/multer');
const multer = require('multer');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage }).single('file')
router
    .post('/', upload, driverController.createDriver )
    .get('/', driverController.getDrivers )
    .get('/:id', driverController.getDriver )
    .put('/:id', driverController.updateDriver )
    .delete('/:id', driverController.deleteDriver )

module.exports = router