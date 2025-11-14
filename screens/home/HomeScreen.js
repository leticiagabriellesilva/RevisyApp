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

  const [baralhos, setBaralhos] = useState([]);

  useEffect(() => {
    fetchBaralhos();
  }, []);

  const fetchBaralhos = async () => {
    try {
      const response = await fetch('http://localhost:3001/baralhos/status');
      const data = await response.json();
      setBaralhos(data);
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Não foi possível carregar os baralhos.');
    }
  };

  const handleResetDificuldade = async () => {
    try {
      const response = await fetch('http://localhost:3001/cards/dificuldade', {
        method: 'PUT',
      });
      if (response.ok) {
        alert('Dificuldade dos cards reinicializada!');
        fetchBaralhos(); // Atualiza a lista de baralhos
      } else {
        alert('Erro', 'Não foi possível reinicializar as dificuldades.');
      }
    } catch (err) {
      alert('Erro', 'Ocorreu um erro ao reinicializar as dificuldades.');
    }
  };

  const handleDeleteBaralho = async (baralhoId) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este baralho e todos os seus cards?');
    
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3001/baralhos/${baralhoId}`, {
          method: 'DELETE',
        });
                
        if (response.ok) {
          setBaralhos(prevBaralhos => prevBaralhos.filter(baralho => baralho.id !== baralhoId));
          window.alert('Baralho deletado com sucesso!');
        } else {
          window.alert('Não foi possível excluir o baralho.');
        }
      } catch (err) {
        window.alert('Ocorreu um erro ao excluir o baralho.');
      }
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
        <Text style={styles.headerText}>Baralhos</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {baralhos.map((baralho, index) => (
          <TouchableOpacity
            key={baralho.id ?? index}
            style={[
              styles.card, 
              { backgroundColor: baralho.hasCardsToReview ? '#AD94DB' : '#96D289' }
            ]}
            onPress={() => navigation.navigate('BaralhoCards', { baralhoId: baralho.id, baralhoName: baralho.nome })}
          >
            <View style={styles.baralhoInfo}>
              <Text style={[styles.cardText, { color: textColor }]}>
                {baralho.nome}
              </Text>
              <Text style={[styles.baralhoSubtext, { color: textColor }]}>
                {baralho.cardsCount} cards | {baralho.cardsToReviewCount} para revisar
              </Text>
            </View>
            
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={(e) => {
                e.stopPropagation();
                handleDeleteBaralho(baralho.id);
              }}
            >
              <Text style={styles.deleteButtonText}>🗑️</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateBaralho', { onBaralhoCreated: fetchBaralhos })}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}