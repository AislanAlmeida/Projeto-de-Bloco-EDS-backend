import { IRepository } from "../interfaces/IRepository";
import { Competencia } from "../models/CompetenciaVaga";

let competencias: Array<Competencia> = Array<Competencia>();

//implementar interface
export class CompetenciaRepository {
    criar(item: Competencia): Competencia|undefined {
        let newItem = new Competencia(item.descricao,item.perfil,item.peso);
        newItem.IDVaga = item.IDVaga;
        newItem.ID = competencias.length + 1;

        console.log(' ** new item',newItem);
        // item.ID = competencias.length + 1;

        try {
            competencias.push(newItem);
            // competencias.push(item);
            return newItem;
            // return item;
        } catch (error) {
            return undefined;
        }
    }
    atualizar(id: number, item: Competencia): boolean {
        throw new Error("Method not implemented.");
    }
    excluir(id: number): boolean {
        let index = competencias.findIndex(v => v.ID == id);
        if(index >= 0){
            competencias.splice(index);
            return true;
        }else{
            return false;
        }   
    }
    obterLista(): Competencia[] {
        return competencias;
    }
    obterItem(id: number): Competencia | undefined {
        return competencias.find(c => c.ID == id);
    }
    
}