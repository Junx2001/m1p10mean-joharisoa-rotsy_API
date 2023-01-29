const express = require('express');
const checkAuth = require('../middlewares/checkAuth.middleware');
const checkRole = require('../middlewares/checkRole.middleware');

const reparationDetailController = require('./reparationDetails.controllers');
const router = express.Router();
const UserRole = require('../../constants/UserRole');


router.post('/add', [checkAuth, checkRole([UserRole.ROLE_USER_ATELIER])], reparationDetailController.addReparationDetails);
router.get('/:repairDetailsId', [checkAuth, checkRole([UserRole.ROLE_USER_ATELIER])], reparationDetailController.findReparationDetails);

router.put('/:repairDetailsId', [checkAuth, checkRole([UserRole.ROLE_USER_ATELIER])], reparationDetailController.updateReparationDetails);

router.delete('/:repairDetailsId', [checkAuth, checkRole([UserRole.ROLE_USER_ATELIER])], reparationDetailController.deleteReparationDetails);


module.exports = router;