const express = require('express');
const checkAuth = require('../middlewares/checkAuth.middleware');
const checkRole = require('../middlewares/checkRole.middleware');

const paymentController = require('./payment.controllers');
const router = express.Router();


router.get('/', checkAuth ,paymentController.findAllPayments);
router.get('/statsCAPerMonth/:annee', checkAuth ,paymentController.statsChiffreAffaireParMois);
router.get('/statsCAPerDay/:annee/:mois', checkAuth ,paymentController.statsChiffreAffaireParJour);

router.post('/', checkAuth ,paymentController.addPayment);
router.post('/validate/:paymentId', checkAuth ,paymentController.validatePayment);



module.exports = router;