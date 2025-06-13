const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    createCard: async ({ pergunta, resposta, dificuldade }) => {
        return prisma.card.create({
            data: {
                pergunta,
                resposta,
                dificuldade
            },
        });
    },

    getAllCards: async () => {
        return prisma.card.findMany();
    },

    getCardById: async (id) => {
        return prisma.card.findUnique({
            where: { id },
        });
    },

    updateCardById: async (id, updateFields) => {
    const updateData = {};
    if (typeof updateFields.pergunta !== 'undefined') updateData.pergunta = updateFields.pergunta;
    if (typeof updateFields.resposta !== 'undefined') updateData.resposta = updateFields.resposta;
    if (typeof updateFields.dificuldade !== 'undefined') updateData.dificuldade = !!updateFields.dificuldade;

    return prisma.card.update({
        where: { id },
        data: updateData,
    });
},

    updateAllCardsDifficulty: async () => {
        await prisma.card.updateMany({ data: { dificuldade: true } });
        return prisma.card.findMany();
    },

    deleteCardById: async (id) => {
        return prisma.card.delete({
            where: { id },
        })
    }
}