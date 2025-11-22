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
import BaralhoCard from '../../components/BaralhoCard/BaralhoCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HomeScreen({ navigation }) {
  const colorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');
  const textColor = darkMode ? '#fff' : '#000';

  const [baralhos, setBaralhos] = useState([]);
  const [cards, setCards] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);

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
        <Text style={styles.headerText}>Baralhos</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {baralhos.map((baralho, index) => (
          <BaralhoCard
            key={baralho.id ?? index}
            baralho={baralho}
            index={index}
            styles={styles}
            textColor={textColor}
            onPressCard={(b) => navigation.navigate('BaralhoCards', { baralhoId: b.id, baralhoName: b.nome })}
            onDelete={handleDeleteBaralho}
          />
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