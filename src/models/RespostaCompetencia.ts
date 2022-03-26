import { Conhecimentos } from "./Conhecimentos";

export class RespostaCompetencia{
    ID:number = 0;
    IDResposta:number;
    IDCompetencia:number;
    resposta:Conhecimentos;

    /**
     *
     */
    constructor(IDResposta:number,IDCompetencia:number,resposta:Conhecimentos) {
        this.IDResposta = IDResposta;
        this.IDCompetencia = IDCompetencia;
        this.resposta = resposta;
    }
}