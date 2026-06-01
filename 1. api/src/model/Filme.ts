import type { Genero, Diretor, Ator } from './index-Filme.ts';

export interface Filme {
    id: string,
    titulo: string,
    ano: number,
    genero: Genero[],
    diretor: Diretor,
    elenco: Ator[]
}