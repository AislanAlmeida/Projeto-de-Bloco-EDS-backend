import { CompetenciaRepository } from "../repository/CompetenciaRepository";
import { RespostaCompetenciaRepository } from "../repository/RespostaCompetenciaRepository";

export class RespostaVaga{
    ID: number = 0;
    IDCandidato: number;
    IDVaga: number;
    dataResposta: Date;
    ranking: number = 0;

    constructor(IDCandidato:number,IDVaga:number){
        this.IDCandidato = IDCandidato;
        this.IDVaga = IDVaga;
        this.dataResposta = new Date();
    }

    obterRanking(){
        let repo = new RespostaCompetenciaRepository();
        let repoCompetencia = new CompetenciaRepository();

        let competenciasRespondidas = repo.obterRespostasCompetencias(this.ID);
        // console.log(' -- Competencias Respondidas -- ')
        // console.table(competenciasRespondidas);
        
        let competencias = competenciasRespondidas.map(r => repoCompetencia.obterItem(r.IDCompetencia));
        // console.log(' -- Competencias -- ')
        // console.table(competencias);

        let ranking = 0;
        let esperado = 0;
        let conhecimento = 0;
        for (const competencia of competencias) {
            let r = competenciasRespondidas.find(c => c.IDCompetencia == competencia?.ID);
            esperado += competencia ? competencia.peso : 0;
            // console.log(r?.resposta,competencia?.descricao,competencia?.perfil,competencia?.peso);
            if(competencia && r){
                conhecimento += r.resposta * competencia.peso;
            }

        }
        ranking = conhecimento / esperado;
        
        return ranking;

    }

}