'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/contrato-controller');
const authService = require('../services/auth-service');

router.get('/sgc_matricula/:sgc_matricula/sgc_id_perfil/:sgc_id_perfil', authService.authorize, controller.get);

module.exports = router;