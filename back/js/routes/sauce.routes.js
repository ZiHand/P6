const express    = require('express');
const router     = express.Router();
const sauceCtrl  = require('../controllers/sauce.controller');
const auth       = require('../middleWare/auth');
const multer     = require('../middleware/multer-config');


router.get('/', sauceCtrl.getSauces); 
router.get('/:id', sauceCtrl.getSauce);
router.post('/', auth, multer, sauceCtrl.addSauce);
router.put('/:id', auth, multer, sauceCtrl.updateSauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);

module.exports = router;
