import { AreasAtuacao } from "../models/AreasAtuacao";
import { FormasContratacao } from "../models/FormasContratacao";

export interface IVaga{
    id:number;
    id_empresa:number;
    descricao:string;
    cargo:string;
    cidade:string;
    UF:string;
    dataInicio:Date;
    data_validade:Date;
    palavraChave:string[];
    area_atuacao:AreasAtuacao;
    forma_contratacao:FormasContratacao;
}