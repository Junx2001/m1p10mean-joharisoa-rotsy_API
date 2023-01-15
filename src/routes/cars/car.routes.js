const express = require('express');
const checkAuth = require('../middlewares/checkAuth.middleware');
const checkRole = require('../middlewares/checkRole.middleware');

const carController = require('./car.controllers');
const router = express.Router();


router.post('/deposit', carController.depositCar);
router.post('/recover/:immatriculation', carController.recoverCar);

module.exports = router;