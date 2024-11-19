const express = require('express')
const fs = require('fs')
const router = express.Router();
const path = require('path');

const animalsFilePath = path.join(__dirname, '../data/animals.json');

const readAnimalsFromFile =() => {
    const data = fs.readFileSync (animalsFilePath, 'utf-8')
    return JSON.parse(data)
}

const saveAnimalsToFile = (animals) => {
    fs.writeFileSync(animalsFilePath, JSON.stringify(animals, null, 2), 'utf-8')
}
router.get('/', (req, res) => {
    console.log('Recebendo requisição para /api/animals');
    const animals = readAnimalsFromFile();
    res.json(animals);
});

router.post('/add', (req, res) => {
    const { name, type, age, gender } = req.body;
  
    if (!name || !type || !age || !gender) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios: name, type, age, gender!' });
    }
  
    const animals = readAnimalsFromFile();
  
    const newAnimal = {
      id: animals.length + 1, 
      name,
      type,
      age,
      gender,
      adopted: false, 
    };
  
    animals.push(newAnimal); 
    saveAnimalsToFile(animals); 
  
    res.status(201).json({ message: 'Animal adicionado com sucesso!', animal: newAnimal });
  });

router.post('/adopt/:id', (req, res) => {
    const { id } = req.params;
    const animals = readAnimalsFromFile();
  
    // Busca o animal pelo ID
    const animal = animals.find((a) => a.id === parseInt(id));
    if (!animal) {
      return res.status(404).json({ message: 'Animal não encontrado!' });
    }
  
    // Verifica se o animal já foi adotado
    if (animal.adopted) {
      return res.status(400).json({ message: 'Esse animal já foi adotado.' });
    }
  
    animal.adopted = true; // Marca como adotado
    saveAnimalsToFile(animals); // Salva no arquivo JSON
  
    res.json({ message: 'Animal adotado com sucesso!', animal });
  });



module.exports = router
