import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function BaralhoCard({ baralho, index, onPressCard, onDelete, styles, textColor }) {
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
          onDelete(baralho.id);
        }}
      >
        <Text style={{ fontSize: 18 }}>🗑️</Text>
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
