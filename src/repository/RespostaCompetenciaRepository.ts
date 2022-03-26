import { IRepository } from "../interfaces/IRepository";
import { RespostaCompetencia } from "../models/RespostaCompetencia";

let respostas = Array<RespostaCompetencia>(); 

export class RespostaCompetenciaRepository implements IRepository<RespostaCompetencia>{
    criar(item: RespostaCompetencia): RespostaCompetencia | undefined {
        item.ID = respostas.length + 1;
        try {
            respostas.push(item);
            return item;
        } catch (error) {
            return undefined;
        }
    }
    atualizar(id: number, item: RespostaCompetencia): boolean {
        throw new Error("Method not implemented.");
    }
    excluir(id: number): boolean {
        let index = respostas.findIndex(v => v.ID == id);
        if(index >= 0){
            respostas.splice(index);
            return true;
        }else{
            return false;
        }  
    }
    obterLista(): RespostaCompetencia[] {
        return respostas;
    }
    obterItem(id: number): RespostaCompetencia | undefined {
        return respostas.find(v => v.ID == id);
    }
    
    obterRespostasCompetencias(idResposta:number): Array<RespostaCompetencia>{
        return respostas.filter(r => r.IDResposta == idResposta);
    }

}