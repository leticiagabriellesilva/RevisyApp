import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import TopBar from '../../components/TopBar/TopBar';

export default function CreateBaralhoScreen({ route, navigation }) {
  const [baralhoName, setBaralhoName] = useState('');
  const { onBaralhoCreated } = route.params || {};

  const handleCreateBaralho = async () => {
    if (!baralhoName.trim()) {
      Alert.alert('Erro', 'Por favor, informe o nome do baralho!');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/baralhos/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: baralhoName })
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Baralho criado com sucesso!');
        if (onBaralhoCreated) {
          onBaralhoCreated();
        }
        navigation.goBack();
      } else {
        const errorData = await response.json();
        Alert.alert('Erro', errorData.error || 'Não foi possível criar o baralho.');
      }
    } catch (err) {
      console.log('Erro:', err);
      Alert.alert('Erro', 'Erro ao conectar com o servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <TopBar
        image1={require('../../assets/backIcon.png')}
        onPress1={() => navigation.goBack()}
        style1={styles.icon}
        image2={require('../../assets/confirmIcon.png')}
        onPress2={handleCreateBaralho}
        style2={styles.icon}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Criar Novo Baralho</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome do Baralho</Text>
          <TextInput
            style={styles.input}
            value={baralhoName}
            onChangeText={setBaralhoName}
            placeholder="Digite o nome do baralho..."
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleCreateBaralho}
        >
          <Text style={styles.buttonText}>Criar Baralho</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#122021',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#122021',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#96D289',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#122021',
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    width: 40,
    height: 40,
  },
});
