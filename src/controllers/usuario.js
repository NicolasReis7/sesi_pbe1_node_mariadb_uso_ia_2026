
const conexao = require('../db');

exports.cadastrar = (req, res) => {
    const { nome, email, senha } = req.body;

    const sql = 'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)';

    conexao.query(sql, [nome, email, senha], (erro, resultado) => {
        if (erro) {
            console.log(erro);
            return res.status(500).json({ erro: erro.message });
        }

        res.status(201).json({
            mensagem: 'Usuário cadastrado com sucesso!',
            id: resultado.insertId
        });
    });
};

exports.listar = (req, res) => {
    const sql = 'SELECT * FROM usuario';

    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        res.status(200).json(resultado);
    });
};

exports.alterar = (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    const sql = 'SELECT id, nome, email FROM usuario WHERE email = ? AND senha = PASSWORD(?)';

    conexao.query(sql, [nome, email, senha, id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }

        res.status(200).json({ mensagem: 'Usuario alterado com sucesso!'});
    });
}

exports.excluir = (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM usuario WHERE id = ?';

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado!' });
        }

        res.status(200).json({ mensagem: 'Usuário excluído com sucesso!' });
    });
};

exports.login = (req, res) => {
    const { email, senha } = req.body;

    const sql = 'SELECT id, nome, email FROM usuario WHERE email = ? AND senha = PASSWORD(?)';

    conexao.query(sql, [email, senha], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        if (resultado.length === 0) {
            return res.status(401).json({ mensagem: 'Email ou senha incorretos!' });
        }

        res.status(200).json({
            mensagem: 'Login realizado com sucesso!',
            usuario: resultado[0]
        });
    });
};
