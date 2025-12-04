import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
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
        image2={require('../../assets/confirmIcon.png')}
        onPress2={() => navigation.goBack()}
        style2={styles.image}
      />

      <View style={styles.cardContainer}>
        <Text style={styles.title}>FRENTE</Text>
        <CardInput
          title={"Frente"}
          value={pergunta}
          onChangeText={setPergunta}
          placeholder="Digite a pergunta aqui..."
          corDeFundo={"#AD94DB"}
        />
        <Text style={styles.title}>VERSO</Text>
        <CardInput
          title={"Verso"}
          value={resposta}
          onChangeText={setResposta}
          placeholder="Digite a resposta aqui..."
          corDeFundo={"#96D289"}
        />
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
            Alert.alert('Erro', 'Baralho não especificado!');
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  progressionBar: {
    height: 12,
    backgroundColor: '#4C1C74'
  },
  pickerContainer: {
    marginTop: 20,
    marginHorizontal: 20,

  },
  label: {
    fontSize: 16,
    marginBottom: 5
  },
  picker: {
    height: 50,
    backgroundColor: '#fff'
  },

  title: {
    width: '100%',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 15,
  },
  button: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#F39C6B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8
  },
  buttonText: {
    color: '#000',
    fontSize: 16
  },
  image: {
    width: 40,
    height: 40,
  },
});