const express = require('express');
const checkAuth = require('../middlewares/checkAuth.middleware');
const checkRole = require('../middlewares/checkRole.middleware');

const reparationController = require('./reparation.controllers');
const router = express.Router();


router.get('/:immatriculation', checkAuth ,reparationController.findReparationsByCar);
router.get('/', checkAuth ,reparationController.findReparationsByUser);


router.post('/allocate/:repairId', checkAuth ,reparationController.affectReparation);

module.exports = router;