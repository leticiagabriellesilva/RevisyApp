import cardRepository from '../database/repositories/cardRepository';

export const createCard = async (cardData) => {
  if (!cardData.pergunta || !cardData.resposta) {
    throw new Error('Pergunta e resposta são obrigatórios.');
  }
  if (!cardData.baralhoId) {
    throw new Error('Baralho é obrigatório.');
  }

  return await cardRepository.createCard(cardData);
};

export const getAllCards = async () => {
  return await cardRepository.getAllCards();
};

export const getCardById = async (id) => {
  if (!id) throw new Error('ID do card não informado.');
  const card = await cardRepository.getCardById(id);
  if (!card) throw new Error('Card não encontrado.');
  return card;
};

export const updateCardById = async (id, updateData) => {
  if (!id) throw new Error('ID do card não informado.');
  return await cardRepository.updateCardById(id, updateData);
};

export const updateAllCardsDifficulty = async () => {
  return await cardRepository.updateAllCardsDifficulty();
};

export const updateCardsDifficultyByBaralhoId = async (baralhoId) => {
  if (!baralhoId) throw new Error('ID do baralho não informado.');
  return await cardRepository.updateCardsDifficultyByBaralhoId(baralhoId);
};

export const deleteCardById = async (id) => {
  if (!id) throw new Error('ID do card não informado.');
  return await cardRepository.deleteCardById(id);
};

export const getCardsByBaralhoId = async (baralhoId) => {
  if (!baralhoId) throw new Error('ID do baralho não informado.');
  return await cardRepository.getCardsByBaralhoId(baralhoId);
};

export const getCardsToReviewByBaralhoId = async (baralhoId) => {
  if (!baralhoId) throw new Error('ID do baralho não informado.');
  return await cardRepository.getCardsToReviewByBaralhoId(baralhoId);
};
