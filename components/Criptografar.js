import React, { useState } from 'react';
import { View, StyleSheet, Linking, Image } from 'react-native';
import { Text, TextInput, Button, Snackbar } from 'react-native-paper';
import { encode as b64encode } from 'react-native-quick-base64';

export default function Criptografar({ navigation }) {
  const [mensagem, setMensagem] = useState('');
  const [passo, setPasso] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [mensagemCriptografada, setMensagemCriptografada] = useState('');

  const cifraDeCesar = (texto, deslocamento) => {
    return texto.split('').map(char => {
      const codigo = char.charCodeAt(0);
      if (codigo >= 65 && codigo <= 90) {
        return String.fromCharCode(((codigo - 65 + deslocamento) % 26) + 65);
      } else if (codigo >= 97 && codigo <= 122) {
        return String.fromCharCode(((codigo - 97 + deslocamento) % 26) + 97);
      }
      return char;
    }).join('');
  };

  const gerarHashBase64 = () => {
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numeros = '0123456789';

  let parteLetras = '';
  let parteNumeros = '';

  for (let i = 0; i < 6; i++) {
    parteLetras += letras.charAt(Math.floor(Math.random() * letras.length));
    parteNumeros += numeros.charAt(Math.floor(Math.random() * numeros.length));
  }

  // Junta e embaralha as letras e números
  const combinado = (parteLetras + parteNumeros).split('');
  const embaralhado = combinado.sort(() => Math.random() - 0.5).join('');

  return embaralhado;
};

  const handleCriptografar = () => {
    const deslocamento = parseInt(passo, 10);
    if (mensagem && !isNaN(deslocamento)) {
      const criptografada = cifraDeCesar(mensagem, deslocamento);
      setMensagemCriptografada(criptografada);
      setSnackbarMessage(`Criptografado: ${criptografada}`);
    } else {
      setSnackbarMessage('Preencha a Mensagem e o Passo corretamente.');
    }
    setSnackbarVisible(true);
  };

  const handleCompartilhar = () => {
    const hash = gerarHashBase64(mensagemCriptografada);
    const texto = `Mensagem Criptografada:\n*Mensagem:* ${mensagemCriptografada}\n*Hash:* ${hash}`;
    const url = `https://wa.me/?text=${encodeURIComponent(texto)}`;
    Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image source={require('../assets/criptografada.png')} style={{ width: 215, height: 200, alignSelf: 'center', marginBottom: 10 }} />
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
        <Button mode="contained" onPress={handleCriptografar}>
          Criptografar
        </Button>

        {mensagemCriptografada !== '' && (
          <Button
            mode="outlined"
            onPress={handleCompartilhar}
            style={{ marginTop: 20, backgroundColor: '#a9ea9e' }}
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
    fontSize: 30,
  },
});
