import { CompetenciaRepository } from "../repository/CompetenciaRepository";
import { RespostaCompetenciaRepository } from "../repository/RespostaCompetenciaRepository";

export class RespostaVaga{
    id: number = 0;
    id_candidato: number;
    id_vaga: number;
    dataResposta: Date;
    ranking: number = 0;
    nome_candidato: string = '';
    constructor(IDCandidato:number,IDVaga:number){
        this.id_candidato = IDCandidato;
        this.id_vaga = IDVaga;
        this.dataResposta = new Date();
    }

    async obterRanking(){
        let respostaCompetenciaRepository = new RespostaCompetenciaRepository();
        let competenciaRepository = new CompetenciaRepository();

        let competenciasRespondidas = await respostaCompetenciaRepository.obterRespostasCompetencias(this.id);
        // console.log(' -- Competencias Respondidas -- ')
        // console.table(competenciasRespondidas);

        for (const competencia of competenciasRespondidas) {
            await competenciaRepository.obterItem(competencia.id_competencia);
        }
        let competencias = await Promise.all(competenciasRespondidas.map(async (r) => {
                return competenciaRepository.obterItem(r.id_competencia)
            })
        );
        // console.log(' -- Competencias -- ')
        // console.table(competencias);

        let ranking = 0;
        let esperado = 0;
        let conhecimento = 0;
        for (const competencia of competencias) {
            let r = competenciasRespondidas.find(c => c.id_competencia == competencia?.ID);
            esperado += competencia ? competencia.peso : 0;
            // console.log(r?.resposta,competencia?.descricao,competencia?.perfil,competencia?.peso);
            if(competencia && r){
                conhecimento += r.resposta * competencia.peso;
            }

        }
        ranking = conhecimento / esperado;
        this.ranking = ranking ? ranking : 0;
        return ranking;

    }

}