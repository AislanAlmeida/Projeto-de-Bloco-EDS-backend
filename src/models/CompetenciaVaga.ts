import { Model } from "sequelize";
import { RespostaCompetencia } from "./RespostaCompetencia";

export class Competencia{
    id: number = 0;
    id_vaga: number = 0;
    nome: string;
    descricao: string;
    perfil: number;
    peso: number;

    resposta_competencia: RespostaCompetencia|null = null;

    constructor(nome:string,descricao:string,perfil:number,peso:number){
        this.nome = nome;
        this.descricao = descricao;
        this.perfil = perfil;
        this.peso = peso;
    }   
}