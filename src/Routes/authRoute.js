
const express = require('express');
const { loginValidationRules } = require('../Validators/loginValidator');
const { loginUser } = require('../Controllers/authController');

const router = express.Router();

// Define las reglas de validación para el inicio de sesión
router.post('/login', loginUser);

module.exports = router;

