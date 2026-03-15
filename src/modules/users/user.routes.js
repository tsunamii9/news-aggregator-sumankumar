const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const authenticate = require('../../middlewares/auth.middleware');

const validate = require('../../middlewares/validate.middleware');
const { updatePreferencesSchema } = require('./user.validation');


router.get('/preferences', authenticate, (req, res) =>
  userController.getPreferences(req, res)
);

router.put('/preferences', authenticate, (req, res) =>
  userController.updatePreferences(req, res)
);

router.put('/preferences', authenticate, validate(updatePreferencesSchema), (req, res) => 
  userController.updatePreferences(req, res)
);


module.exports = router;