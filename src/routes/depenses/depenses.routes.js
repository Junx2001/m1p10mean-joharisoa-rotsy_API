const express = require('express');
const checkAuth = require('../middlewares/checkAuth.middleware');
const checkRole = require('../middlewares/checkRole.middleware');

const depenseController = require('./depenses.controllers');
const router = express.Router();


router.get('/', checkAuth ,depenseController.findAllDepenses);
router.get('/statsDepensesPerMonth/:annee', checkAuth ,depenseController.statsDepensesParMois);

router.post('/add', checkAuth ,depenseController.addDepense);






module.exports = router;