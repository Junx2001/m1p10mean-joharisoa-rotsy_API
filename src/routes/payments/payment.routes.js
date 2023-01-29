const express = require('express');
const checkAuth = require('../middlewares/checkAuth.middleware');
const checkRole = require('../middlewares/checkRole.middleware');

const paymentController = require('./payment.controllers');
const router = express.Router();
const UserRole = require('../../constants/UserRole');

router.get('/', [checkAuth, checkRole([UserRole.ROLE_USER_FINANCE])] ,paymentController.findAllPayments);
router.get('/statsCAPerMonth/:annee', [checkAuth, checkRole([UserRole.ROLE_USER_FINANCE])] ,paymentController.statsChiffreAffaireParMois);
router.get('/statsCAPerDay/:annee/:mois', [checkAuth, checkRole([UserRole.ROLE_USER_FINANCE])] ,paymentController.statsChiffreAffaireParJour);

router.post('/', checkAuth ,paymentController.addPayment);
router.post('/validate/:paymentId', [checkAuth, checkRole([UserRole.ROLE_USER_FINANCE])] ,paymentController.validatePayment);

router.get('/statsBeneficesPerMonth/:annee', [checkAuth, checkRole([UserRole.ROLE_USER_FINANCE])] ,paymentController.statsBeneficeParMois);



module.exports = router;