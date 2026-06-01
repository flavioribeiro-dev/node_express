import express from 'express';
import { configDotenv } from 'dotenv';
import filmes from './dados/filmes.ts';
import type { Filme } from './model/index-Filme.ts'

configDotenv();

const app = express();

// Rota de Teste inicial
app.get('/ping', (req, res) => {
    res.send('pong');
})

function limparCampos(ignorar:string | undefined, filmes: Filme) {
    const camposPraIgnorar = ignorar ? ignorar.toString().split(',') : [];
    const copia: Partial<Filme> = {...filmes};
    camposPraIgnorar.forEach( (campo:string) => {delete copia[campo as keyof Filme]} );
    return copia;
}

app.get('/filmes', (req, res) => {
    const { ignorar } = req.query as any;
    const filmesProcessados = filmes.map( (filme: Filme) => limparCampos(ignorar, filme) )
    return res.status(200).json(filmesProcessados);
})

// Teste a ordem de precedência das rotas - um parâmetro "estático" sempre precisa vir antes de um parâmetro dinâmico (comparando filmes/oi com filmes/:id - este último precisa vir após o primeiro)
app.get('/filmes/oi', (req, res) => { 
    res.json('oi')
})

// Consultando filme a partir do ID e obtendo Parâmetros a partir da própria requisição
app.get('/filmes/:id', (req, res) => {
    const { id } = req.params;
    const { ignorar } = req.query as any;
    const filme = filmes.find((f: Filme) => f.id === id);
    if(!filme) {
        res.status(404).send('Filme não encontrado');
        return;
    }
    return res.status(200).json( limparCampos(ignorar, filme) );
})


app.listen(process.env.PORT, () => {
    console.log(`servidor rodando na porta ${process.env.PORT}`)
})