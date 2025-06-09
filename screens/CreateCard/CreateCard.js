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
        onPress1={() => navigation.navigate('Home')}
        style1={styles.image}
        image2={require('../../assets/confirmIcon.png')}
        onPress2={() => navigation.navigate('Home')}
        style2={styles.image}
      />
      
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Baralho</Text>
        <Picker
          selectedValue={baralho}
          onValueChange={(itemValue) => setBaralho(itemValue)}
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
  style={styles.button}
  onPress={async () => {

if (!pergunta || !resposta) {
  Alert.alert('Erro', 'Preencha a pergunta e a resposta!');
  return;
}
  try {
    console.log('Antes do fetch');
    const response = await fetch('http://localhost:3001/cards/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pergunta, resposta, dificuldade: true })
    });
    const respText = await response.text();

    if (response.ok) {
      Alert.alert('Sucesso', 'Card criado com sucesso!');
      setPergunta('');
      setResposta('');
    } else {
      Alert.alert('Erro', 'Não foi possível criar o card.');
    }
  } catch (err) {
    console.log('Erro:', err);
    Alert.alert('Erro', 'Erro ao conectar com o servidor.');
  }
}}
>
  <Text style={styles.buttonText}>Salvar</Text>
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