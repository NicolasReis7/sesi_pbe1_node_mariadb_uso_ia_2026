const express = require('express');
const router = express.Router();

const usuario = require('./controllers/usuario');
const usoia = require('./controllers/usoia');

router.get('/', (req, res) => {
    res.send('API Usos IA funcionando!');
});

router.post('/usuarios', usuario.cadastrar);
router.get('/usuarios', usuario.listar);
router.put('/usuarios/:id', usuario.alterar);
router.delete('/usuarios/:id', usuario.excluir);
router.post('/login', usuario.login);
router.post('/usoia', usoia.cadastrar);
router.get('/usoia', usoia.listar);
router.put('/usoia/:id', usoia.alterar);
router.delete('/usoia/:id', usoia.excluir);

module.exports = router;