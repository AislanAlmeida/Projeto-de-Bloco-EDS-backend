import { VagaModel } from "../database/models/VagaModel";
import { IRepository } from "./IRepository";
import { AreasAtuacao } from "../models/AreasAtuacao";
import { Usuario } from "../models/Usuario";
import { Vaga } from "../models/Vaga";
import { Op } from "sequelize";

export class VagaRepository implements IRepository<Vaga>{

    async criar(item: Vaga): Promise<Vaga | undefined> {
        
        let vaga = await VagaModel.create({
            id_usuario: item.id_empresa,
            cargo: item.cargo,
            cidade: item.cidade,
            UF: item.UF,
            forma_contratacao: item.forma_contratacao,
            descricao: item.descricao,
            dataModificacao: item.dataInicio,
            data_validade: item.data_validade,
        }).then((retornoVaga) => {
            if(retornoVaga){
                item.id = retornoVaga.getDataValue('id');
                return item;
            }else{
                return undefined;
            }
        }).catch(err => {
            console.log(err);
            return undefined;
        })
        return vaga;
    }


    async excluir(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");    
    }
    async obterLista(): Promise<Vaga[]|any> {
        let vagas = await VagaModel.findAll({
            where:{
                data_validade:{[Op.gte]: new Date()}
            }
        });
        return vagas;
        // throw new Error("Method not implemented.");
    }
    async obterItem(id: number): Promise<Vaga|undefined> {
        throw new Error("Method not implemented.");
    }

    async obterVagasPostadas(id_empresa:number){
        let vagas = await VagaModel.findAll({
            where:{
                id_usuario: id_empresa
            }
        })
        return vagas;
    }

    async obterVagaPorAreaAtuacao(areaAtuacao:AreasAtuacao){
        throw new Error("Method not implemented.");
    }

    async atualizar(id: number, item: Vaga): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}