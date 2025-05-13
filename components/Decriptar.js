import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Appbar, Text, TextInput, Button, Snackbar } from 'react-native-paper';

export default function Decriptar({ navigation }) {
  const [mensagem, setMensagem] = useState('');
  const [passo, setPasso] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleDecriptar = () => {
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
        <Image source={require('../assets/decriptada.png')} style={{ width: 210, height: 200, alignSelf: 'center', marginBottom: 10 }} />
        <Text style={styles.textLabel}>Decriptar</Text>
        <TextInput
          label="Mensagem à Decriptar"
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
