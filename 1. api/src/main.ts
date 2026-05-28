import express from 'express';
import { configDotenv } from 'dotenv';
import filmes from './dados/filmes.ts';

configDotenv();
// const porta = Number(process.env.PORT);

const app = express();

app.get('/ping', (req, res) => {
    res.send('pong');
})

app.get('/filmes', (req, res) => {
    return res.status(200).json(filmes);
})

app.listen(process.env.PORT, () => {
    console.log(`servidor rodando na porta ${process.env.PORT}`)
})