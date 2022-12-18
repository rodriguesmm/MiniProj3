const express = require('express');
let router = express.Router();
const ContributionController = require('../controllers/contribution.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");


router.route('/:id')
    .put(AuthController.checkAuth, [param("id").isMongoId()], ContributionController.create);

module.exports = router;