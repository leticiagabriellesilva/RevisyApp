import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated, TouchableWithoutFeedback, Dimensions, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import TopBar from '../../components/TopBar/TopBar';
import CardInput from '../../components/CardInput/CardInput';
import * as CardService from '../../services/cardServiceMobile';

export default function CreateCardScreen({ route, navigation }) {
  const { baralhoId, onCardCreated } = route.params || {};
  const [pergunta, setPergunta] = useState('');
  const [resposta, setResposta] = useState('');
  const [loading, setLoading] = useState(false);


  return (
    <View style={styles.container}>
      <TopBar
        image1={require('../../assets/backIcon.png')}
        onPress1={() => navigation.goBack()}
        style1={styles.image}
      />
        <View style={styles.content}>

        <View style={styles.showCard}>
            <View style={styles.cardContainer}>
              {/*PERGUNTA*/}
              <Animated.View style={[styles.front, styles.card, flipToFrontStyle]}>
                <CardInput
                  title={"Frente"}
                  value={pergunta}
                  onChangeText={setPergunta}
                  placeholder="Digite a pergunta aqui..."
                  corDeFundo={"#AD94DB"}
                  style = {styles.campoDeTexto}
                  editable={!isFlipped}
                  pointerEvents={!isFlipped ? "auto" : "none"}
                />
              </Animated.View>

              {/*RESPOSTA*/}
              <Animated.View style={[styles.back, styles.card, flipToBackStyle]}>
                <CardInput
                  title={"Verso"}
                  value={resposta}
                  onChangeText={setResposta}
                  placeholder="Digite a resposta aqui..."
                  corDeFundo={"#96D289"}
                  style = {styles.campoDeTexto}
                  editable={isFlipped}
                  pointerEvents={isFlipped ? "auto" : "none"}
                />
              </Animated.View>
            </View>
        </View>
        <View style={styles.FrenteVersoView}>
          <TouchableWithoutFeedback onPress={flipCard}>
            <View style={[styles.buttonview, buttonText === 'VERSO' ? styles.buttonVerso : styles.buttonFrente]}>
              <Text style={styles.buttonText}>{buttonText}</Text>
              <Image source={require('../../assets/verse.png')} style={{ width: 20, height: 20, marginLeft: 5 }} />
            </View>
          </TouchableWithoutFeedback>
        </View>

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        disabled={loading}
        onPress={async () => {
          if (!pergunta.trim() || !resposta.trim()) {
            Alert.alert('Erro', 'Preencha a pergunta e a resposta!');
            return;
          }

          if (!baralhoId) {
            Alert.alert('Erro', 'Baralho não especificado!', [{ text: 'OK' }]);
            return;
          }

          setLoading(true);
          try {
            await CardService.createCard({
              pergunta: pergunta.trim(),
              resposta: resposta.trim(),
              dificuldade: true,
              baralhoId: baralhoId,
              repeticoes: 0,
              intervalo: 0,
              fatorFacilidade: 2.5,
              qualidade: 0,
              nextReview: new Date().toISOString(),
            });

            setPergunta('');
            setResposta('');
            Alert.alert('Sucesso', 'Card criado com sucesso!');
            if (onCardCreated) {
              onCardCreated();
            }
            navigation.goBack();
          } catch (err) {
            console.log('Erro:', err);
            Alert.alert('Erro', err.message || 'Não foi possível criar o card.');
          } finally {
            setLoading(false);
          }
        }}
      >
        <Text style={styles.buttonText}>{loading ? 'Salvando...' : 'Salvar'}</Text>
      </TouchableOpacity>

      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  progressionBar: {
    height: 12,
    backgroundColor: '#4C1C74'
  },
  label: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    minWidth: 80, // largura mínima para o texto
    marginRight: 8, // espaço entre o texto e o Picker
    textAlignVertical: 'center',
  },
  picker: {
    flex: 1,
    backgroundColor: 'transparent', // para herdar o fundo da view
    marginLeft: 0,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
  },

  title: {
    width: '100%',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 15,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#F39C6B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10
  },
  buttonText: {
    color: '#000',
    fontSize: 16
  },
  image: {
    width: 40,
    height: 40,
  },

showCard: {
    alignItems: 'center',
    marginTop: 25,
  },
  cardContainer: {
    width: width - 100,
    height: height / 3,
  },
  campoDeTexto: {
    width: '100%',
  },
  front: {
    backgroundColor: '#AD94DB',
    backfaceVisibility: 'hidden',
  },
  back: {
    backgroundColor: '#96D289',
    backfaceVisibility: 'hidden',
  },
  card: {
    width: width - 100,
    height: height / 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    position: 'absolute',
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
  FrenteVersoView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonview: {
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 25,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonVerso: {
    backgroundColor: '#96D289', // cor para Verso
  },
  buttonFrente: {
    backgroundColor: '#AD94DB', // cor para Frente
  },

});