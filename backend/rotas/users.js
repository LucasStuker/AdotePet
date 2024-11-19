const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Caminho para o arquivo JSON
const usersFilePath = path.join(__dirname, '../data/users.json');

// Função para ler o usuário do JSON
const readUsersFromFile = () => {
  const data = fs.readFileSync(usersFilePath, 'utf-8');
  return JSON.parse(data);
};


router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = readUsersFromFile();
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas!' });
  }
  res.json({ message: 'Login realizado com sucesso!', user });
});

module.exports = router;