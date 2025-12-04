import * as SQLite from 'expo-sqlite';

let db = null;

export const initDatabase = async () => {
  if (db) return db;

  try {
    db = await SQLite.openDatabaseAsync('revisy.db');
    await createTables();
    console.log('Inicializado o banco de dados');
    return db;
  } catch (error) {
    console.error('Erro:', error);
    throw error;
  }
};

const createTables = async () => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS Baralho (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Tabela Card
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS Card (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pergunta TEXT NOT NULL,
        resposta TEXT NOT NULL,
        dificuldade INTEGER DEFAULT 0,
        repeticoes INTEGER DEFAULT 0,
        intervalo INTEGER DEFAULT 0,
        fatorFacilidade REAL DEFAULT 2.5,
        qualidade INTEGER DEFAULT 0,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
        lastReview TEXT,
        nextReview TEXT DEFAULT CURRENT_TIMESTAMP,
        baralhoId INTEGER NOT NULL,
        FOREIGN KEY (baralhoId) REFERENCES Baralho(id) ON DELETE CASCADE
      );
    `);
    
    await db.execAsync(`
      CREATE INDEX IF NOT EXISTS idx_card_baralho ON Card(baralhoId);
      CREATE INDEX IF NOT EXISTS idx_card_nextReview ON Card(nextReview);
    `);

    console.log('Criou');
  } catch (error) {
    console.error('Deu problema', error);
    throw error;
  }
};

export const getDatabase = () => {
  if (!db) {
    throw new Error('Erro ao inciar banco de dados');
  }
  return db;
};

export const executeQuery = async (query, params = []) => {
  try {
    const db = getDatabase();
    const result = await db.getAllAsync(query, params);
    return result;
  } catch (error) {
    console.error('Erro: ', error);
    throw error;
  }
};

export const executeQuerySingle = async (query, params = []) => {
  try {
    const db = getDatabase();
    const result = await db.getFirstAsync(query, params);
    return result;
  } catch (error) {
    console.error('Erro: ', error);
    throw error;
  }
};

// insert update e delete
export const executeRun = async (query, params = []) => {
  try {
    const db = getDatabase();
    const result = await db.runAsync(query, params);
    return result;
  } catch (error) {
    console.error('Erro', error);
    throw error;
  }
};

export const dropAllTables = async () => {
  try {
    const db = getDatabase();
    await db.execAsync(`
      DROP TABLE IF EXISTS Card;
      DROP TABLE IF EXISTS Baralho;
    `);
    console.log('Tabelas deletadas com sucesso');
  } catch (error) {
    console.error('Erro: ', error);
    throw error;
  }
};

// Resetar banco
export const resetDatabase = async () => {
  try {
    await dropAllTables();
    await createTables();
    console.log('Banco de dados resetado com sucesso');
  } catch (error) {
    console.error('Erro: ', error);
    throw error;
  }
};

export default {
  initDatabase,
  getDatabase,
  executeQuery,
  executeQuerySingle,
  executeRun,
  dropAllTables,
  resetDatabase,
};
