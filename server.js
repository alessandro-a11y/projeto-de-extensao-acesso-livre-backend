const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ROTA TESTE PARA SABER SE CONECTOU AO BANCO
app.get('/test-db', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT 1');
        res.json({ 
            message: "Conectado ao MySQL com sucesso!",
            result: rows 
        });
    } catch (error) {
        console.error("Erro ao conectar no MySQL:", error);
        res.status(500).json({ error: error.message });
    }
});

// ROTA GET: Carregar todos os depoimentos
app.get('/api/depoimentos', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT id, nome, texto, data_criacao AS data FROM depoimentos ORDER BY data_criacao DESC'
        );
        res.status(200).json(rows);
    } catch (err) {
        console.error('Erro ao carregar depoimentos:', err);
        res.status(500).json({ error: 'Falha interna ao carregar os dados.' });
    }
});

// ROTA POST: Salvar um novo depoimento
app.post('/api/depoimentos', async (req, res) => {
    const { nome, texto } = req.body;

    if (!nome || !texto) {
        return res.status(400).json({ error: 'Nome e texto do depoimento são obrigatórios.' });
    }

    try {
        const query = 'INSERT INTO depoimentos (nome, texto, data_criacao) VALUES (?, ?, NOW())';
        await pool.query(query, [nome, texto]);

        res.status(201).json({ message: 'Depoimento salvo com sucesso!', nome, texto });
    } catch (err) {
        console.error('Erro ao salvar depoimento:', err);
        res.status(500).json({ error: 'Falha interna ao salvar o depoimento.' });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
