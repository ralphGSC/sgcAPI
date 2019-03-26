'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/perfil-controller');
const authService = require('../services/auth-service');

router.get('/cod_usuario/:cod_usuario', authService.authorize, controller.get);

module.exports = router;