const express = require('express');
const checkAuth = require('../middlewares/checkAuth.middleware');
const checkRole = require('../middlewares/checkRole.middleware');

const depenseController = require('./depenses.controllers');
const router = express.Router();
const UserRole = require('../../constants/UserRole');

router.get('/', checkAuth ,depenseController.findAllDepenses);
router.get('/statsDepensesPerMonth/:annee', [checkAuth, checkRole([UserRole.ROLE_USER_FINANCE])] ,depenseController.statsDepensesParMois);

router.post('/add', [checkAuth, checkRole([UserRole.ROLE_USER_FINANCE])] ,depenseController.addDepense);



module.exports = router;