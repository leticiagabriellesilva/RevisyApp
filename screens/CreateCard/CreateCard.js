import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import TopBar from '../../components/TopBar/TopBar';
import CardInput from '../../components/CardInput/CardInput';

export default function App() {
  const [baralho, setBaralho] = useState('Redes');
  const [pergunta, setPergunta] = useState('');
  const [resposta, setResposta] = useState('');


  return (
    <View style={styles.container}>
      <TopBar
        image1={require('../../assets/backIcon.png')}
        onPress1={() => Alert.alert('Ainda nada', 'Aqui vai voltar para a tela anterior')}
        style1={styles.image}
        image2={require('../../assets/confirmIcon.png')}
        onPress2={() => Alert.alert('Ainda nada', 'Aqui vai salvar e resetar os cards')}
        style2={styles.image}
      />
      
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Baralho</Text>
        <Picker
          selectedValue={baralho}
          onValueChange={(setBaralho) => setBaralho(setBaralho)}
          style={styles.picker}
        >
          <Picker.Item label="Redes" value="Redes" />
          <Picker.Item label="Algoritmos" value="Algoritmos" />
          <Picker.Item label="Banco de Dados" value="Banco de Dados" />
        </Picker>
      </View>
      
      <View style={styles.cardContainer}>
        <Text style={styles.title}>FRENTE</Text>
      <CardInput
          title={"Frente"}
          value={pergunta}
          onChangeText={setPergunta}
          placeholder="Digite a pergunta aqui..."
        />
        <Text style={styles.title}>VERSO</Text>
        <CardInput
          title={"Verso"}
          value={resposta}
          onChangeText={setResposta}
          placeholder="Digite a resposta aqui..."
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Ainda nada', 'Aqui vai salvar e resetar os cards')}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
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
    margin: (10, 0, 10,0)
  },
  button: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  },
  image: {
    width: 40,
    height: 40,
  },
});