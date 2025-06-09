import React, { useRef, useState, useEffect } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View, Alert, TouchableOpacity } from 'react-native';
import TopBar from '../../components/TopBar/TopBar';
import IconTextButton from '../../components/IconTextButton/IconTextButton';
import ButtonImage from '../../components/ButtonImage/ButtonImage';

//Tem que passar o baralho para entrar nessa tela.
export default function App(pack) {
  const [baralho, setBaralho] = useState('Redes');
  const [pergunta, setPergunta] = useState('');
  const [resposta, setResposta] = useState('');
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

   useEffect(() => {
  fetch('http://localhost:3001/cards')
    .then(res => res.json())
    .then(data => {
      console.log('Cards recebidos:', data); // <--- Adicione isso
      setCards(data.filter(card => card.dificuldade === true || card.dificuldade === 1));
    })
    .catch(err => console.error('Erro ao buscar cards:', err));
}, []);

  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const flipToFrontStyle = {
    transform: [{rotateY: frontInterpolate}]
  };


  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const flipToBackStyle = {
    transform: [{rotateY: backInterpolate}]
  };


  const flipCard = () => {
    if(isFlipped) {

      Animated.spring(flipAnimation, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {

      Animated.spring(flipAnimation, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
    setIsFlipped(!isFlipped);
  };

  function handleDificuldade(cardId, dificuldade) {
  fetch(`http://localhost:3001/cards/${cardId}/dificuldade`, {
    method: 'PATCH',
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
          // Se ficou fácil, remove da fila
          updatedCards = updatedCards.filter(card => card.id !== cardId);
        } else {
          // Se ficou difícil, move para o final da fila
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

  if (cards.length === 0 || currentIndex >= cards.length) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Parabéns! Você revisou todos os cards!</Text>
    </View>
  );
}

  return (
    <View style={styles.container}>
        {/* Precisa incrementar o topbar igual a tela home (Leticia) */}
        <TopBar
            image1={require('../../assets/backIcon.png')}
            onPress1={() => Alert.alert('Ainda nada', 'Aqui vai voltar para a tela anterior')}
            style1={styles.image}
            image2={require('../../assets/confirmIcon.png')}
            onPress2={() => Alert.alert('Ainda nada', 'Aqui vai salvar e resetar os cards')}
            style2={styles.image}
        />
        <IconTextButton
            icon={require('../../assets/backReadCard.png')}
            text={/*Nome do baralho*/"Testando"}
            onPress={() => Alert.alert('Ainda nada','Volta para a aba home')}
        />

        <View style={styles.content}>

            <View style={styles.showCard}>
                <TouchableWithoutFeedback onPress={flipCard}>
                    <View style={styles.cardContainer}>
                        {/*PERGUNTA*/}
                    <Animated.View style={[styles.front, styles.card, flipToFrontStyle]}>
                        <Text style={styles.text}>{cards[currentIndex]?.pergunta || 'Sem perguntas'}</Text>
                    </Animated.View>

                    {/*RESPOSTA*/}
                    <Animated.View style={[styles.back, styles.card, flipToBackStyle]}>
                        <Text style={styles.text}>{cards[currentIndex]?.resposta || 'Sem resposta'}</Text>
                    </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            </View>

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
                      onPress={() => handleDificuldade(cards[currentIndex].id, 1)}
                      >
                        <Text>Difícil</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.answerButton}>
                        <Text>Médio</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.answerButton}
                      onPress={() => handleDificuldade(cards[currentIndex].id, 0)}
                      >
                        <Text>Fácil</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>

        

    </View>
  );
}

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },

  showCard: {
    alignItems: 'center',
    marginTop: 25,
  },
  cardContainer: {
    width: width - 50,
    height: height / 3,
  },
  front: {
    backgroundColor: '#E2C2FB',
  },
  back: {
    backgroundColor: '#96D289',
  },
  card: {
    width: width - 50,
    height: height / 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    position: 'absolute',
    backfaceVisibility: 'hidden',
  },
  text: {
    fontSize: 20
  },
  content:{
    flex: 1,
    justifyContent: 'space-evenly'
  },
  answer:{
    alignItems: 'center',
    width: '100%'
  },
  informationTitle:{
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  imageInformationButtons:{
    width: 16,
    height: 16,
    marginLeft: 5,
  },
  answerButtons:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  answerButton:{
    width: 80,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'coral'
  }

});