const express = require('express');
const checkAuth = require('../middlewares/checkAuth.middleware');
const checkRole = require('../middlewares/checkRole.middleware');

const reparationController = require('./reparation.controllers');
const router = express.Router();



router.get('/', checkAuth ,reparationController.findReparationsByUser);
router.get('/notAffected', checkAuth ,reparationController.notAffectedReparationList);
router.get('/details', checkAuth ,reparationController.reparationListWithDetails);


router.get('/:immatriculation', checkAuth ,reparationController.findReparationsByCar);

router.post('/allocate/:repairId', checkAuth ,reparationController.affectReparation);

module.exports = router;