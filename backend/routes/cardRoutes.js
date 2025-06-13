const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');

router.put('/dificuldade', cardController.updateAllCardsDifficulty);
router.post('/', cardController.createCard);
router.get('/', cardController.getAllCards);
router.get('/:id', cardController.getCardById);
router.put('/:id', cardController.updateCardById);
router.delete('/:id', cardController.deleteCardById);


module.exports = router;