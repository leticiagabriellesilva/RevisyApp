import { executeQuery, executeQuerySingle, executeRun } from '../../database/sqlite';

module.exports = {
  createBaralho: async ({ nome }) => {
    const now = new Date().toISOString();
    const result = await executeRun(
      'INSERT INTO Baralho (nome, createdAt) VALUES (?, ?)',
      [nome, now]
    );

    return {
      id: result.lastInsertRowId,
      nome,
      createdAt: now,
    };
  },

  getAllBaralhos: async () => {
    const baralhos = await executeQuery('SELECT * FROM Baralho ORDER BY id DESC');
    
    // Buscar cards de cada baralho
    const baralhosWithCards = await Promise.all(
      baralhos.map(async (baralho) => {
        const cards = await executeQuery(
          'SELECT * FROM Card WHERE baralhoId = ?',
          [baralho.id]
        );
        return {
          ...baralho,
          cards: cards.map(card => ({
            ...card,
            dificuldade: card.dificuldade === 1,
          })),
        };
      })
    );

    return baralhosWithCards;
  },

  getBaralhoById: async (id) => {
    const baralho = await executeQuerySingle(
      'SELECT * FROM Baralho WHERE id = ?',
      [parseInt(id)]
    );

    if (!baralho) return null;

    const cards = await executeQuery(
      'SELECT * FROM Card WHERE baralhoId = ?',
      [baralho.id]
    );

    return {
      ...baralho,
      cards: cards.map(card => ({
        ...card,
        dificuldade: card.dificuldade === 1,
      })),
    };
  },

  updateBaralhoById: async (id, { nome }) => {
    await executeRun(
      'UPDATE Baralho SET nome = ? WHERE id = ?',
      [nome, parseInt(id)]
    );

    return await module.exports.getBaralhoById(id);
  },

  deleteBaralhoById: async (id) => {
    const baralho = await module.exports.getBaralhoById(id);
    if (!baralho) {
      throw new Error('Baralho não encontrado');
    }

    // Todos os cards do baralho vão deletados por causa do DELETE CASCADE
    await executeRun('DELETE FROM Baralho WHERE id = ?', [parseInt(id)]);
    return baralho;
  },

  getBaralhosWithReviewStatus: async () => {
    const baralhos = await module.exports.getAllBaralhos();
    const now = new Date().toISOString();

    // Cards que precisam de revisão são os que o nextReview já passou
    return baralhos.map(baralho => {
      const hasCardsToReview = baralho.cards.some(card => 
        !card.nextReview || card.nextReview <= now
      );
      
      const cardsToReviewCount = baralho.cards.filter(card => 
        !card.nextReview || card.nextReview <= now
      ).length;

      return {
        ...baralho,
        hasCardsToReview,
        cardsCount: baralho.cards.length,
        cardsToReviewCount,
      };
    });
  },
};
