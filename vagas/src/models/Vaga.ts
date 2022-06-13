
import { CompetenciaRepository } from "../repository/CompetenciaRepository";
import { AreasAtuacao } from "./AreasAtuacao";
import { Competencia } from "./CompetenciaVaga";
import { FormasContratacao } from "./FormasContratacao";

export enum statusEnum{
    Ativo='ativo',
    Encerrada='encerrada',
    Expirada='expirada'
}

export class Vaga{
    
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

    }

    async adicionarMultiplasCompetencias(competencias: Competencia[]){
        competencias = competencias.map(c => {
            c.id_vaga = this.id
            return c;
        })
        let repository = new CompetenciaRepository();
        let competenciasSalvas = await repository.incluirVarias(competencias);
        console.log(competenciasSalvas);
        return competenciasSalvas;
        // if(competencias.length > 0){

        //     for (const competencia of competencias) {
        //         await this.adicionarCompetencia(competencia)
        //     }
        // }
    }

    obterPerfilOportunidade(){
        let mult = 0;
        let div = 0;
        for (const competencia of this.competencias) {
            mult += competencia.perfil * competencia.peso;
            div += competencia.peso;
        }
        return (mult/div).toFixed(2);
    }


}