const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');
const conexao = require('./src/db');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', routes);

const porta = 3000;

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});