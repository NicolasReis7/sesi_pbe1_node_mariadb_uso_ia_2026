
const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'usos_ia'
});

conexao.connect((erro) => {
    if (erro) {
        console.log('Erro ao conectar ao banco:', erro);
        return;
    }

    console.log('Conectado ao banco usos_ia!');
});

module.exports = conexao;
