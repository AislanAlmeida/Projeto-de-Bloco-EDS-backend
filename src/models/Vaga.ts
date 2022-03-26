import { IVaga } from "../interfaces/IVaga";
import { CompetenciaRepository } from "../repository/CompetenciaRepository";
import { AreasAtuacao } from "./AreasAtuacao";
import { Competencia } from "./CompetenciaVaga";
import { FormasContratacao } from "./FormasContratacao";


export enum statusEnum{
    Ativo='ativo',
    Inativo='inativo'
}

export class Vaga implements IVaga{
    
    id: number=0;
    id_empresa: number =0;
    cargo: string = '';
    cidade: string = 'Rio de Janeiro';
    UF: string = 'RJ';
    forma_contratacao: FormasContratacao = FormasContratacao.CLT;
    area_atuacao: AreasAtuacao;
    descricao: string;
    dataInicio: Date;
    data_validade: Date;
    status:statusEnum = statusEnum.Ativo;
    palavraChave: string[] = [];

    competencias: Array<Competencia> = new Array<Competencia>();
    
    // candidatos: Array<Candidato> = new Array()
    constructor(descricao:string, dataInicio:Date, data_validade:Date, area_atuacao:AreasAtuacao){
        this.descricao = descricao;
        this.dataInicio = dataInicio;
        this.data_validade = data_validade;
        this.area_atuacao = area_atuacao;
    }

    adicionarCompetencia(competencia:Competencia){
        competencia.IDVaga = this.id;
        
        let repository = new CompetenciaRepository();
        let competenciaSalva = repository.criar(competencia);
        competenciaSalva ? this.competencias.push(competenciaSalva):console.log('nada para salvar');
    }

}