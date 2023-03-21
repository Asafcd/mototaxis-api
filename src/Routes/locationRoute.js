const express = require('express')
const router = express.Router();

const locationsController = require('../Controllers/locationController')

router
    .post('/:id', locationsController.createLocation )
    .get('/', locationsController.getLocations )
    .get('/:id', locationsController.getLocation )
    .put('/:id', locationsController.updateLocation )
    .delete('/:id', locationsController.deleteLocation )

module.exports = router
