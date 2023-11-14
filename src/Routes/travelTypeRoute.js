const express = require('express')
const router = express.Router();

const {create, get, getById, update, deleteById} = require('../Controllers/travelTypeController')

router
    .post('/', create )
    .get('/', get )
    .get('/:id', getById )
    .put('/:id', update )
    .delete('/:id', deleteById )

module.exports = router