const express    = require('express');
const router     = express.Router();
const sauceCtrl  = require('../controllers/sauce');
const auth       = require('../middleWare/auth');
const multer     = require('../middleware/multer-config');


router.get('/api/sauces', sauceCtrl.getSauces); 
router.get('/api/sauces/:id', sauceCtrl.getSauce);
router.post('/api/sauces', auth, multer, sauceCtrl.addSauce);
router.put('/api/sauces/:id', auth, multer, sauceCtrl.updateSauce);
router.delete('/api/sauces/:id', auth, sauceCtrl.deleteSauce);
router.post('/api/sauces/:id/like', auth, sauceCtrl.likeSauce);

module.exports = router;
