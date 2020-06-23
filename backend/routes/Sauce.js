//Plugins :
const express = require('express');
const router = express.Router();

//Middlewares :
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Controleurs des routes sauce :
const sauceCtrl = require('../controllers/sauce');

//Les différentes routes :
router.put('/:id', auth, multer, sauceCtrl.updateSauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);

module.exports = router;