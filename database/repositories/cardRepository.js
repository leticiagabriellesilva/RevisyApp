import { executeQuery, executeQuerySingle, executeRun } from '../../database/sqlite';

// Conversão do bool pro int pq o sqlite não tem bool nativamente)
const boolToInt = (val) => val ? 1 : 0;
const intToBool = (val) => val === 1;

module.exports = {
  createCard: async ({ pergunta, resposta, dificuldade = false, repeticoes = 0, intervalo = 0, fatorFacilidade = 2.5, qualidade = 0, lastReview = null, nextReview = null, baralhoId }) => {
    const now = new Date().toISOString();
    const nextReviewValue = nextReview || now;
    
    const result = await executeRun(
      `INSERT INTO Card (pergunta, resposta, dificuldade, repeticoes, intervalo, fatorFacilidade, qualidade, createdAt, updatedAt, lastReview, nextReview, baralhoId)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [pergunta, resposta, boolToInt(dificuldade), repeticoes, intervalo, fatorFacilidade, qualidade, now, now, lastReview, nextReviewValue, parseInt(baralhoId)]
    );

    return {
      id: result.lastInsertRowId,
      pergunta,
      resposta,
      dificuldade,
      repeticoes,
      intervalo,
      fatorFacilidade,
      qualidade,
      createdAt: now,
      updatedAt: now,
      lastReview,
      nextReview: nextReviewValue,
      baralhoId: parseInt(baralhoId),
    };
  },

  getAllCards: async () => {
    const cards = await executeQuery('SELECT * FROM Card ORDER BY id DESC');
    return cards.map(card => ({
      ...card,
      dificuldade: intToBool(card.dificuldade),
    }));
  },

  getCardById: async (id) => {
    const card = await executeQuerySingle('SELECT * FROM Card WHERE id = ?', [parseInt(id)]);
    if (!card) return null;
    return {
      ...card,
      dificuldade: intToBool(card.dificuldade),
    };
  },

  updateCardById: async (id, updateFields) => {
    const sets = [];
    const values = [];

    if (typeof updateFields.pergunta !== 'undefined') {
      sets.push('pergunta = ?');
      values.push(updateFields.pergunta);
    }
    if (typeof updateFields.resposta !== 'undefined') {
      sets.push('resposta = ?');
      values.push(updateFields.resposta);
    }
    if (typeof updateFields.dificuldade !== 'undefined') {
      sets.push('dificuldade = ?');
      values.push(boolToInt(!!updateFields.dificuldade));
    }
    if (typeof updateFields.repeticoes !== 'undefined') {
      sets.push('repeticoes = ?');
      values.push(Number(updateFields.repeticoes));
    }
    if (typeof updateFields.intervalo !== 'undefined') {
      sets.push('intervalo = ?');
      values.push(Number(updateFields.intervalo));
    }
    if (typeof updateFields.fatorFacilidade !== 'undefined') {
      sets.push('fatorFacilidade = ?');
      values.push(Number(updateFields.fatorFacilidade));
    }
    if (typeof updateFields.qualidade !== 'undefined') {
      sets.push('qualidade = ?');
      values.push(Number(updateFields.qualidade));
    }
    if (typeof updateFields.lastReview !== 'undefined') {
      sets.push('lastReview = ?');
      values.push(updateFields.lastReview ? new Date(updateFields.lastReview).toISOString() : null);
    }
    if (typeof updateFields.nextReview !== 'undefined') {
      sets.push('nextReview = ?');
      values.push(updateFields.nextReview ? new Date(updateFields.nextReview).toISOString() : null);
    }

    sets.push('updatedAt = ?');
    values.push(new Date().toISOString());

    values.push(parseInt(id));

    await executeRun(
      `UPDATE Card SET ${sets.join(', ')} WHERE id = ?`,
      values
    );

    return await module.exports.getCardById(id);
  },

  updateAllCardsDifficulty: async () => {
    await executeRun('UPDATE Card SET dificuldade = 1, updatedAt = ?', [new Date().toISOString()]);
    return await module.exports.getAllCards();
  },

  deleteCardById: async (id) => {
    const card = await module.exports.getCardById(id);
    if (!card) {
      throw new Error('Card não encontrado');
    }
    await executeRun('DELETE FROM Card WHERE id = ?', [parseInt(id)]);
    return card;
  },

  getCardsByBaralhoId: async (baralhoId) => {
    const cards = await executeQuery(
      'SELECT * FROM Card WHERE baralhoId = ? ORDER BY id DESC',
      [parseInt(baralhoId)]
    );
    return cards.map(card => ({
      ...card,
      dificuldade: intToBool(card.dificuldade),
    }));
  },

  getCardsToReviewByBaralhoId: async (baralhoId) => {
    const now = new Date().toISOString();
    const cards = await executeQuery(
      `SELECT * FROM Card 
       WHERE baralhoId = ? AND (nextReview IS NULL OR nextReview <= ?)
       ORDER BY nextReview ASC`,
      [parseInt(baralhoId), now]
    );
    return cards.map(card => ({
      ...card,
      dificuldade: intToBool(card.dificuldade),
    }));
  },
};
