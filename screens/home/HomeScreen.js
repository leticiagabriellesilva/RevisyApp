import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import TopBar from '../../components/TopBar/TopBar';
import styles from './Style';

export default function HomeScreen({ navigation }) {
  const cards = [
    'Redes', 
    'Banco de Dados', 
    'Engenharia',
    'Algoritmos', 
    'Matemática',
    'Lógica de Programação'
  ];

  return (
    <View style={styles.container}>
      <TopBar
        image1={require('../../assets/image.png')}
        onPress1={() => navigation.openDrawer()}
        image2={require('../../assets/pngbranco.png')}
        style1={styles.icon}
      />

      <View style={styles.headerBox}>
        <Text style={styles.headerText}>Baralhos</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {cards.map((title, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.card,
              { backgroundColor: index === 0 ? '#96D289' : '#AD94DB' },
            ]}
            onPress={() =>
              alert('Será implementado em breve')
            }
          >
            <Text style={styles.cardText}>{title}</Text>
          </TouchableOpacity>
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