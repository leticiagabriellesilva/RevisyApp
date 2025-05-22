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

      <View>
        <CardInput
          title={"Frente"}
          value={pergunta}
          onChangeText={setPergunta}
          placeholder="Digite a pergunta aqui..."
        />
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
    backgroundColor: '#fafafa'
  },
  pickerContainer: {
    marginTop: 20,
    marginHorizontal: 20
  },
  label: {
    fontSize: 16,
    marginBottom: 5
  },
  picker: {
    height: 50,
    backgroundColor: '#fff'
  },
  cardContainer: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardInputContainer: {
    marginVertical: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  input: {
    width: '90%',
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top'
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
    width: 30,
    height: 30,
  }
});