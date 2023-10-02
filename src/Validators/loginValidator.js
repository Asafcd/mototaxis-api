const { body } = require('express-validator');

const loginValidationRules = () => {
  return [
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
  ];
};

module.exports = {
  loginValidationRules
};
