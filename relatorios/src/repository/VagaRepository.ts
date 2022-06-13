import { VagaModel } from "../database/models/VagaModel";
import { Op} from "sequelize";
import { UsuarioModel } from "../database/models/UsuarioModel";
import { RespostaVagaModel } from "../database/models/RespostaVagaModel";
import { sequelize } from "../database/connection";

export class VagaRepository{


    async obterQuantidadeVagasCriadas(hoje:boolean=false){
        let vagas = await VagaModel.findAll({
            logging: true,
            attributes:[
                [sequelize.fn('COUNT',sequelize.col('id')),'qtd']
            ],
            where:{
                createdAt: {[Op.gte] : hoje ? new Date().setHours(0,0,0) : new Date(2022,1,1)}
            }
        })
        return vagas[0].getDataValue('qtd');
    }

    async obterQuantidadeVagasRespondidas(hoje:boolean=false) {
        let vagas = await RespostaVagaModel.findAll({
            attributes:[
                [sequelize.fn('COUNT',sequelize.col('id')),'qtd']
            ],
            where:{
                createdAt: {[Op.gte] : hoje ? new Date().setHours(0,0,0) : new Date(2022,1,1)}
            }
        })
        return vagas[0].getDataValue('qtd');
    }
    
    async obterQuantidadeUsuariosInscritos(hoje:boolean=false):Promise<Array<any>|number>{
        let roles = await UsuarioModel.findAll({
            attributes:[
                'role',
                [sequelize.fn('COUNT',sequelize.col('id')),'qtd']
            ],
            where:{
                createdAt: {[Op.gte] : hoje ? new Date().setHours(0,0,0) : new Date(2022,1,1)}
            },
            group:['role']
        })

        let lista = [];
        for (const role of roles) {
            lista.push({role:role.getDataValue('role'),qtd:role.getDataValue('qtd')});
        }
        if(hoje){
            return roles.length;
        }
        return lista;
        
    }
}