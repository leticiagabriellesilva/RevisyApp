const express = require('express');
const router = express.Router();
const baralhoController = require('../controllers/baralhoController');

router.get('/status', baralhoController.getBaralhosWithReviewStatus);
router.post('/', baralhoController.createBaralho);
router.get('/', baralhoController.getAllBaralhos);
router.get('/:id', baralhoController.getBaralhoById);
router.put('/:id', baralhoController.updateBaralhoById);
router.delete('/:id', baralhoController.deleteBaralhoById);

module.exports = router;
