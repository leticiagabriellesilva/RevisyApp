import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import TopBar from "../../components/TopBar/TopBar";
import CardInput from "../../components/CardInput/CardInput";

export default function EditCard({ navigation, route }) {
  const cardData = route.params?.cardData;

  const [baralho, setBaralho] = useState(cardData.baralho);
  const [pergunta, setPergunta] = useState(cardData.pergunta);
  const [resposta, setResposta] = useState(cardData.resposta);
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [buttonText, setButtonText] = useState("VERSO");
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  const handleSave = async () => {
    if (!pergunta || !resposta) {
      Alert.alert("Erro", "Preencha a pergunta e a resposta!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/cards/${cardData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pergunta: pergunta,
            resposta: resposta,
            baralho: baralho,
            dificuldade: cardData.dificuldade,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Falha na resposta do servidor");
      }

      const updatedCard = await response.json();

      Alert.alert("Sucesso", "Card atualizado com sucesso!", [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("Home", { shouldRefresh: true });
          },
        },
      ]);
    } catch (err) {
      console.error("Erro:", err);
      Alert.alert("Erro", "Erro ao conectar com o servidor: " + err.message);
    }
  };

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const flipToFrontStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const flipToBackStyle = {
    transform: [{ rotateY: backInterpolate }],
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
    if (isFlipped) {
      setButtonText("VERSO");
    } else {
      setButtonText("FRENTE");
    }
    setIsFlipped(!isFlipped);
  };

  const { width, height } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      <TopBar
        image1={require("../../assets/backIcon.png")}
        onPress1={() => navigation.goBack()}
        style1={styles.image}
        image2={require("../../assets/confirmIcon.png")}
        onPress2={() => {
          handleSave();
          navigation.goBack();
        }}
        style2={styles.image}
      />
      <View
        style={[
          styles.pickerRow,
          buttonText === "VERSO"
            ? styles.pickerRowVerso
            : styles.pickerRowFrente,
        ]}
      >
        <Text style={styles.label}>Baralho:</Text>
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

      <View style={styles.content}>
        <View style={styles.showCard}>
          <View style={styles.cardContainer}>
            {/* PERGUNTA */}
            <Animated.View
              style={[styles.front, styles.card, flipToFrontStyle]}
            >
              <CardInput
                title={"Frente"}
                value={pergunta}
                onChangeText={setPergunta}
                placeholder="Digite a pergunta aqui..."
                corDeFundo={"#AD94DB"}
                style={styles.campoDeTexto}
              />
            </Animated.View>

            {/* RESPOSTA */}
            <Animated.View style={[styles.back, styles.card, flipToBackStyle]}>
              <CardInput
                title={"Verso"}
                value={resposta}
                onChangeText={setResposta}
                placeholder="Digite a resposta aqui..."
                corDeFundo={"#96D289"}
                style={styles.campoDeTexto}
              />
            </Animated.View>
          </View>
        </View>

        <View style={styles.FrenteVersoView}>
          <TouchableWithoutFeedback onPress={flipCard}>
            <View
              style={[
                styles.buttonview,
                buttonText === "VERSO"
                  ? styles.buttonVerso
                  : styles.buttonFrente,
              ]}
            >
              <Text style={styles.buttonText}>{buttonText}</Text>
              <Image
                source={require("../../assets/verse.png")}
                style={{ width: 20, height: 20, marginLeft: 5 }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  progressionBar: {
    height: 12,
    backgroundColor: "#4C1C74",
  },
  pickerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 20,
  },
  pickerRowVerso: {
    backgroundColor: "#AD94DB", // Verde
  },
  pickerRowFrente: {
    backgroundColor: "#96D289", // Lilás
  },
  label: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
    minWidth: 80, // largura mínima para o texto
    marginRight: 8, // espaço entre o texto e o Picker
    textAlignVertical: "center",
  },
  picker: {
    flex: 1,
    backgroundColor: "transparent", // para herdar o fundo da view
    marginLeft: 0,
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
  },

  title: {
    width: "100%",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 15,
  },
  button: {
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: "#F39C6B",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
  },
  image: {
    width: 40,
    height: 40,
  },

  showCard: {
    alignItems: "center",
    marginTop: 25,
  },
  cardContainer: {
    width: width - 100,
    height: height / 3,
  },
  campoDeTexto: {
    width: "100%",
  },
  front: {
    backgroundColor: "#AD94DB",
  },
  back: {
    backgroundColor: "#96D289",
  },
  card: {
    width: width - 100,
    height: height / 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    position: "absolute",
    backfaceVisibility: "hidden",
  },
  text: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  answer: {
    alignItems: "center",
    width: "100%",
  },
  FrenteVersoView: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonview: {
    width: 150,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 25,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonVerso: {
    backgroundColor: "#96D289", // cor para Verso
  },
  buttonFrente: {
    backgroundColor: "#AD94DB", // cor para Frente
  },
});
