const express = require('express');
const bodyParser = require ('body-parser')
const cors =  require('cors')

const app = express ();
app.use(bodyParser.json());
app.use(cors());

const animalRoutes =require('./rotas/animals')
const userRoutes = require ('./rotas/users')

app.use('/api/animals', animalRoutes)
app.use('/api/users', userRoutes)

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Servidor rondando na porta ${PORT}`)
})