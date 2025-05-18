import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.1.12:3000/crypto";

export async function criptografarMensagem(mensagem, passo) {
  const token = await AsyncStorage.getItem("userToken");
  if (!token) throw new Error("Usuário não autenticado");

  const response = await fetch(`${API_URL}/encrypt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message: mensagem, shift: passo }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao criptografar mensagem");
  }

  return data;
}

export async function descriptografarMensagem(mensagem, hash) {
  const token = await AsyncStorage.getItem("userToken");
  if (!token) throw new Error("Usuário não autenticado");

  const response = await fetch(`${API_URL}/decrypt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ encrypted: mensagem, hash }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao descriptografar mensagem");
  }

  return data;
}
