import { IRepository } from "../repository/IRepository";
import { RespostaCompetencia } from "../models/RespostaCompetencia";
import { RespostaCompetenciaModel } from "../database/models/RespostaCompetenciaModel";

let respostas = Array<RespostaCompetencia>(); 

export class RespostaCompetenciaRepository implements IRepository<RespostaCompetencia>{
    async criar(item: RespostaCompetencia): Promise<RespostaCompetencia | undefined> {
        let respostaCompetencia = await RespostaCompetenciaModel.create({
            resposta: item.resposta,
            id_competencia: item.id_competencia,
            id_resposta: item.id_resposta,
        }).then(resposta =>{
            item.id = resposta.getDataValue('id');
            return item;
        }).catch(err =>{
            console.log(err);
            return undefined;
        })
        return respostaCompetencia;
    }
    atualizar(id: number, item: RespostaCompetencia): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    excluir(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    obterLista(): Promise<RespostaCompetencia[]> {
        throw new Error("Method not implemented.");
    }
    obterItem(id: number): Promise<RespostaCompetencia | undefined> {
        throw new Error("Method not implemented.");
    }


    // criar(item: RespostaCompetencia): RespostaCompetencia | undefined {
    //     item.id = respostas.length + 1;
    //     try {
    //         respostas.push(item);
    //         return item;
    //     } catch (error) {
    //         return undefined;
    //     }
    // }
    // atualizar(id: number, item: RespostaCompetencia): boolean {
    //     throw new Error("Method not implemented.");
    // }
    // excluir(id: number): boolean {
    //     let index = respostas.findIndex(v => v.id == id);
    //     if(index >= 0){
    //         respostas.splice(index);
    //         return true;
    //     }else{
    //         return false;
    //     }  
    // }
    // obterLista(): RespostaCompetencia[] {
    //     return respostas;
    // }
    // obterItem(id: number): RespostaCompetencia | undefined {
    //     return respostas.find(v => v.id == id);
    // }
    
    async obterRespostasCompetencias(idResposta:number): Promise<Array<RespostaCompetencia>>{
        let respostas = await RespostaCompetenciaModel.findAll({
            where:{
                id_resposta: idResposta
            }
        }).then(respostasCompetencia =>{
            return respostasCompetencia.map(r => {
                let resposta = new RespostaCompetencia(r.getDataValue('id_resposta'),r.getDataValue('id_competencia'),r.getDataValue('resposta'));
                resposta.id = r.getDataValue('id');
                return resposta;
            }) 
        })
        return respostas;
        // return respostas.filter(r => r.id_resposta == idResposta);
    }

}