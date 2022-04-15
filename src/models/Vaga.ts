import { IVaga } from "../interfaces/IVaga";
import { CompetenciaRepository } from "../repository/CompetenciaRepository";
import { AreasAtuacao } from "./AreasAtuacao";
import { Competencia } from "./CompetenciaVaga";
import { FormasContratacao } from "./FormasContratacao";
import {Model} from 'sequelize';

export enum statusEnum{
    Ativo='ativo',
    Inativo='inativo'
}

export class Vaga implements IVaga{
    
    id: number=0;
    id_empresa: number =0;
    cargo: string = '';
    cidade: string = '';
    UF: string = '';
    forma_contratacao: FormasContratacao;
    area_atuacao: AreasAtuacao;
    descricao: string;
    dataInicio: Date;
    data_validade: Date;
    status:statusEnum = statusEnum.Ativo;
    palavraChave: string[] = [];

    competencias: Array<Competencia> = new Array<Competencia>();
    
    // candidatos: Array<Candidato> = new Array()
    constructor(descricao:string, dataInicio:Date, data_validade:Date, area_atuacao:AreasAtuacao,forma_contratacao: FormasContratacao){
        this.descricao = descricao;
        this.dataInicio = dataInicio;
        this.data_validade = data_validade;
        this.area_atuacao = area_atuacao;
        this.forma_contratacao = forma_contratacao;
    }

    async adicionarCompetencia(competencia:Competencia){
        competencia.id_vaga = this.id;
        
        let repository = new CompetenciaRepository();
        let competenciaSalva = await repository.criar(competencia);
        // competenciaSalva ? this.competencias.push(competenciaSalva):console.log('nada para salvar');
    }

}