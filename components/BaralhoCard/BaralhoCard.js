import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function BaralhoCard({ baralho, index, onPressCard, onOpenMenu, styles, textColor }) {
  return (
    <TouchableOpacity
      key={baralho.id ?? index}
      style={[
        styles.card,
        { backgroundColor: baralho.hasCardsToReview ? '#AD94DB' : '#96D289' }
      ]}
      onPress={() => onPressCard(baralho)}
    >
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={(e) => {
          e.stopPropagation();
          onOpenMenu(baralho.id);
        }}
      >
        <MaterialCommunityIcons name="dots-vertical" size={24} color={textColor} />
      </TouchableOpacity>

      <View style={styles.baralhoInfo}>
        <Text style={[styles.cardText, { color: textColor }]}>
          {baralho.nome}
        </Text>
        <Text style={[styles.baralhoSubtext, { color: textColor }]}>
          {baralho.cardsCount} cards | {baralho.cardsToReviewCount} para revisar
        </Text>
      </View>
    </TouchableOpacity>
  );
}
