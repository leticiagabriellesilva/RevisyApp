import React, { useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View, Alert, TouchableOpacity } from 'react-native';
import TopBar from '../../components/TopBar/TopBar';
import IconTextButton from '../../components/IconTextButton/IconTextButton';
import ButtonImage from '../../components/ButtonImage/ButtonImage';
import Ionicons from '@expo/vector-icons/Ionicons';


//Tem que passar o baralho para entrar nessa tela.
export default function App(pack) {
  const [baralho, setBaralho] = useState('Redes');
  const [pergunta, setPergunta] = useState('');
  const [resposta, setResposta] = useState('');

  const [isFlipped, setIsFlipped] = useState(false); // state of card
  const flipAnimation = useRef(new Animated.Value(0)).current // animated value for flip animation

  // front card rotation
  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const flipToFrontStyle = {
    transform: [{rotateY: frontInterpolate}]
  };

  // back card rotation
  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const flipToBackStyle = {
    transform: [{rotateY: backInterpolate}]
  };

  // card flip animation
  const flipCard = () => {
    if(isFlipped) {
      // animate back to the front side
      Animated.spring(flipAnimation, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      // animate to the back side
      Animated.spring(flipAnimation, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
    setIsFlipped(!isFlipped);
  };

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
                        <Text style={styles.text}>Pergunta</Text>
                    </Animated.View>

                    {/*RESPOSTA*/}
                    <Animated.View style={[styles.back, styles.card, flipToBackStyle]}>
                        <Text style={styles.text}>Resposta</Text>
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
                    <TouchableOpacity style={styles.answerButton}>
                        <Text style={styles.answerTexts} >Difícil</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.answerButton}>
                        <Text style={styles.answerTexts}>Fácil</Text>
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
        backgroundColor: '#F2F2F2',
    },
  image:{
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
    fontSize: 22
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
    justifyContent: 'center'
  },
  answerButton:{
    width: 100,
    height: 70,
    alignItems: 'center',
    borderRadius: 15,
    marginHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: '#F39C6B'
  },
  answerTexts:{
    fontSize: 18
  }

});