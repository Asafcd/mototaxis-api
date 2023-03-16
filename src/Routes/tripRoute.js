const express = require('express')
const router = express.Router();

const tripsController = require('../Controllers/tripController')

router
    .post('/', tripsController.createTrip )
    .get('/', tripsController.getTrips )
    .get('/:id', tripsController.getTrip )
    .put('/:id', tripsController.updateTrip )
    .delete('/:id', tripsController.deleteTrip )

module.exports = router
