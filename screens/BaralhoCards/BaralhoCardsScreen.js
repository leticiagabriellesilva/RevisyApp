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
import { StyleSheet } from 'react-native';

export default function BaralhoCardsScreen({ route, navigation }) {
  const { baralhoId, baralhoName } = route.params;
  const colorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');
  const textColor = darkMode ? '#fff' : '#000';

  const [cards, setCards] = useState([]);
  const [cardsToReview, setCardsToReview] = useState([]);

  useEffect(() => {
    fetchCards();
  }, [baralhoId]);

  const fetchCards = async () => {
    try {
      const response = await fetch(`http://localhost:3001/cards/baralho/${baralhoId}`);
      const data = await response.json();
      setCards(data);

      // Buscar cards para revisão
      const reviewResponse = await fetch(`http://localhost:3001/cards/baralho/${baralhoId}/review`);
      const reviewData = await reviewResponse.json();
      setCardsToReview(reviewData);
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Não foi possível carregar os cards.');
    }
  };

  const handleDeleteCard = async (cardId) => {
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
    }
  };

  const handleResetDificuldade = async () => {
    try {
      const response = await fetch('http://localhost:3001/cards/dificuldade', {
        method: 'PUT',
      });
      if (response.ok) {
        alert('Dificuldade dos cards reinicializada!');
        fetchCards(); // Atualiza a lista de cards
      } else {
        alert('Erro', 'Não foi possível reinicializar as dificuldades.');
      }
    } catch (err) {
      alert('Erro', 'Ocorreu um erro ao reinicializar as dificuldades.');
    }
  };

  return (
    <View style={styles.container}>
      <TopBar
        image1={require('../../assets/backIcon.png')}
        onPress1={() => navigation.goBack()}
        style1={styles.icon}
        image2={require('../../assets/circular.png')}
        style2={styles.icon2}
        onPress2={handleResetDificuldade}
      />

      <View style={styles.headerBox}>
        <Text style={styles.headerText}>{baralhoName}</Text>
        <Text style={styles.subHeaderText}>{cards.length} cards</Text>
      </View>

      {cards.length > 0 && (
        <TouchableOpacity
          style={styles.reviewButton}
          onPress={() => navigation.navigate('App', { cards, baralhoId })}
        >
          <Text style={styles.reviewButtonText}>
            Iniciar Revisão ({cards.length} cards)
          </Text>
        </TouchableOpacity>
      )}

      {cardsToReview.length > 0 && (
        <TouchableOpacity
          style={[styles.reviewButton, { backgroundColor: '#F39C6B' }]}
          onPress={() => navigation.navigate('AppEspacada', { cards: cardsToReview, baralhoId, baralhoName })}
        >
          <Text style={styles.reviewButtonText}>
            Iniciar Revisão Espaçada ({cardsToReview.length} cards)
          </Text>
        </TouchableOpacity>
      )}

      <ScrollView contentContainerStyle={styles.scroll}>
        {cards.map((card, index) => (
          <View
            key={card.id ?? index}
            style={[styles.card, { backgroundColor: '#AD94DB' }]}
          >
            <View style={styles.cardContent}>
              <Text style={[styles.cardText, { color: textColor }]}>
                {card.pergunta}
              </Text>
            </View>
            
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
        onPress={() => navigation.navigate('CreateCard', { baralhoId, onCardCreated: fetchCards })}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 20 },
  headerBox: {
    backgroundColor: '#96D289',
    paddingVertical: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#122021',
  },
  subHeaderText: {
    fontSize: 14,
    color: '#122021',
    marginTop: 5,
  },
  card: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 4,
    position: 'relative',
  },
  cardContent: {
    flex: 1,
    alignItems: 'center',
    paddingRight: 40,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  deleteButtonText: {
    fontSize: 16,
  },
  icon: {
    width: 40,
    height: 40,
  },
  icon2: {
    width: 50,
    height: 50,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#96D289',
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabText: {
    fontSize: 28,
    color: '#122021',
  },
  reviewButton: {
    backgroundColor: '#AD94DB',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  reviewButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'normal',
  },
});
