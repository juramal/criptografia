# 🔐 Projeto de Criptografia com Cifra de César

Repositório da api (back-end): [https://github.com/leonfagundes/encryption-api](https://github.com/leonfagundes/encryption-api)

O projeto tem como objetivo implementar a criptografia e decriptação de mensagens utilizando a **Cifra de César**, com interface interativa e persistência de dados em banco. O sistema é composto por uma **API em Node.js/TypeScript com Express** e um **frontend mobile desenvolvido em React Native com Expo**.

---

## 🚀 Funcionalidades

- ✅ Cadastro e login de usuários com autenticação JWT.
- ✅ Criptografia de mensagens com passo definido pelo usuário.
- ✅ Geração de hash único para cada mensagem criptografada (utilizável apenas uma vez).
- ✅ Armazenamento de mensagens e hashes no banco de dados.
- ✅ Decriptação de mensagens utilizando hash e validação de uso único.
- ✅ **Envio da mensagem criptografada para o WhatsApp**, incluindo a mensagem cifrada e o hash.  
  🔄 O receptor pode colar a mensagem recebida no app, e com um clique, os campos de decriptação são automaticamente preenchidos.

---

## 🧠 Arquitetura do Projeto

<img src="https://github.com/leonfagundes27/Assets/blob/main/Images/arc-app.png" width="600"/>

---

📌 **Importante**: Tanto a API quanto o banco de dados estão configurados **localmente**. Para funcionamento adequado:

1. Configure o seu ambiente local com um banco MySQL.
2. Altere o arquivo `.env-exemplo` para `.env` com as seguintes variáveis :
   ```
   DATABASE_URL="mysql://usuario:senha@localhost:3306/nomedobanco"
   JWT_SECRET="sua_chave_secreta"
   PORT=porta_da_api
   ```

---

## 🖼️ Telas do Aplicativo

- **Tela de Registro**
  <details>
    <summary>Exibir Tela de Registro</summary>
    <img src="https://github.com/leonfagundes27/Assets/blob/main/Images/APP-REGISTER.jpeg" width="220"/>
  </details>
  
- **Tela de Login**
  <details>
    <summary>Exibir Tela de Login</summary>
    <img src="https://github.com/leonfagundes27/Assets/blob/main/Images/APP-LOGIN.jpeg" width="220"/>
  </details>

- **Tela de Criptografia**
  <details>
    <summary>Exibir Tela de Criptografia</summary>
    <img src="https://github.com/leonfagundes27/Assets/blob/main/Images/APP-ECRPT.jpeg" width="220"/>
  </details>

- **Tela de Decriptação**
  <details>
    <summary>Exibir Tela de Decriptação</summary>
    <img src="https://github.com/leonfagundes27/Assets/blob/main/Images/APP-DECRYPT.jpeg" width="220"/>
  </details>

---

## ⚙️ Tecnologias Utilizadas

### Backend
- <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/node_js.png" width="20"/> **Node.js**
- <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/express.png" width="20"/> **Express**
- <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/typescript.png" width="20"/> **TypeScript**
- <img src="https://github.com/tandpfun/skill-icons/blob/main/icons/Prisma.svg" width="20"/> **Prisma ORM**
- <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/mysql.png" width="20"/> **MySQL**
- <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" width="20"/> **JWT**
- <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/swagger.png" width="20"/> **Swagger**

### Frontend (Mobile)
- <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/react.png" width="20"/> **React Native**
- <img src="https://images.icon-icons.com/2389/PNG/512/expo_logo_icon_145293.png" width="20"/> **Expo**
- <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/javascript.png" width="20"/> **JavaScript**
- <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/react.png" width="20"/> **React Native Paper**

---

## 📚 Requisitos Atendidos

Conforme definido no escopo do projeto, foram implementadas as seguintes funcionalidades:

- Interface com **quatro telas principais**: **Registrar**, **Login**, **Criptografar** e **Decriptografar**.
- Hash criptográfico com uso único, armazenado e validado em banco.
- Integração com WhatsApp que facilita o preenchimento da decriptação.
- Persistência segura com MySQL e Prisma ORM.

---

## 📌 Observações Finais

- O sistema está operando com **API e banco de dados locais**, exigindo configuração manual do ambiente e `.env`.
- A exportação via WhatsApp está funcional com automação parcial e pode ser expandida futuramente.
- Cada hash gerado é único e só pode ser utilizado uma única vez, reforçando a segurança da decriptação.
