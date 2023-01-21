const express = require('express');
const checkAuth = require('../middlewares/checkAuth.middleware');
const checkRole = require('../middlewares/checkRole.middleware');

const reparationController = require('./reparation.controllers');
const router = express.Router();



router.get('/', checkAuth ,reparationController.findReparationsByUser);
router.get('/notAffected', checkAuth ,reparationController.notAffectedReparationList);
router.get('/affected', checkAuth ,reparationController.affectedReparationList);
router.get('/details', checkAuth ,reparationController.reparationListWithDetails);
router.get('/unpaid', checkAuth ,reparationController.unpaidReparationByUser);
router.get('/current', checkAuth ,reparationController.findCurrentReparationsByUser);
router.get('/:reparationId', checkAuth, reparationController.findReparation);



router.get('/findByCar/:immatriculation', checkAuth ,reparationController.findReparationsByCar);
router.get('/actual/:immatriculation', checkAuth ,reparationController.findActualReparationsByCar);
router.get('/avgRepair/:immatriculation', checkAuth ,reparationController.avgReparationDuration);

router.post('/allocate/:repairId', checkAuth ,reparationController.affectReparation);
router.post('/validate/:repairId', checkAuth ,reparationController.validateReparation);

module.exports = router;