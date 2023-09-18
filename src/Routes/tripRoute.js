const express = require('express')
const router = express.Router();

const tripsController = require('../Controllers/tripController')

router
    .post('/', tripsController.createLocation )
    .get('/', tripsController.gettrips )
    .get('/:id', tripsController.getLocation )
    .put('/:id', tripsController.updateLocation )
    .delete('/:id', tripsController.deleteLocation )

module.exports = router
