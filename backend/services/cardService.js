const cardRepository = require('../database/repositories/cardRepository')

module.exports = {
    async createCard(req) {
        if (!req.pergunta || !req.resposta){
            throw new Error('Pergunta e resposta são obrigatórios.');
        }
        if (!req.baralhoId) {
            throw new Error('Baralho é obrigatório.');
        }

        return cardRepository.createCard(req);
    },

    async getAllCards(){
        return cardRepository.getAllCards();
    },

    async getCardById(id){
        if (!id) throw new Error('ID do card não informado.');
        const card = await cardRepository.getCardById(id);
        if (!card) throw new Error('Card não encontrado.');
        return card;
    },

    async updateCardById(id, req){
        if(!id) throw new Error('ID do card não informado.');
        return cardRepository.updateCardById(id, req);
    },

    async updateAllCardsDifficulty(){
        return cardRepository.updateAllCardsDifficulty();
    },

    async deleteCardById(id){
        if (!id) throw new Error('ID do card não informado.');
        return cardRepository.deleteCardById(id);
    },

    async getCardsByBaralhoId(baralhoId){
        if (!baralhoId) throw new Error('ID do baralho não informado.');
        return cardRepository.getCardsByBaralhoId(baralhoId);
    },

    async getCardsToReviewByBaralhoId(baralhoId){
        if (!baralhoId) throw new Error('ID do baralho não informado.');
        return cardRepository.getCardsToReviewByBaralhoId(baralhoId);
    }
};