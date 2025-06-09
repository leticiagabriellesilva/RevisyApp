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

      <ScrollView contentContainerStyle={styles.scroll}>
        {cards.map((card, index) => (
          <View
            key={card.id ?? index}
            style={[styles.card, { backgroundColor: '#AD94DB' }]}
          >
            <Text style={[styles.cardText, { color: textColor }]}>
              {card.pergunta}
            </Text>
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