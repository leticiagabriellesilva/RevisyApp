import { openDatabase } from 'expo-sqlite';

const db = openDatabase('revisy.db');

export default db;