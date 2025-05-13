import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Text, TextInput, Button, Snackbar } from 'react-native-paper';

export default function Criptografar({ navigation }) {
  const [mensagem, setMensagem] = useState('');
  const [passo, setPasso] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleCriptografar = () => {
    if (mensagem && passo) {
      setSnackbarMessage(`Mensagem Criptografada, ${mensagem}!`);
    } else {
      setSnackbarMessage('Preencha a Mensagem e o Passo.');
    }
    setSnackbarVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>
      

      <View style={styles.container}>
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
          secureTextEntry
          value={passo}
          onChangeText={setPasso}
          style={styles.input}
        />
        <Button mode="contained" onPress={handleCriptografar}>
          Criptografar
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
    justifyContent: 'center',
    backgroundColor: '#f6f6f6',
  },
  input: {
    marginBottom: 16,
  },
  textLabel: {
    fontSize: 30  
  }
});
