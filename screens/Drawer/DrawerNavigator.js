import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleCardPress = (cardTitle) => {
    console.log(`Navigating to ${cardTitle} cards`);
  };

  const handleCreateCard = () => {
    console.log('Navigating to create card screen');
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const theme = {
    background: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    card: isDarkMode ? '#2A2A2A' : '#F0F0F0',
    text: isDarkMode ? '#FFFFFF' : '#000000',
    header: isDarkMode ? '#272727' : '#FFFFFF',
    headerBorder: isDarkMode ? '#333333' : '#E0E0E0',
    primaryButton: '#8BC34A',
    secondaryButton: isDarkMode ? '#333333' : '#E0E0E0',
    cardRedes: '#8BC34A',
    cardBancoDados: '#B39DDB',
    cardEngenharia: '#B39DDB',
  };

  // Sample card data
  const cards = [
    { id: 1, title: 'Redes', color: theme.cardRedes },
    { id: 2, title: 'Banco de Dados', color: theme.cardBancoDados },
    { id: 3, title: 'Engenharia', color: theme.cardBancoDados },
    // Add more cards as needed
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.header, borderBottomColor: theme.headerBorder }]}>
        <TouchableOpacity onPress={openDrawer} style={styles.profileButton}>
          <Image 
            source={require('./assets/profile.png')} 
            style={styles.profileImage}
            defaultSource={require('./assets/profile.png')}
          />
        </TouchableOpacity>
        
        <Text style={[styles.headerTitle, { color: theme.text }]}>Revisy</Text>
        
        <TouchableOpacity onPress={toggleTheme} style={[styles.themeButton, { backgroundColor: theme.primaryButton }]}>
          <Text style={styles.themeButtonText}>
            {isDarkMode ? '☀️' : '🌙'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Baralhos Title Bar */}
      <View style={[styles.titleBar, { backgroundColor: theme.primaryButton }]}>
        <Text style={styles.titleText}>Baralhos</Text>
      </View>
      
      {/* Cards ScrollView */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {cards.map((card) => (
          <TouchableOpacity
            key={card.id}
            style={[styles.card, { backgroundColor: card.color }]}
            onPress={() => handleCardPress(card.title)}
          >
            <Text style={styles.cardText}>{card.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Floating Action Button */}
      <TouchableOpacity 
        style={[styles.fab, { backgroundColor: theme.primaryButton }]}
        onPress={handleCreateCard}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60,
    borderBottomWidth: 1,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  themeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeButtonText: {
    fontSize: 16,
  },
  titleBar: {
    padding: 12,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    borderRadius: 8,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    borderRadius: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  fabText: {
    fontSize: 24,
    color: 'white',
  },
});

export default HomeScreen;
