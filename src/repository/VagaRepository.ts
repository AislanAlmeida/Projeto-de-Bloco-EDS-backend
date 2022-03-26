import { VagaModel } from "../database/models/VagaModel";
import { IRepository } from "../interfaces/IRepository";
import { AreasAtuacao } from "../models/AreasAtuacao";
import { Vaga } from "../models/Vaga";

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
        }).catch(err => {
            console.log(err);
        })
        if(vaga){
            return item;
        }
        // throw new Error("Method not implemented.");
    }


    async excluir(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");    
    }
    async obterLista(): Promise<Vaga[]> {
        throw new Error("Method not implemented.");
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