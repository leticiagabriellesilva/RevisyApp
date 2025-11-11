const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    createCard: async ({ pergunta, resposta, dificuldade, repeticoes, intervalo, fatorFacilidade, qualidade, lastReview, nextReview }) => {
        return prisma.card.create({
            data: {
                pergunta,
                resposta,
                dificuldade,
                repeticoes,
                intervalo,
                fatorFacilidade,
                qualidade,
                lastReview,
                nextReview,
            },
        });
    },

    getAllCards: async () => {
        return prisma.card.findMany();
    },

    getCardById: async (id) => {
        return prisma.card.findUnique({
            where: { id: parseInt(id) },
            where: { id: parseInt(id) },
        });
    },

    updateCardById: async (id, updateFields) => {
        const updateData = {};
        if (typeof updateFields.pergunta !== 'undefined') updateData.pergunta = updateFields.pergunta;
        if (typeof updateFields.resposta !== 'undefined') updateData.resposta = updateFields.resposta;
        if (typeof updateFields.dificuldade !== 'undefined') updateData.dificuldade = !!updateFields.dificuldade;
        if (typeof updateFields.repeticoes !== 'undefined') updateData.repeticoes = Number(updateFields.repeticoes);
        if (typeof updateFields.intervalo !== 'undefined') updateData.intervalo = Number(updateFields.intervalo);
        if (typeof updateFields.fatorFacilidade !== 'undefined') updateData.fatorFacilidade = Number(updateFields.fatorFacilidade);
        if (typeof updateFields.qualidade !== 'undefined') updateData.qualidade = Number(updateFields.qualidade);
        if (typeof updateFields.lastReview !== 'undefined') updateData.lastReview = new Date(updateFields.lastReview);
        if (typeof updateFields.nextReview !== 'undefined') updateData.nextReview = new Date(updateFields.nextReview);

        return prisma.card.update({
            where: { id: parseInt(id) },
            data: updateData,
        });
    },

    updateAllCardsDifficulty: async () => {
        await prisma.card.updateMany({ data: { dificuldade: true } });
        return prisma.card.findMany();
    },

    deleteCardById: async (id) => {
        return prisma.card.delete({
            where: { id: parseInt(id) }
        })
    }
}