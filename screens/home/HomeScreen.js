import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  useColorScheme
} from 'react-native';
import TopBar from '../../components/TopBar/TopBar';
import styles from './Style';

export default function HomeScreen({ navigation }) {
  const colorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');
  const textColor = darkMode ? '#fff' : '#000';

  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await fetch('http://localhost:3001/cards');
        const data = await response.json();
        setCards(data);
      } catch (err) {
        console.error(err);
        Alert.alert('Erro', 'Não foi possível carregar os cards.');
      }
    }
    fetchCards();
  }, []);

  const handleResetDificuldade = async () => {
    try {
      const response = await fetch('http://localhost:3001/cards/dificuldade', {
        method: 'PUT',
      });
      if (response.ok) {
        alert('Dificuldade dos cards reinicializada!');
        const data = await response.json();
        setCards(data);
      } else {
        alert('Erro', 'Não foi possível reinicializar as dificuldades.');
      }
    } catch (err) {
      alert('Erro', 'Ocorreu um erro ao reinicializar as dificuldades.');
    }
  };

  const handleDeleteCard = async (cardId) => {
    
    // Usei o confirm pq o alert não estava funcionando
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este card?');
    
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3001/cards/${cardId}`, {
          method: 'DELETE',
        });
                
        if (response.ok) {
          setCards(prevCards => prevCards.filter(card => card.id !== cardId));
          window.alert('Card deletado com sucesso!');
        } else {
          window.alert('Não foi possível excluir o card.');
        }
      } catch (err) {
        window.alert('Ocorreu um erro ao excluir o card.');
      }
    } else {
      console.log('Exclusão cancelada.');
    }
  };

  return (
    <View style={styles.container}>
      <TopBar
        image1={require('../../assets/image.png')}
        onPress1={() => navigation.openDrawer()}
        style1={styles.icon}
        image2={require('../../assets/circular.png')}
        style2={styles.icon2}
        onPress2={handleResetDificuldade}
      />

      <View style={styles.headerBox}>
        <Text style={styles.headerText}>Cards</Text>
      </View>

      <TouchableOpacity
        style={styles.reviewButton}
        onPress={() => navigation.navigate('App', { cards })}
      >
        <Text style={styles.reviewButtonText}>Iniciar Revisão</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.reviewButton}
        onPress={() => navigation.navigate('AppEspacada', { cards })}
      >
        <Text style={styles.reviewButtonText}>Iniciar Revisão Espaçada</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scroll}>
        {cards.map((card, index) => (
          <View
            key={card.id ?? index}
            style={[styles.card, { backgroundColor: '#AD94DB' }]}
          >
            <Text style={[styles.cardText, { color: textColor }]}>
              {card.pergunta}
            </Text>
            
            {/* Botão de deletar */}
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteCard(card.id)}
            >
              <Text style={styles.deleteButtonText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateCard')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}