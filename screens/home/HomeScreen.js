import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  useColorScheme,
} from 'react-native';
import TopBar from '../../components/TopBar/TopBar';
import styles from './Style'; 

export default function HomeScreen({ navigation }) {
  const colorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');

  const cards = [
    'Redes',
    'Banco de Dados',
    'Engenharia',
    'Algoritmos',
    'Programação',
    'Matemática',
    'Lógica de Programação',
  ];

  const backgroundColor = darkMode ? '#122021' : '#F2F2F2';
  const textColor = darkMode ? '#fff' : '#000';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TopBar
        darkMode={darkMode} 
        image1={require('../../assets/image.png')}
        onPress1={() => navigation.openDrawer()}
        style1={styles.icon}
        image2={
          darkMode
            ? require('../../assets/sun.png')
            : require('../../assets/moon.png')
        }
        onPress2={() => setDarkMode(!darkMode)}
        style2={[styles.icon, styles.iconButton]}
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
              alert('Será implementado em breve :)')
            }
          >
            <Text style={[styles.cardText, { color: textColor }]}>{title}</Text>
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