import { IRepository } from "./IRepository";
import { Competencia } from "../models/CompetenciaVaga";
import { CompetenciaModel } from "../database/models/CompetenciaModel";
// let competencias: Array<Competencia> = Array<Competencia>();

//implementar interface
export class CompetenciaRepository {
    async criar(item: Competencia): Promise<Competencia|undefined> {
        let newItem = new Competencia(item.descricao,item.perfil,item.peso);
        newItem.id_vaga = item.id_vaga;
 
        let competencia = await CompetenciaModel.create({
            id_vaga: item.id_vaga,
            descricao: item.descricao,
            perfil: item.perfil,
            peso: item.peso

        }).catch(err =>{
            console.log(err);
        })

        if(competencia){
            return item;
        }

    }
    
    atualizar(id: number, item: Competencia): boolean {
        throw new Error("Method not implemented.");
    }
    
    excluir(id: number): boolean {
        throw new Error("Method not implemented.");
        // let index = competencias.findIndex(v => v.ID == id);
        // if(index >= 0){
            //     competencias.splice(index);
            //     return true;
            // }else{
                //     return false;
                // }   
    }
            
    obterLista(): Competencia[] {
        throw new Error("Method not implemented.");
        // return competencias;
    }
    
    async obterItem(id: number): Promise<Competencia | undefined> {
        let competencia = await CompetenciaModel.findOne({
            where:{
                id:id
            }
        })
        if(competencia){
            let c = new Competencia(competencia.getDataValue('descricao'),competencia.getDataValue('perfil'),competencia.getDataValue('peso'));
            c.ID = competencia.getDataValue('id');
            return c;
        }
        else{
            return undefined;
        }
        // return competencias.find(c => c.ID == id);
    }

    async obterCompetenciasVaga(idVaga: number){
        let competencias = await CompetenciaModel.findAll({
            attributes:['id','descricao'],
            where:{
                id_vaga: idVaga
            }
        }).catch(err => {
            console.log(err);
        })
        
        return competencias;
    }
}