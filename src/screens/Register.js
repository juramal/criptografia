import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView, Platform,
  ScrollView,
} from "react-native";
import {
  Text,
  TextInput,
  Button,
  Snackbar,
  Button as PaperButton,
} from "react-native-paper";
import { registerUser } from "../service/authService";

export default function Registro({ navigation }) {
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleRegistro = () => {
    if (!usuario || !email || !senha || !confirmarSenha) {
      setSnackbarMessage("Preencha todos os campos.");
      setSnackbarVisible(true);
      return;
    }
    if (senha !== confirmarSenha) {
      setSnackbarMessage("As senhas não coincidem.");
      setSnackbarVisible(true);
      return;
    }
    registerUser(usuario, email, senha)
      .then(() => {
        setSnackbarMessage("Registro realizado com sucesso!");
        setSnackbarVisible(true);
        setTimeout(() => {
          navigation.navigate("Login");
        }, 1000);
      })
      .catch((error) => {
        setSnackbarMessage(error.message || "Erro ao registrar.");
        setSnackbarVisible(true);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Image
            source={require("../../assets/login.png")}
            style={{
              width: 210,
              height: 200,
              alignSelf: "center",
              marginBottom: 10,
            }}
          />
          <Text style={styles.textLabel}>Registro</Text>
          <TextInput
            label="Usuário"
            mode="outlined"
            value={usuario}
            onChangeText={setUsuario}
            style={styles.input}
          />
          <TextInput
            label="Email"
            mode="outlined"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            label="Senha"
            mode="outlined"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
            style={styles.input}
          />
          <TextInput
            label="Confirmar Senha"
            mode="outlined"
            secureTextEntry
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={handleRegistro}
            style={styles.Button}
          >
            Registrar
          </Button>
          <PaperButton
            mode="outlined"
            onPress={() => navigation.navigate("Login")}
            style={{
              marginTop: 20,
              backgroundColor: "#a9ea9e",
              width: "50%",
              alignSelf: "center",
            }}
          >
            Voltar para Login
          </PaperButton>
          <Snackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            duration={3000}
          >
            {snackbarMessage}
          </Snackbar>
        </View>
      
      </ScrollView>
    </KeyboardAvoidingView>
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
  Button: {
    width: "50%",
    alignSelf: "center",
    marginTop: 20,
  },
});
