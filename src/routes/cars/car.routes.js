const express = require('express');
const checkAuth = require('../middlewares/checkAuth.middleware');
const checkRole = require('../middlewares/checkRole.middleware');

const carController = require('./car.controllers');
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');
const UserRole = require('../../constants/UserRole');

router.post('/add', [checkAuth, upload], carController.addCar);
router.get('/all', [checkAuth, checkRole([UserRole.ROLE_USER_FINANCE])], carController.allCars);

router.post('/deposit/:immatriculation', checkAuth, carController.depositCar);
router.post('/recover/:immatriculation', checkAuth, carController.recoverCar);

router.get('/', checkAuth, carController.carListByUser);
router.get('/deposit', checkAuth, carController.carDepositListByUser);
router.get('/search', checkAuth, carController.searchCar);
router.get('/recoverable', checkAuth, carController.recoverableCarByUser);

router.get('/:carId', checkAuth, carController.findCarById);

router.put('/:carId', upload, carController.updateCar);


router.post('/upload/:carId', upload, carController.addUpdateImage);

module.exports = router;