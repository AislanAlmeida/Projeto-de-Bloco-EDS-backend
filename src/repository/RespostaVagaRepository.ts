import { IRepository } from "./IRepository";
import { RespostaVaga } from "../models/RespostaVaga"
import { RespostaVagaModel } from '../database/models/RespostaVagaModel';

let respostas = Array<RespostaVaga>();

export class RespostaVagaRepository implements IRepository<RespostaVaga>{

    async criar(item: RespostaVaga): Promise<RespostaVaga | undefined> {

        let respostaCriada = await RespostaVagaModel.create({
            id_usuario: item.id_candidato,
            id_vaga: item.id_vaga,
        }).then(resposta =>{
            item.id = resposta.getDataValue('id');
            return item;
        }).catch(err =>{
            console.log(err);
            return undefined;
        })

        return respostaCriada;

        // item.ID = respostas.length + 1;
        // try {
        //     respostas.push(item);
        //     return item;
        // } catch (error) {
        //     return undefined;
        // }
    }
    async atualizar(id: number, item: RespostaVaga): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async excluir(id: number): Promise<boolean> {
        let index = respostas.findIndex(v => v.id == id);
        if(index >= 0){
            respostas.splice(index);
            return true;
        }else{
            return false;
        }  
    }
    async obterLista(): Promise<RespostaVaga[]> {
        throw new Error("Method not implemented.");        
    }
    async obterItem(id: number): Promise<RespostaVaga | undefined> {
        return respostas.find(v => v.id == id);
    }
    
    async obterRespostasVaga(id_vaga:number){
        let respostas = await RespostaVagaModel.findAll({
            where:{
                id_vaga: id_vaga
            }
        }).then(respostasVaga =>{
            return respostasVaga.map(r =>{
                let resposta = new RespostaVaga(r.getDataValue('id_usuario'),r.getDataValue('id_vaga'));
                resposta.id = r.getDataValue('id');
                return resposta;
            })
        })

        for (const resposta of respostas) {
            await resposta.obterRanking();
        }
        return respostas;

    }
    
}