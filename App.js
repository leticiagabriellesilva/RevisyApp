import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import MainNavigation from './navigations/MainNavigation';
import { initDatabase } from './database/sqlite';

export default function App() {
  const [isDbInitialized, setIsDbInitialized] = useState(false);
  const [dbError, setDbError] = useState(null);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      await initDatabase();
      setIsDbInitialized(true);
    } catch (error) {
      console.error('Erro ao iniciar banco de dados', error);
      setDbError(error.message);
    }
  };

  if (dbError) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Erro ao inicializar banco de dados</Text>
        <Text style={styles.errorDetail}>{dbError}</Text>
      </View>
    );
  }

  if (!isDbInitialized) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6A5ACD" />
        <Text style={styles.loadingText}>Inicializando banco de dados...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 18,
    color: '#d32f2f',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  errorDetail: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});