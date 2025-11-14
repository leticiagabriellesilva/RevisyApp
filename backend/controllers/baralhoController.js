const baralhoService = require('../services/baralhoService');

module.exports = {
    async createBaralho(req, res) {
        try {
            const newBaralho = await baralhoService.createBaralho(req.body);
            return res.status(201).json(newBaralho);
        } catch (error) {
            if (error.message.includes('obrigatório')) {
                return res.status(400).json({ error: error.message });
            }

            console.error(error);
            return res.status(500).json({ error: 'Erro ao criar baralho' });
        }
    },

    async getAllBaralhos(req, res) {
        try {
            const baralhos = await baralhoService.getAllBaralhos();
            return res.json(baralhos);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao listar baralhos.' });
        }
    },

    async getBaralhoById(req, res) {
        try {
            const { id } = req.params;
            const baralho = await baralhoService.getBaralhoById(id);
            return res.json(baralho);
        } catch (error) {
            if (error.message.includes('não encontrado')) {
                return res.status(404).json({ error: error.message });
            }

            console.error(error);
            return res.status(500).json({ error: 'Erro ao obter baralho.' });
        }
    },

    async updateBaralhoById(req, res) {
        try {
            const { id } = req.params;
            const baralhoUpdated = await baralhoService.updateBaralhoById(id, req.body);
            return res.json(baralhoUpdated);
        } catch (error) {
            if (error.message.includes('não informado') || error.message.includes('obrigatório')) {
                return res.status(400).json({ error: error.message });
            }

            console.error(error);
            return res.status(500).json({ error: 'Erro ao atualizar baralho.' });
        }
    },

    async deleteBaralhoById(req, res) {
        try {
            const { id } = req.params;
            await baralhoService.deleteBaralhoById(id);
            return res.status(204).send();
        } catch (error) {
            if (error.message.includes('não informado')) {
                return res.status(400).json({ error: error.message });
            }

            console.error(error);
            return res.status(500).json({ error: 'Erro ao deletar baralho.' });
        }
    },

    async getBaralhosWithReviewStatus(req, res) {
        try {
            const baralhos = await baralhoService.getBaralhosWithReviewStatus();
            return res.json(baralhos);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao obter status dos baralhos.' });
        }
    }
};
