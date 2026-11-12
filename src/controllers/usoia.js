
const conexao = require('../db');

exports.cadastrar = (req, res) => {
    const {
        usuarioId,
        sistema,
        tipo,
        finalidade,
        tecnologia,
        nivelRisco,
        revisaoHumana
    } = req.body;

    const sql = `INSERT INTO usoia 
    (usuarioId, sistema, tipo, finalidade, tecnologia, nivelRisco, revisaoHumana) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

    conexao.query(sql, [
        usuarioId,
        sistema,
        tipo,
        finalidade,
        tecnologia,
        nivelRisco,
        revisaoHumana
    ], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        res.status(201).json({
            mensagem: 'Uso de IA cadastrado com sucesso!',
            id: resultado.insertId
        });
    });
};

exports.listar = (req, res) => {
    const sql = 'SELECT * FROM usoia';

    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        res.status(200).json(resultado);
    });
};

exports.alterar = (req, res) => {
    const { id } = req.params;

    const {
        usuarioId,
        sistema,
        tipo,
        finalidade,
        tecnologia,
        nivelRisco,
        revisaoHumana
    } = req.body;

    const sql = `UPDATE usoia SET
        usuarioId = ?,
        sistema = ?,
        tipo = ?,
        finalidade = ?,
        tecnologia = ?,
        nivelRisco = ?,
        revisaoHumana = ?
        WHERE id = ?`;

    conexao.query(sql, [
        usuarioId,
        sistema,
        tipo,
        finalidade,
        tecnologia,
        nivelRisco,
        revisaoHumana,
        id
    ], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Registro não encontrado!' });
        }

        res.status(200).json({
            mensagem: 'Uso de IA alterado com sucesso!'
        });
    });
};
exports.excluir = (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM usoia WHERE id = ?';

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Registro não encontrado!' });
        }

        res.status(200).json({
            mensagem: 'Uso de IA excluído com sucesso!'
        });
    });
};