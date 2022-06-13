import { Conhecimentos } from "../models/Conhecimentos";

export interface IRespostaCriterio{
    ID:number;
    IDResposta:number;
    IDCriterio:number;
    resposta:Conhecimentos;
}