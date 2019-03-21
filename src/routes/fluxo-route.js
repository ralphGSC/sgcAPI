'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/fluxo-controller');
const authService = require('../services/auth-service');

router.put('/sgc_id_fluxo/:sgc_id_fluxo', authService.authorize, controller.put);

module.exports = router;