const express    = require('express');
const router     = express.Router();
const sauceCtrl  = require('../controllers/sauce.controller');
const auth       = require('../middleWare/auth');
const multer     = require('../middleware/multer-config');


router.get('/sauces', sauceCtrl.getSauces); 
router.get('/sauces/:id', sauceCtrl.getSauce);
router.post('/sauces', auth, multer, sauceCtrl.addSauce);
router.put('/sauces/:id', auth, multer, sauceCtrl.updateSauce);
router.delete('/sauces/:id', auth, sauceCtrl.deleteSauce);
router.post('/sauces/:id/like', auth, sauceCtrl.likeSauce);

module.exports = router;
