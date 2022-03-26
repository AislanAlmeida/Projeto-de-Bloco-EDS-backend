import { IRepository } from "../interfaces/IRepository";
import { RespostaVaga } from "../models/RespostaVaga"

let respostas = Array<RespostaVaga>();

export class RespostaVagaRepository implements IRepository<RespostaVaga>{
    criar(item: RespostaVaga): RespostaVaga | undefined {
        item.ID = respostas.length + 1;
        try {
            respostas.push(item);
            return item;
        } catch (error) {
            return undefined;
        }
    }
    atualizar(id: number, item: RespostaVaga): boolean {
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
    obterLista(): RespostaVaga[] {
        return respostas.map(r => {
            r.ranking = r.obterRanking();
            return r
        });
    }
    obterItem(id: number): RespostaVaga | undefined {
        return respostas.find(v => v.ID == id);
    }
    
}