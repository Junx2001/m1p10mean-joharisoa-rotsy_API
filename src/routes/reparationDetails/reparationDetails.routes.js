const express = require('express');
const checkAuth = require('../middlewares/checkAuth.middleware');
const checkRole = require('../middlewares/checkRole.middleware');

const reparationDetailController = require('./reparationDetails.controllers');
const router = express.Router();


router.post('/add', checkAuth, reparationDetailController.addReparationDetails);




module.exports = router;