//Plugins :
const express = require('express');
const router = express.Router();

//Controleurs User :
const userCtrl = require('../controllers/user');

//Route Users :
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);


module.exports = router;