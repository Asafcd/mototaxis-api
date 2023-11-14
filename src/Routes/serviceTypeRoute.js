const express = require('express')
const router = express.Router();

const {get} = require('../Controllers/serviceTypeController')

router.get('/', get )

module.exports = router