import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Animated, Dimensions, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import CardInput from '../CardInput/CardInput';

const CardComponent = forwardRef(({ pergunta, resposta }, ref) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const flipToFrontStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const flipToBackStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  const resetFlip = () => {
    if (isFlipped) {
      Animated.spring(flipAnimation, {
        toValue: 0,
        friction: 6,
        tension: 50,
        useNativeDriver: true,
      }).start();
      setIsFlipped(false);
    }
  };

  const flipCard = () => {
    if (isFlipped) {
      Animated.spring(flipAnimation, {
        toValue: 0,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(flipAnimation, {
        toValue: 180,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }).start();
    }
    setIsFlipped(!isFlipped);
  };

  // Reseta o flip quando a pergunta mudar
  useEffect(() => {
    resetFlip();
  }, [pergunta]);

  // Expõe o método resetFlip para o componente pai
  useImperativeHandle(ref, () => ({
    resetFlip,
  }));

  return (
    <View style={styles.showCard}>
      <TouchableWithoutFeedback onPress={flipCard}>
        <View style={styles.cardContainer}>
          {/* PERGUNTA (FRENTE) */}
          <Animated.View style={[styles.front, styles.card, flipToFrontStyle]}>
            <CardInput
              value={pergunta || ''}
              placeholder="Sem pergunta"
              corDeFundo={"#AD94DB"}
              style={styles.campoDeTexto}
              editable={false}
            />
          </Animated.View>

          {/* RESPOSTA (VERSO) */}
          <Animated.View style={[styles.back, styles.card, flipToBackStyle]}>
            <CardInput
              value={resposta || ''}
              placeholder="Sem resposta"
              corDeFundo={"#96D289"}
              style={styles.campoDeTexto}
              editable={false}
            />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
});

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  showCard: {
    alignItems: 'center',
    marginTop: 25,
  },
  cardContainer: {
    width: width - 50,
    height: height / 3,
  },
  front: {
    backfaceVisibility: 'hidden',
  },
  back: {
    backfaceVisibility: 'hidden',
  },
  card: {
    width: width - 50,
    height: height / 3,
    borderRadius: 10,
    position: 'absolute',
  },
  campoDeTexto: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
  },
});

export default CardComponent;