const cardService = require('../services/cardService')

module.exports = {
    async createCard(req, res){
        try{
            const newCard = await cardService.createCard(req.body);
            return res.status(201).json(newCard);
        }
        catch(error){
            if (error.message.includes('obrigatório')){
                return res.status(400).json({ error: error.message});
            }

            console.error(error);
            return res.status(500).json({ error: 'Erro interno ao criar card'});
        }
    },

    async getAllCards(req, res){
        try{
            const cards = await cardService.getAllCards();
            return res.json(cards);
        }
        catch(error){
            console.log(error);
            return res.status(500).json({ error: 'Erro ao litar cards.'});
        }
    },

    async getCardById(req, res){
        try{
            const { id } = req.params;
            const card = await cardService.getCardById(id);
            return res.json(card);
        }
        catch(error){
            if (error.message.includes('não encontrado')){
                return res.status(404).json({ error: error.message });
            }

            console.error(error);
            return res.status(500).json({ error: 'Erro ao obter Card.'});
        }
    }, 

    async updateCardById(req, res){
        try{
            const { id } = req.params;
            const cardUpdated = await cardService.updateCardById(id, req.body);
            return res.json(cardUpdated);
        }
        catch(error){
            if (error.message.includes('não informado')){
                return res.status(400).json( { error: error.message });
            }

            console.error(error);
            return res.status(500).json( { error: 'Erro ao atualizar card.'});
        }
    },

    async deleteCardById(req, res){
        try{
            const { id } = req.params;
            await cardService.deleteCardById(id);
            return res.status(204).send(); 
        }
        catch(error){
            if (error.message.includes('não informado')){
                return res.status(400).json({error: error.message })
            }

            console.error(error);
            return res.lstatus(500).json( { error: 'Erro ao deletar card.' });
        }
    },





    async updateDificuldade(req, res) {
    try {
        const { id } = req.params;
        const { dificuldade } = req.body; // dificuldade: 0 (fácil) ou 1 (difícil)
        if (typeof dificuldade !== 'boolean' && dificuldade !== 0 && dificuldade !== 1) {
            return res.status(400).json({ error: 'Dificuldade deve ser 0 (fácil) ou 1 (difícil).' });
        }
        const updated = await cardService.updateCardById(id, { dificuldade: Boolean(dificuldade) });
        return res.json(updated);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao atualizar dificuldade.' });
    }
},
};