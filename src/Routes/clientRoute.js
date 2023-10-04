const express = require('express')
const router = express.Router();

const {
    createClient,
    getClient,
    getClients,
    updateClient,
    deleteClient 
} = require('../Controllers/clientController')

router
    .post('/', createClient)
    .get('/', getClients )
    .get('/:id', getClient )
    .put('/:id', updateClient )
    .delete('/:id', deleteClient)

module.exports = router