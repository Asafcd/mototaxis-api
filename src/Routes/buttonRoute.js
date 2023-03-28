const express = require('express')
const router = express.Router();

const buttonController = require('../Controllers/buttonController')

router
    .post('/', buttonController.createReport )
    .get('/', buttonController.getReports )
    .put('/:id', buttonController.updateReport )
    .delete('/:id', buttonController.deleteReport )

module.exports = router
