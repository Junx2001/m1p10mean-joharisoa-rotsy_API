const express = require('express');
const checkAuth = require('../middlewares/checkAuth.middleware');
const checkRole = require('../middlewares/checkRole.middleware');

const carController = require('./car.controllers');
const router = express.Router();


router.post('/add', checkAuth, carController.addCar);

router.post('/deposit/:immatriculation', checkAuth, carController.depositCar);
router.post('/recover/:immatriculation', checkAuth, carController.recoverCar);

router.get('/', checkAuth, carController.carListByUser);
router.get('/deposit', checkAuth, carController.carDepositListByUser);
router.get('/search', checkAuth, carController.searchCar);
router.get('/recoverable', checkAuth, carController.recoverableCarByUser);



module.exports = router;