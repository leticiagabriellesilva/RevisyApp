const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    createBaralho: async ({ nome }) => {
        return prisma.baralho.create({
            data: {
                nome
            },
        });
    },

    getAllBaralhos: async () => {
        return prisma.baralho.findMany({
            include: {
                cards: true
            }
        });
    },

    getBaralhoById: async (id) => {
        return prisma.baralho.findUnique({
            where: { id: parseInt(id) },
            include: {
                cards: true
            }
        });
    },

    updateBaralhoById: async (id, { nome }) => {
        return prisma.baralho.update({
            where: { id: parseInt(id) },
            data: { nome },
        });
    },

    deleteBaralhoById: async (id) => {
        // Os cards serão deletados automaticamente ao deletar um baralho
        return prisma.baralho.delete({
            where: { id: parseInt(id) },
        });
    },

    getBaralhosWithReviewStatus: async () => {
        const baralhos = await prisma.baralho.findMany({
            include: {
                cards: true
            }
        });

        const now = new Date();

        return baralhos.map(baralho => {
            // Cards que precisam ser revisados são os que o nextReview já passou
            const hasCardsToReview = baralho.cards.some(card => 
                new Date(card.nextReview) <= now
            );
            
            return {
                ...baralho,
                hasCardsToReview,
                cardsCount: baralho.cards.length,
                cardsToReviewCount: baralho.cards.filter(card => new Date(card.nextReview) <= now).length
            };
        });
    }
};
