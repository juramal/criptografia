import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Text, TextInput, Button, Snackbar } from "react-native-paper";
import { descriptografarMensagem, verificarHashUsada } from "../service/cryptoService";
import * as Clipboard from 'expo-clipboard';

export default function Decriptar({ navigation }) {
  const [hashUsado, setHashUsado] = useState(false);  
  const [mensagem, setMensagem] = useState("");
  const [hash, setHash] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handlePaste = async () => {
    const text = await Clipboard.getStringAsync();
    const cleanText = text.replace(/\r/g, '').replace(/\u200E/g, '').replace(/\u202F/g, '').trim();

    const messageMatch = cleanText.match(/\*?Mensagem:\*?\s*(.+)/i);
    const hashMatch = cleanText.match(/\*?Hash:\*?\s*([a-f0-9\-]+)/i);

    if (messageMatch && hashMatch) {
      const mensagemExtraida = messageMatch[1].trim();
      const hashExtraido = hashMatch[1].trim();

      setMensagem(mensagemExtraida);
      setHash(hashExtraido);

      try {
        const usado = await verificarHashUsada(hashExtraido);
        if (usado) {
          setHashUsado(true);
          setSnackbarMessage("Este hash já foi utilizado.");
        } else {
          setHashUsado(false);
          setSnackbarMessage("Mensagem e Hash colados com sucesso.");
        }
      } catch (error) {
        setHashUsado(false);
        console.log(hashExtraido);
        console.log(error);
        setSnackbarMessage("Erro ao verificar o hash.");
      }
    } else {
      setSnackbarMessage("Formato inválido. Copie a mensagem completa no formato correto.");
    }

    setSnackbarVisible(true);
  };

  const handleDecriptar = async () => {
    Keyboard.dismiss();

    const hashLimpo = hash.trim().replace(/\u200E/g, '').replace(/\u202F/g, '');
    if (!mensagem || !hashLimpo) {
      setSnackbarMessage("Preencha a Mensagem e o Hash.");
      setSnackbarVisible(true);
      return;
    }

    try {
      const usado = await verificarHashUsada(hashLimpo);
      if (usado) {
        setHashUsado(true);
        setSnackbarMessage("Hash já utilizado. Não é possível decriptar.");
        setSnackbarVisible(true);
        return;
      } else {
        setHashUsado(false);
      }

      const response = await descriptografarMensagem(mensagem, hashLimpo);
      setMensagem(response.decrypted || "");
      setHash(response.hash || "");
      setSnackbarMessage("Mensagem decriptada com sucesso.");
    } catch (error) {
      setSnackbarMessage(error.message || "Erro ao decriptar mensagem.");
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
          <Button 
            mode="outlined" 
            style={{ marginBottom: 10 }} 
            onPress={handlePaste}
          >
            Colar Mensagem do Whatsapp
          </Button>
          <TextInput
            label="Mensagem à Decriptar"
            mode="outlined"
            value={mensagem}
            onChangeText={setMensagem}
            style={styles.input}
          />
          <TextInput
            label="Hash"
            mode="outlined"
            keyboardType="numeric"
            value={hash}
            onChangeText={setHash}
            style={[
              styles.input,
              hashUsado && { borderColor: 'red', borderWidth: 2 }
            ]}
            multiline={false}
            error={hashUsado}
          />
          <Button 
            mode="contained" 
            onPress={handleDecriptar}
            disabled={hashUsado}
          >
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
