const express = require('express')
const router = express.Router();

const reportController = require('../Controllers/reportController')

router
    .post('/', buttonController.createReport )
    .get('/', buttonController.getReports )
    .get('/:id', buttonController.getReport )
    .put('/:id', buttonController.updateReport )
    .delete('/:id', buttonController.deleteReport )

module.exports = router
