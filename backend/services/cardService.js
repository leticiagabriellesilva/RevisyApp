const cardRepository = require('../database/repositories/cardRepository')

module.exports = {
    async createCard(req) {
        if (!req.pergunta || !req.resposta){
            throw new Error('Pergunta e resposta são obrigatórios.');
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

    async deleteCardById(id){
        if (!id) throw new Error('ID do card não informado.');
        return cardRepository.deleteCardById(id);
    },
};