const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const validate = require('../../middlewares/validate.middleware');
const { registerSchema, loginSchema } = require('./auth.validation');

router.post('/register', validate(registerSchema), (req, res) =>
  authController.register(req, res)
);

router.post('/login', validate(loginSchema), (req, res) =>
  authController.login(req, res)
);

module.exports = router;