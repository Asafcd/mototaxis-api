const express = require('express')
const router = express.Router();

const {getClient} = require('../Controllers/clientController')

router
   //.post('/', createClient)
    //.get('/', getClients )
    .get('/:id', getClient )
    //.put('/:id', )
    //.delete('/:id', )

module.exports = router