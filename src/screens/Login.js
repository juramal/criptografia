import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Text, TextInput, Button, Snackbar } from "react-native-paper";
import { loginUser } from "../service/authService";

export default function Login({ navigation, onLoginSuccess }) {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleLogin = async () => {
    if (login && senha) {
      try {
        const usuario = await loginUser(login, senha);
        setSnackbarMessage(`Bem-vindo, ${usuario.username}!`);
        setSnackbarVisible(true);
        setTimeout(() => {
          if (onLoginSuccess) {
            onLoginSuccess(usuario.token); // Passe o token para o App
          }
        }, 1000);
      } catch (error) {
        setSnackbarMessage(error.message || "Erro ao fazer login.");
        setSnackbarVisible(true);
      }
    } else {
      setSnackbarMessage("Preencha o login e a senha.");
      setSnackbarVisible(true);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
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
          <Text style={styles.textLabel}>Login</Text>
          <TextInput
            label="Usuário"
            mode="outlined"
            value={login}
            onChangeText={setLogin}
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
          <Button
            mode="contained"
            onPress={handleLogin}
            style={{ width: "50%", alignSelf: "center", marginTop: 20 }}
          >
            Entrar
          </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate("Registrar")}
            style={styles.button}
          >
            Registrar
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
    padding: 40,
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#f6f6f6",
    marginTop: 60,
  },
  input: {
    marginBottom: 16,
  },
  textLabel: {
    fontSize: 40,
    marginBottom: 24,
    marginTop: 20,
    alignSelf: "center",
    fontWeight: "bold",
    color: "#000",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#a9ea9e",
    width: "50%",
    alignSelf: "center",
  },
});
