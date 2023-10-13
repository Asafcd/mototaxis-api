
const express = require('express');
const login = require('../Auth/login');

const router = express.Router();

// Define las reglas de validación para el inicio de sesión
router.post('/login' ,login);

module.exports = router;

