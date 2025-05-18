import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Appbar, Text, TextInput, Button, Snackbar } from "react-native-paper";
import { descriptografarMensagem } from "../service/cryptoService";

export default function Decriptar({ navigation }) {
  const [mensagem, setMensagem] = useState("");
  const [hash, setHash] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleDecriptar = () => {
    Keyboard.dismiss();
    if (mensagem && hash) {
      descriptografarMensagem(mensagem, hash)
        .then((response) => {
          setMensagem(response.decrypted || "");
          setHash(response.hash || "");
          setSnackbarMessage(`Mensagem Decriptada}`);
        })
        .catch((error) => {
          setSnackbarMessage(error.message || "Erro ao decriptar mensagem");
        });
    } else {
      setSnackbarMessage("Preencha a Mensagem e o Passo.");
    }
    setSnackbarVisible(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image
            source={require("../../assets/decriptada.png")}
            style={{
              width: 210,
              height: 200,
              alignSelf: "center",
              marginBottom: 10,
            }}
          />
          <Text style={styles.textLabel}>Decriptar</Text>
          <TextInput
            label="Mensagem à Decriptar"
            mode="outlined"
            value={mensagem}
            onChangeText={setMensagem}
            style={styles.input}
          />
          <TextInput
            label="hash"
            mode="outlined"
            keyboardType="numeric"
            value={hash}
            onChangeText={setHash}
            style={styles.input}
            multiline={false}
          />
          <Button mode="contained" onPress={handleDecriptar}>
            Decriptar
          </Button>
          <Snackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            duration={3000}
          >
            {snackbarMessage}
          </Snackbar>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#f6f6f6",
    marginTop: 60,
  },
  input: {
    marginBottom: 16,
  },
  textLabel: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 24,
    marginTop: 20,
    alignSelf: "center",
  },
});
