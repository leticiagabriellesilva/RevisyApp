import React, { useState, useEffect } from 'react';
import {View,Text,TouchableOpacity,ScrollView,Alert,useColorScheme,Modal,StyleSheet} from 'react-native';
import { useFocusEffect, DrawerActions, useNavigation } from '@react-navigation/native';
import TopBar from '../../components/TopBar/TopBar';
import styles from './Style';
import * as BaralhoService from '../../services/baralhoServiceMobile';
import * as CardService from '../../services/cardServiceMobile';

import BaralhoCard from '../../components/BaralhoCard/BaralhoCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HomeScreen({ navigation }) {
  const drawerNavigation = useNavigation();
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

  useFocusEffect(
    React.useCallback(() => {
      fetchBaralhos();
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      fetchBaralhos();
    }, [])
  );

  const fetchBaralhos = async () => {
    try {
      const data = await BaralhoService.getBaralhosWithReviewStatus();
      setBaralhos(data);
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Não foi possível carregar os baralhos.', [{ text: 'OK' }]);
    }
  };

  const handleResetDificuldade = async () => {
    try {
      await CardService.updateAllCardsDifficulty();
      Alert.alert('Sucesso', 'Dificuldade dos cards reinicializada!');
      fetchBaralhos();
    } catch (err) {
      Alert.alert('Erro', 'Ocorreu um erro ao reinicializar as dificuldades.');
    }
  };

  const handleDeleteBaralho = async (baralhoId) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este baralho e todos os seus cards?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await BaralhoService.deleteBaralhoById(baralhoId);
              setBaralhos(prevBaralhos => prevBaralhos.filter(baralho => baralho.id !== baralhoId));
              Alert.alert('Sucesso', 'Baralho deletado com sucesso!');
            } catch (err) {
              Alert.alert('Erro', 'Não foi possível excluir o baralho.');
            }
          },
        },
      ]
    );
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
        onPress1={() => navigation.dispatch(DrawerActions.openDrawer())}
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