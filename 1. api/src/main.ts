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


app.get('/filmes/oi', (req, res) => {
    res.json('oi')
})

app.get('/filmes/:id', (req, res) => {
    const { id } = req.params;
    const filme = filmes.find((f:any)=>f.id === id);
    if(!filme) {
        res.status(404).send('Filme não disponível');
        return
    }
    return res.status(200).json({ filme })
})
app.listen(process.env.PORT, () => {
    console.log(`servidor rodando na porta ${process.env.PORT}`)
})