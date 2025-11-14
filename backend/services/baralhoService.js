const baralhoRepository = require('../database/repositories/baralhoRepository');

module.exports = {
    async createBaralho(req) {
        if (!req.nome) {
            throw new Error('O nome do baralho é obrigatório.');
        }

        return baralhoRepository.createBaralho(req);
    },

    async getAllBaralhos() {
        return baralhoRepository.getAllBaralhos();
    },

    async getBaralhoById(id) {
        if (!id) throw new Error('ID do baralho não informado.');
        const baralho = await baralhoRepository.getBaralhoById(id);
        if (!baralho) throw new Error('Baralho não encontrado.');
        return baralho;
    },

    async updateBaralhoById(id, req) {
        if (!id) throw new Error('ID do baralho não informado.');
        if (!req.nome) throw new Error('Nome do baralho é obrigatório.');
        return baralhoRepository.updateBaralhoById(id, req);
    },

    async deleteBaralhoById(id) {
        if (!id) throw new Error('ID do baralho não informado.');
        return baralhoRepository.deleteBaralhoById(id);
    },

    async getBaralhosWithReviewStatus() {
        return baralhoRepository.getBaralhosWithReviewStatus();
    }
};
