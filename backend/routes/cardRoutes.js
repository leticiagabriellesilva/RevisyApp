const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');


router.post('/', cardController.createCard);
router.get('/', cardController.getAllCards);
router.get('/:id', cardController.getCardById);
router.put('/:id', cardController.updateCardById);
router.delete('/:id', cardController.deleteCardById);

router.patch('/:id/dificuldade', cardController.updateDificuldade);

module.exports = router;