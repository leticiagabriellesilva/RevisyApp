import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View, Alert, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import TopBar from '../../components/TopBar/TopBar';
import IconTextButton from '../../components/IconTextButton/IconTextButton';
import ButtonImage from '../../components/ButtonImage/ButtonImage';
import Ionicons from '@expo/vector-icons/Ionicons';

//Tem que passar o baralho para entrar nessa tela.
export default function App({ navigation }) {
  const API_URL = 'http://localhost:3001';
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const carregaCardsAFazer = useCallback(() => {
    fetch(`${API_URL}/cards`)
      .then(res => res.json())
      .then(data => {
        const now = new Date();
        const due = data.filter(card => {
          // Cartas sem nextReview são consideradas como vencidas
          if (!card.nextReview) return true;
          const next = new Date(card.nextReview);
          return next <= now;
        });
        setCards(due);
      })
      .catch(err => console.error('Erro ao buscar cards:', err));
  }, []);

  useEffect(() => {
    carregaCardsAFazer();
  }, [carregaCardsAFazer]);

  useFocusEffect(
    useCallback(() => {
      carregaCardsAFazer();
      return () => {};
    }, [carregaCardsAFazer])
  );

  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const flipToFrontStyle = {
    transform: [{ rotateY: frontInterpolate }]
  };


  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const flipToBackStyle = {
    transform: [{ rotateY: backInterpolate }]
  };

  const flipCard = () => {
    if (isFlipped) {
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

  function tempoParaTexto(mins){
    if (mins < 60) return `${mins} min`;
    if (mins < 1440) {
      const h = Math.round(mins/60);
      return `${h} h`;
    }
    const d = Math.round(mins/1440);
    return d === 1 ? '1 dia' : `${d} dias`;
  }

  function calculaEspacamento(prevReps, prevInterval, prevEF, quality) {
    const EF = Math.max(1.3, prevEF - 0.8 + 0.28 * quality - 0.02 * quality * quality);
    let reps = prevReps;
    let intervalMin = prevInterval;

    if (quality < 3) {
      reps = 0;
      intervalMin = 10; // 10 minutos
    } else if (quality >= 4) {
      if (prevReps === 0 || prevReps === 1) {
        reps = 2;
        intervalMin = 2880; // 2 dias
      } else {
        reps = prevReps + 1;
        const base = prevInterval > 0 ? prevInterval : 2880;
        intervalMin = Math.round(base * EF);
      }
    } else {
      reps = prevReps + 1;
      if (reps === 1) intervalMin = 30; // 30 minutos
      else if (reps === 2) intervalMin = 2880; // 2 dias
      else {
        const base = prevInterval > 0 ? prevInterval : 2880;
        intervalMin = Math.round(base * EF);
      }
    }

    return { EF, reps, intervalMin };
  }

  function calculaEspacamentoParaCard(card, quality) {
    const prevReps = Number(card.repeticoes || 0);
    const prevInterval = Number(card.intervalo || 0);
    const prevEF = Number(card.fatorFacilidade || 2.5);
    return calculaEspacamento(prevReps, prevInterval, prevEF, quality);
  }

  function calculaProximaData(quality){
    const current = cards[currentIndex];
    if (!current) return '';
    const { intervalMin } = calculaEspacamentoParaCard(current, quality);
    return tempoParaTexto(intervalMin);
  }

  function defineNota(quality) {
    const current = cards[currentIndex];
    if (!current) return;
    const now = new Date();
    const { EF, reps, intervalMin } = calculaEspacamentoParaCard(current, quality);
    const next = new Date(now.getTime() + intervalMin * 60 * 1000);

    const payload = {
      repeticoes: reps,
      intervalo: intervalMin,
      fatorFacilidade: EF,
      qualidade: quality,
      lastReview: now.toISOString(),
      nextReview: next.toISOString(),
    };

    fetch(`${API_URL}/cards/${current.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(() => {
        if (quality === 1) {
          // Esqueci: mantém na mesma sessão e move pro final
          setCards(prev => {
            const copy = [...prev];
            const idx = copy.findIndex(c => c.id === current.id);
            if (idx !== -1) {
              const [item] = copy.splice(idx, 1);
              copy.push(item);
            }
            return copy;
          });
        } else {
          // Difícil, Médio, Fácil: sai da sessão atual
          setCards(prev => prev.filter(c => c.id !== current.id));
        }
        setCurrentIndex(0);
        if (isFlipped) {
          Animated.spring(flipAnimation, {
            toValue: 0,
            friction: 8,
            tension: 10,
            useNativeDriver: true,
          }).start(() => setIsFlipped(false));
        }
      })
      .catch(err => console.error('Erro ao atualizar card:', err));
  }

  if (cards.length === 0 || currentIndex >= cards.length) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fafafa' }}>
        <Text style={{ fontSize: 20, color: '#333', textAlign: 'center', paddingHorizontal: 16 }}>Não há mais cards a serem revisados.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginTop: 16 }}>
          <Text style={{ color: '#6A5ACD' }}>Voltar para a Home</Text>
        </TouchableOpacity>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      {/* Precisa incrementar o topbar igual a tela home (Leticia) */}
      <TopBar
        image1={require('../../assets/backIcon.png')}
        onPress1={() => navigation.navigate('Home')}
        style1={styles.image}
        image2={require('../../assets/confirmIcon.png')}
        onPress2={() => {
          Alert.alert(
            'Encerrar revisão?',
            'Você ainda não escolheu uma dificuldade para este card. Deseja sair mesmo assim?',
            [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Sair', style: 'destructive', onPress: () => navigation.navigate('Home') },
            ]
          );
        }}
        style2={styles.image}
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
              onPress={() => Alert.alert('Nível de dificuldade', 'Isso define quanto tempo você precisa entre uma revisão e outra. Recomendado: \nDifícil - 10 minutos \nMédio - 30 min \nFácil - 2 dias')}
              style={styles.imageInformationButtons}
            />
          </View>
          <View style={styles.answerButtons}>
            <TouchableOpacity style={styles.answerButton}
              onPress={() => {
                defineNota(1); // Esqueci
                if (isFlipped) flipCard();
              }}
            >
              <Text style={styles.answerTexts}>Esqueci</Text>
              <Text style={styles.answerHint}>Tente novamente</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.answerButton}
              onPress={() => {
                defineNota(2); // Difícil
                if (isFlipped) flipCard();
              }
              }
            >
              <Text style={styles.answerTexts}>Difícil</Text>
              <Text style={styles.answerHint}>{calculaProximaData(2)}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.answerButton}
              onPress={() => {
                defineNota(3); // Médio
                if (isFlipped) flipCard();
              }}
            >
              <Text style={styles.answerTexts}>Médio</Text>
              <Text style={styles.answerHint}>{calculaProximaData(3)}</Text>
            </TouchableOpacity>

              <TouchableOpacity style={styles.answerButton}
              onPress={() => {
                defineNota(5); // Fácil
                if (isFlipped) flipCard();
              }}
            >
              <Text style={styles.answerTexts}>Fácil</Text>
              <Text style={styles.answerHint}>{calculaProximaData(5)}</Text>
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
  },
  answerHint: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
  }
});