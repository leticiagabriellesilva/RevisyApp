import React, { useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

export default function CardComponent({ pergunta, resposta }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;

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

  return (
    <View style={styles.showCard}>
      <TouchableWithoutFeedback onPress={flipCard}>
        <View style={styles.cardContainer}>
          {/* PERGUNTA */}
          <Animated.View style={[styles.front, styles.card, flipToFrontStyle]}>
            <Text style={styles.text}>{pergunta || 'Sem perguntas'}</Text>
          </Animated.View>

          {/* RESPOSTA */}
          <Animated.View style={[styles.back, styles.card, flipToBackStyle]}>
            <Text style={styles.text}>{resposta || 'Sem resposta'}</Text>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const { width, height } = Dimensions.get('screen');

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
});