const express = require('express')
const router = express.Router();

const {create, get, getById, update, updatePassword, deleteById} = require('../Controllers/clientController')

router
    .post('/', create)
    .get('/', get )
    .get('/:id', getById )
    .put('/:id', update )
    .put('/0/:id', updatePassword )
    .delete('/:id', deleteById)

module.exports = router