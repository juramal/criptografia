import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Linking,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Text,
  TextInput,
  Button,
  Snackbar,
  IconButton,
} from "react-native-paper";
import { criptografarMensagem } from "../service/cryptoService";
import * as Clipboard from "expo-clipboard";

export default function Criptografar({ navigation }) {
  const [mensagem, setMensagem] = useState("");
  const [passo, setPasso] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [mensagemCriptografada, setMensagemCriptografada] = useState("");
  const [hashMensagem, setHashMensagem] = useState("");

  const handleCriptografar = async () => {
    if (mensagem && passo) {
      Keyboard.dismiss();
      try {
        const response = await criptografarMensagem(mensagem, passo);
        setMensagemCriptografada(response.encrypted || "");
        setHashMensagem(response.hash || "");
        setMensagem(response.encrypted || "");
        setSnackbarMessage(`Criptografado: ${response.encrypted || ""}`);
      } catch (error) {
        setSnackbarMessage(error.message || "Erro ao criptografar mensagem");
      }
    } else {
      setSnackbarMessage("Preencha a Mensagem e o Passo corretamente.");
    }
    setSnackbarVisible(true);
  };

  const handleCompartilhar = () => {
    const texto = `Mensagem Criptografada:\n*Mensagem:* ${mensagemCriptografada}\n*Hash:* ${hashMensagem}`;
    const url = `https://wa.me/?text=${encodeURIComponent(texto)}`;
    Linking.openURL(url);
  };

  const handleCopiarHash = async () => {
    await Clipboard.setStringAsync(hashMensagem);
    setSnackbarMessage("Hash copiado!");
    setSnackbarVisible(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image
            source={require("../../assets/criptografada.png")}
            style={{
              width: 215,
              height: 200,
              alignSelf: "center",
              marginBottom: 10,
            }}
          />
          <Text style={styles.textLabel}>Criptografar</Text>
          <TextInput
            label="Mensagem à Criptografar"
            mode="outlined"
            value={mensagem}
            onChangeText={setMensagem}
            style={styles.input}
          />
          <TextInput
            label="Passo"
            mode="outlined"
            keyboardType="numeric"
            value={passo}
            onChangeText={setPasso}
            style={styles.input}
          />
          {hashMensagem ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ flex: 1 }}>
                <TextInput
                  label="Hash da Mensagem"
                  mode="outlined"
                  value={hashMensagem}
                  style={[styles.input, { fontSize: 13 }]}
                  editable={false}
                  multiline={false}
                  selectTextOnFocus
                  scrollEnabled
                  right={null}
                />
              </View>
              <IconButton
                icon="content-copy"
                size={24}
                onPress={handleCopiarHash}
                accessibilityLabel="Copiar hash"
              />
            </View>
          ) : null}
          <Button mode="contained" onPress={handleCriptografar}>
            Criptografar
          </Button>
          {mensagemCriptografada !== "" && (
            <Button
              mode="outlined"
              onPress={handleCompartilhar}
              style={{ marginTop: 20, backgroundColor: "#a9ea9e" }}
            >
              Compartilhar no WhatsApp
            </Button>
          )}
          <Snackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            duration={9000}
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
    marginBottom: 24,
    marginTop: 20,
    alignSelf: "center",
    fontWeight: "bold",
    color: "#000",
  },
});
