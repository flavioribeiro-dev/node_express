import express from 'express';
import { configDotenv } from 'dotenv';

configDotenv();
// const porta = Number(process.env.PORT);

const app = express();

app.get('/ping', (req, res) => {
    res.send('123');
})



app.listen(process.env.PORT, () => {
    console.log(`servidor rodando na porta ${process.env.PORT}`)
})