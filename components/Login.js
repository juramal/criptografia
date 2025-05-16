import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Appbar, Text, TextInput, Button, Snackbar } from 'react-native-paper';

export default function Login({ navigation }) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleLogin = () => {
  if (login && senha) {
    setSnackbarMessage(`Bem-vindo, ${login}!`);
    setSnackbarVisible(true);
    setTimeout(() => {
      navigation.navigate('Criptografar'); // redireciona para a tela Criptografar
    }, 1000); // espera 1 segundo para o usuário ver o snackbar
  } else {
    setSnackbarMessage('Preencha o login e a senha.');
    setSnackbarVisible(true);
  }
};

  return (
    <View style={{ flex: 1 }}>
      

      <View style={styles.container}>
        <Image source={require('../assets/login.png')} style={{ width: 210, height: 200, alignSelf: 'center', marginBottom: 10 }} />
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
        <Button mode="contained" onPress={handleLogin}>
          Entrar
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
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#f6f6f6',
  },
  input: {
    marginBottom: 16,
  },
  textLabel: {
    fontSize: 30  
  }
});
