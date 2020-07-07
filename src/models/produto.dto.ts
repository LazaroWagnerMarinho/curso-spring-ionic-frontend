import { StringDecoder } from 'string_decoder';

export interface ProdutoDTO {
    id: string;
    nome: string;
    preco: number;
    imageUrl? : string;
}