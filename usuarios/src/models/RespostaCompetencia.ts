import { Conhecimentos } from "./Conhecimentos";

export class RespostaCompetencia{
    id:number = 0;
    id_resposta:number;
    id_competencia:number;
    resposta:number; //UTILIZAR VALUE OBJECT AQUI

    /**
     *
     */
    constructor(id_resposta:number,id_competencia:number,resposta:number) {
        this.id_resposta = id_resposta;
        this.id_competencia = id_competencia;
        this.resposta = resposta;
    }
}