import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Dimensions, StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import TopBar from '../../components/TopBar/TopBar';
import CardComponent from '../../components/Card/CardComponent';
import ButtonImage from '../../components/ButtonImage/ButtonImage';

//Tem que passar o baralho para entrar nessa tela.
export default function AppEspacada({ navigation }) {
  const API_URL = 'http://localhost:3001';
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

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
    let reps;
    let intervalMin;

    if (quality < 3) {
      // Qualidade 1 (Esqueci) ou 2 (Difícil)
      reps = 0;
      intervalMin = quality === 1 ? 0 : 10; // imediata ou breve reforço
    } else {
      // Qualidade 3 (Médio) ou 5 (Fácil) - e segue progressão multiplicando pelo EF
      if (prevReps === 0) {
        reps = 1;
        // Médio: 1 dia (1440 min) e Fácil: 2 dias (2880 min)
        intervalMin = quality >= 5 ? 2880 : 1440;
      } else if (prevReps === 1) {
        reps = 2;
        // Médio: 6 dias (8640 min) e Fácil: 10 dias (14400 min)
        intervalMin = quality >= 5 ? 14400 : 8640;
      } else {
        reps = prevReps + 1;
        const base = prevInterval > 0 ? prevInterval : (quality >= 5 ? 14400 : 8640);
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
    // Intervalo 0 o nextReview fica nulo para continuar na fila
    const next = intervalMin === 0 ? null : new Date(now.getTime() + intervalMin * 60 * 1000);

    const payload = {
      repeticoes: reps,
      intervalo: intervalMin,
      fatorFacilidade: EF,
      qualidade: quality,
      lastReview: now.toISOString(),
      nextReview: next ? next.toISOString() : null,
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
        } else if (quality === 2) {
          // Difícil: sai da sessão (volta depois de 10 min)
          setCards(prev => prev.filter(c => c.id !== current.id));
        } else {
          // Médio e Fácil: sai da sessão para intervalos maiores
          setCards(prev => prev.filter(c => c.id !== current.id));
        }
        setCurrentIndex(0);
        // Reseta o card para a frente
        setIsFlipped(false);
      })
      .catch(err => console.error('Erro ao atualizar card:', err));
  }

  if (cards.length === 0 || currentIndex >= cards.length) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fafafa' }}>
        <Text style={{ fontSize: 20, color: '#333', textAlign: 'center', paddingHorizontal: 16 }}>Não há mais cards a serem revisados.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Drawer')} style={{ marginTop: 16 }}>
          <Text style={{ color: '#6A5ACD' }}>Voltar para a Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TopBar
        image1={require('../../assets/backIcon.png')}
        onPress1={() => navigation.navigate('Drawer')}
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
        <CardComponent 
          pergunta={cards[currentIndex]?.pergunta}
          resposta={cards[currentIndex]?.resposta}
          ref={cardRef}
        />

        <View style={styles.answer}>
          <View style={styles.informationTitle}>
            <Text>Nível de dificuldade</Text>
            <ButtonImage
              image={require('../../assets/informacoes.png')}
              onPress={() => Alert.alert('Nível de dificuldade', 'Isso define quanto tempo você precisa entre uma revisão e outra:\n\n• Esqueci - Revisar novamente nesta sessão\n• Difícil - 10 minutos\n• Médio - 1 dia (primeira vez) ou 6 dias (segunda vez)\n• Fácil - 2 dias (primeira vez) ou 10 dias (segunda vez)\n\nDepois o intervalo aumenta automaticamente.')}
              style={styles.imageInformationButtons}
            />
          </View>
          <View style={styles.answerButtons}>
            <TouchableOpacity style={styles.answerButton}
              onPress={() => {
                defineNota(1); // Esqueci
              }}
            >
              <Text style={styles.answerTexts}>Esqueci</Text>
              <Text style={styles.answerHint}>Tente novamente</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.answerButton}
              onPress={() => {
                defineNota(2); // Difícil
              }}
            >
              <Text style={styles.answerTexts}>Difícil</Text>
              <Text style={styles.answerHint}>{calculaProximaData(2)}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.answerButton}
              onPress={() => {
                defineNota(3); // Médio
              }}
            >
              <Text style={styles.answerTexts}>Médio</Text>
              <Text style={styles.answerHint}>{calculaProximaData(3)}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.answerButton}
              onPress={() => {
                defineNota(5); // Fácil
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