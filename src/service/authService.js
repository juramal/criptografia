import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.1.124:3000/auth";

export async function registerUser(username, email, password) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao registrar");
  }
  return response.json();
}

export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Usuário ou senha inválidos");
  }
  const data = await response.json();
  if (data.token) {
    await AsyncStorage.setItem("userToken", data.token);
  }
  return data;
}
