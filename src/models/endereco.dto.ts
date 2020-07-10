import { CidadeDTO } from './cidade.dto';

export interface EnderecoDTO {
    id: string;
    logradouro: string;
    nnumero: string;
    complemento: string;
    bairro: string;
    cep: string;
    cidade?: CidadeDTO;
}