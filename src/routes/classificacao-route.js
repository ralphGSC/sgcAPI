'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/classificacao-controller');
const authService = require('../services/auth-service');

router.get('/', authService.authorize, controller.get);
router.post('/', authService.authorize, controller.post);
router.put('/:sgc_id', authService.authorize, controller.put);
router.delete('/:sgc_id', authService.authorize, controller.delete);

module.exports = router;