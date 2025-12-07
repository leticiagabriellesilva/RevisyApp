import React, { useState, useEffect } from 'react';
import {View,Text,TouchableOpacity,ScrollView,Alert,useColorScheme,StyleSheet} from 'react-native';
import { useFocusEffect, DrawerActions, useNavigation } from '@react-navigation/native';
import TopBar from '../../components/TopBar/TopBar';
import styles from './Style';
import * as BaralhoService from '../../services/baralhoServiceMobile';
import * as CardService from '../../services/cardServiceMobile';

import BaralhoCard from '../../components/BaralhoCard/BaralhoCard';

export default function HomeScreen({ navigation }) {
  const drawerNavigation = useNavigation();
  const colorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');
  const textColor = darkMode ? '#fff' : '#000';

  const [baralhos, setBaralhos] = useState([]);
  const [cards, setCards] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedBaralhoId, setSelectedBaralhoId] = useState(null);

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
    setSelectedBaralhoId(id);
    setMenuVisible(true);
  };
  const closeMenu = () => {
    setMenuVisible(false);
    setSelectedBaralhoId(null);
  };

  const handleEditBaralho = (baralhoId) => {
    const baralho = baralhos.find(b => b.id === baralhoId);
    if (baralho) {
      navigation.navigate('CreateBaralho', { 
        baralhoToEdit: baralho,
        onBaralhoCreated: fetchBaralhos 
      });
    }
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
            onOpenMenu={openMenu}
          />
        ))}
      </ScrollView>

      {menuVisible && (
        <TouchableOpacity 
          style={modalStyles.backdrop}
          activeOpacity={1}
          onPress={closeMenu}
        >
          <View style={modalStyles.menuBox}>
            <TouchableOpacity
              style={modalStyles.menuItem}
              onPress={() => {
                closeMenu();
                if (selectedBaralhoId) handleEditBaralho(selectedBaralhoId);
              }}
            >
              <Text style={modalStyles.menuText}>✏️ Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={modalStyles.menuItem}
              onPress={() => {
                closeMenu();
                if (selectedBaralhoId) handleDeleteBaralho(selectedBaralhoId);
              }}
            >
              <Text style={modalStyles.menuText}>🗑️ Excluir</Text>
            </TouchableOpacity>

            <View style={modalStyles.separator} />

            <TouchableOpacity
              style={modalStyles.menuItem}
              onPress={closeMenu}
            >
              <Text style={[modalStyles.menuText, { textAlign: 'center' }]}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateBaralho', { onBaralhoCreated: fetchBaralhos })}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const modalStyles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  menuBox: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#AD94DB',
    borderRadius: 12,
    padding: 8,
    minWidth: 140,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginVertical: 4,
  },
});