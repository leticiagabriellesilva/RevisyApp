import baralhoRepository from '../database/repositories/baralhoRepository';

export const createBaralho = async (baralhoData) => {
  if (!baralhoData.nome) {
    throw new Error('Nome do baralho é obrigatório.');
  }

  return await baralhoRepository.createBaralho(baralhoData);
};

export const getAllBaralhos = async () => {
  return await baralhoRepository.getAllBaralhos();
};

export const getBaralhoById = async (id) => {
  if (!id) throw new Error('ID do baralho não informado.');
  const baralho = await baralhoRepository.getBaralhoById(id);
  if (!baralho) throw new Error('Baralho não encontrado.');
  return baralho;
};

export const updateBaralhoById = async (id, updateData) => {
  if (!id) throw new Error('ID do baralho não informado.');
  return await baralhoRepository.updateBaralhoById(id, updateData);
};

export const deleteBaralhoById = async (id) => {
  if (!id) throw new Error('ID do baralho não informado.');
  return await baralhoRepository.deleteBaralhoById(id);
};

export const getBaralhosWithReviewStatus = async () => {
  return await baralhoRepository.getBaralhosWithReviewStatus();
};
