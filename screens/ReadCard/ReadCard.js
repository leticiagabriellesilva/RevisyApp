import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import TopBar from '../../components/TopBar/TopBar';
import CardComponent from '../../components/Card/CardComponent';
import IconTextButton from '../../components/IconTextButton/IconTextButton';
import ButtonImage from '../../components/ButtonImage/ButtonImage';

//Tem que passar o baralho para entrar nessa tela.
export default function App({ navigation }) {
  const [baralho, setBaralho] = useState('Redes');
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardRef, setCardRef] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/cards')
      .then(res => res.json())
      .then(data => {
        setCards(data.filter(card => card.dificuldade === true || card.dificuldade === 1));
      })
      .catch(err => console.error('Erro ao buscar cards:', err));
  }, []);

  function handleDificuldade(cardId, dificuldade) {
    fetch(`http://localhost:3001/cards/${cardId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dificuldade })
    })
      .then(res => res.json())
      .then(data => {
        setCards(prevCards => {
          let updatedCards = prevCards.map(card =>
            card.id === cardId ? { ...card, dificuldade: !!dificuldade } : card
          );
          if (!dificuldade) {
            // Se ficou fácil, tira da fila
            updatedCards = updatedCards.filter(card => card.id !== cardId);
          } else {
            // Se ficou difícil, manda para o final da fila
            const card = updatedCards.find(card => card.id === cardId);
            updatedCards = updatedCards.filter(card => card.id !== cardId);
            updatedCards.push(card);
          }
          return updatedCards;
        });
        // Sempre volta para o primeiro card da fila
        setCurrentIndex(0);
      })
      .catch(err => {
        console.error('Erro ao atualizar dificuldade:', err);
      });
  }

  useEffect(() => {
    if (cards.length === 0 || currentIndex >= cards.length) {
      const timeout = setTimeout(() => navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      }), 1000);
      return () => clearTimeout(timeout);
    }
  }, [cards, currentIndex, navigation]);

  if (cards.length === 0 || currentIndex >= cards.length) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fafafa' }}>
        <Text style={{ fontSize: 20, color: '#333' }}>Você revisou todos os cards!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TopBar
        image1={require('../../assets/backIcon.png')}
        onPress1={() => navigation.navigate('Home')}
        style1={styles.image}
        image2={require('../../assets/confirmIcon.png')}
        onPress2={() => navigation.navigate('Home')}
        style2={styles.image}
      />

      <View style={styles.content}>
        <CardComponent 
          pergunta={cards[currentIndex]?.pergunta}
          resposta={cards[currentIndex]?.resposta}
          ref={setCardRef}
        />

        <View style={styles.answer}>
          <View style={styles.informationTitle}>
            <Text>Nível de dificuldade</Text>
            <ButtonImage
              image={require('../../assets/informacoes.png')}
              onPress={() => Alert.alert('Nível de dificuldade', 'Isso define quanto tempo você precisa entre uma revisão e outra. Recomendado: \nDifícil - 10 minutos \nBom - 30 min \nFácil - 2 dias')}
              style={styles.imageInformationButtons}
            />
          </View>
          <View style={styles.answerButtons}>
            <TouchableOpacity style={styles.answerButton}
              onPress={() => {
                handleDificuldade(cards[currentIndex].id, 1);
              }}
            >
              <Text style={styles.answerTexts}>Difícil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.answerButton}
              onPress={() => {
                handleDificuldade(cards[currentIndex].id, 0);
              }}
            >
              <Text style={styles.answerTexts}>Fácil</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  image: {
    width: 50,
    height: 50,
  },
  card: {
    width: width - 50,
    height: height / 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  text: {
    fontSize: 20
  },
  content: {
    flex: 1,
    justifyContent: 'space-evenly'
  },
  answer: {
    alignItems: 'center',
    width: '100%'
  },
  informationTitle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  imageInformationButtons: {
    width: 16,
    height: 16,
    marginLeft: 5,
  },
  answerButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  answerButton: {
    width: 100,
    height: 70,
    alignItems: 'center',
    borderRadius: 15,
    marginHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: '#F39C6B'
  },
  answerTexts: {
    fontSize: 18
  }
});