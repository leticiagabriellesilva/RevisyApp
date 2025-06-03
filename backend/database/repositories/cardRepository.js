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

    updateCardById: async (id, { pergunta, resposta, dificuldade }) => {
        return prisma.card.update({
            where: { id },
            data: { pergunta, resposta, dificuldade },
        });
    },

    deleteCardById: async (id) => {
        return prisma.card.delete({
            where: { id },
        })
    }
}