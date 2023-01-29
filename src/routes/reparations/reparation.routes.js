const express = require('express');
const checkAuth = require('../middlewares/checkAuth.middleware');
const checkRole = require('../middlewares/checkRole.middleware');

const reparationController = require('./reparation.controllers');
const router = express.Router();
const UserRole = require('../../constants/UserRole');


router.get('/', checkAuth ,reparationController.findReparationsByUser);
router.get('/notAffected', [checkAuth, checkRole([UserRole.ROLE_USER_ATELIER])] ,reparationController.notAffectedReparationList);
router.get('/affected', [checkAuth, checkRole([UserRole.ROLE_USER_ATELIER])] ,reparationController.affectedReparationList);
router.get('/details', [checkAuth, checkRole([UserRole.ROLE_USER_ATELIER])] ,reparationController.reparationListWithDetails);
router.get('/unpaidByUser', checkAuth ,reparationController.unpaidReparationsByUser);
router.get('/unpaid', [checkAuth, checkRole([UserRole.ROLE_USER_FINANCE])] ,reparationController.unpaidReparations);
router.get('/unpaidById/:repairId', [checkAuth, checkRole([UserRole.ROLE_USER_FINANCE])] ,reparationController.unpaidReparationById);
router.get('/current', checkAuth ,reparationController.findCurrentReparationsByUser);
router.get('/:reparationId', [checkAuth, checkRole([UserRole.ROLE_USER_ATELIER])], reparationController.findReparation);



router.get('/findByCar/:immatriculation', checkAuth ,reparationController.findReparationsByCar);
router.get('/actual/:immatriculation', checkAuth ,reparationController.findActualReparationsByCar);
router.get('/avgRepair/:immatriculation', [checkAuth, checkRole([UserRole.ROLE_USER_FINANCE])] ,reparationController.avgReparationDuration);

router.post('/allocate/:repairId', [checkAuth, checkRole([UserRole.ROLE_USER_ATELIER])] ,reparationController.affectReparation);
router.post('/validate/:repairId', [checkAuth, checkRole([UserRole.ROLE_USER_ATELIER])] ,reparationController.validateReparation);

module.exports = router;