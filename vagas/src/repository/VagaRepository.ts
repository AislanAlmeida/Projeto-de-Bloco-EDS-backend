import { VagaModel } from "../database/models/VagaModel";
import { AreasAtuacao } from "../models/AreasAtuacao";
import { Vaga } from "../models/Vaga";
import { Op, QueryTypes} from "sequelize";
import { UsuarioModel } from "../database/models/UsuarioModel";
import { RespostaVagaModel } from "../database/models/RespostaVagaModel";
import { sequelize } from "../database/connection";
import { RespostaCompetenciaModel } from "../database/models/RespostaCompetenciaModel";




export class VagaRepository{


    async criar(item: Vaga): Promise<Vaga | undefined> {
        
        let vaga = await VagaModel.create({
            id_usuario: item.id_empresa,
            cargo: item.cargo,
            cidade: item.cidade,
            UF: item.UF,
            forma_contratacao: item.forma_contratacao,
            area_atuacao: item.area_atuacao,
            descricao: item.descricao,
            dataModificacao: item.dataInicio,
            data_validade: item.data_validade,
            status:'ativa'
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

    async obterListaQuery(query:any,id_usuario:number):Promise<any>{

        type CustomQuery={
            data_validade?:any,
            cidade?:any,
            UF?:any,
            cargo?:any,
            area_atuacao?:any,
            id_usuario?:number,
            status?:any,
            id?:any
        }

        var customQuery:CustomQuery = {};
        if(query.cidade){
            customQuery.cidade ={[Op.like]:`%${query.cidade}%`};
        }
        if(query.UF){
            customQuery.UF = query.UF;
        }
        if(query.cargo){
            customQuery.cargo ={[Op.like]:`%${query.cargo}%`};
        }
        if(query.area_atuacao){
            customQuery.area_atuacao = {[Op.like]:`%${query.area_atuacao}%`};
        }
        if(query.id_usuario){
            customQuery.id_usuario = query.id_usuario;
        }
        if(query.status){
            customQuery.status = query.status;
        }else{
            customQuery.status = 'ativa'
        }

        type QRY = {
            id_vaga:number,
        }
        
        const tempSQL:QRY[] =  await sequelize.query(`Select id_vaga from RespostasVagas where id_usuario = ${id_usuario}`,{
            type: QueryTypes.SELECT
        })

        if(tempSQL.length > 0){
            customQuery.id = {[Op.notIn]:tempSQL.map(p => p.id_vaga)};
        }

        let vagas = await VagaModel.findAll({
            logging:false,
            where:customQuery,
            order:[['id','DESC']],
            include:[
                {
                    model: UsuarioModel,
                    attributes:['nome','cidade','UF'],
                },

            ],
            group:'Vagas.id'
        })

        return vagas;
    }

    async obterVagasVencidas():Promise<any>{
        let vagas = await VagaModel.findAll({
            where:{
                data_validade:{[Op.lte]:new Date()},
                status: 'ativa',

            },
            include:[
                {
                    model: UsuarioModel,
                    required:true,
                    attributes:['nome','cidade','UF']
                },
            ],
        })
        return vagas;
    }

    async obterLista(): Promise<Vaga[]|any> {
        let vagas = await VagaModel.findAll({
            raw:true,
            where:{
                data_validade:{[Op.gte]: new Date()}
            },
            include:[
                {
                    model: UsuarioModel,
                    required:true,
                    attributes:['nome','cidade','UF']
                },
            ],
        });

        return vagas;

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

    async obterUltimasVagas(){
        let vagas = await VagaModel.findAll({
            limit:10,
            order:[['id','DESC']]
        })
        return vagas;
    }
    
    async expirarVaga(id_vaga:number){
        let vaga = await VagaModel.update({
            status:'expirada'
        },{
            where:{id:id_vaga}
        })
        .catch(err => {
            console.log(err);
        })
        return vaga;
    }

    async encerrarVaga(id_vaga:number){
        let vaga = await VagaModel.update({
            status:'encerrada'
        },{
            where:{id:id_vaga}
        })
        .catch(err => {
            console.log(err);
        })
        return vaga;
    }
    
    async expirarVagasVencidas(){
        let vagas = await VagaModel.update({
            status:'expirada'
        },{
            where:{
                data_validade:{[Op.lte]:new Date()},
                status: 'ativa',
            }
        })
        return vagas
    }

    async cancelarVaga(id_vaga:number){
        let vaga = await VagaModel.update({
            status:'cancelada'
        },{
            where:{id:id_vaga}
        })
        .catch(err => {
            console.log(err);
        })
        return vaga;
    }

    async reativarVaga(id_vaga:number){
        const hoje = new Date();
        const data_validade = new Date(hoje.setDate(hoje.getDate()+7));
        let vaga = await VagaModel.update({
            status:'ativa',
            data_validade: data_validade
        },{
            where:{id:id_vaga}
        })
        .catch(err => {
            console.log(err);
        })
        return vaga;
    }

    async obterVagaPorAreaAtuacao(areaAtuacao:AreasAtuacao){
        throw new Error("Method not implemented.");
    }

    async atualizar(id: number, item: Vaga): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async obterVagasRespondidas(id_candidato:number){
        let vagas = await RespostaVagaModel.findAll({
            where:{
                'id_usuario': id_candidato,
            },
            include:[
                {
                    model:VagaModel,
                    required: true,
                    include:[
                        {
                            model: UsuarioModel,
                            required:true,
                            attributes:['nome']
                        },
                    ]
                },
                {
                    model:RespostaCompetenciaModel,
                    required:true,
                }
            ]
        })
        return vagas;
    }

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