import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  StyleSheet,
  useColorScheme
} from 'react-native';
import TopBar from '../../components/TopBar/TopBar';
import styles from './Style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HomeScreen({ navigation }) {
  const colorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');
  const textColor = darkMode ? '#fff' : '#000';

  const [cards, setCards] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);

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

  const openMenu = (id) => {
    setSelectedCardId(id);
    setModalVisible(true);
  };
  const closeMenu = () => {
    setModalVisible(false);
    setSelectedCardId(null);
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
            style={[styles.card, { backgroundColor: '#AD94DB', position: 'relative' }]}
          >
            <TouchableOpacity
              style={[styles.deleteButton, { position: 'absolute', top: 8, right: 8, zIndex: 10, backgroundColor: 'transparent' }]}
              onPress={() => openMenu(card.id)}
            >
              <MaterialCommunityIcons name="dots-vertical" size={28} color="#fff" />
            </TouchableOpacity>
            <Text style={[styles.cardText, { color: textColor }]}>
              {card.pergunta}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Modal customizado para menu */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <TouchableOpacity style={customMenuStyles.overlay} activeOpacity={1} onPress={closeMenu}>
          <View style={customMenuStyles.menuBox}>
            <MaterialCommunityIcons name="dots-vertical" size={28} color="#fff" style={{ alignSelf: 'flex-end', marginBottom: 16 }} />
            <TouchableOpacity
              style={customMenuStyles.menuItem}
              onPress={() => { closeMenu(); /* ação editar */ }}
            >
              <Text style={customMenuStyles.menuText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={customMenuStyles.menuItem}
              onPress={() => { closeMenu(); handleDeleteCard(selectedCardId); }}
            >
              <Text style={customMenuStyles.menuText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateCard')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const customMenuStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuBox: {
    backgroundColor: '#AD94DB',
    borderRadius: 24,
    padding: 32,
    minWidth: 200,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  menuItem: {
    marginVertical: 12,
  },
  menuText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});