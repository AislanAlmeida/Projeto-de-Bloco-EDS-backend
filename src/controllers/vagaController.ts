import {Request,response,Response} from 'express';
import { VagaModel } from '../database/models/VagaModel';
import { FormasContratacao } from '../models/FormasContratacao';
import { statusEnum, Vaga } from '../models/Vaga';
import { VagaRepository } from '../repository/VagaRepository';

const repository = new VagaRepository();
class vagaController{
    async criarVaga(req:Request,res:Response){
        let idUsuario = req.userId;
        
        let {cargo,cidade,forma_contratacao,UF,descricao,data_validade,area_atuacao} = req.body as Vaga;

        let vaga = new Vaga(descricao,new Date(),data_validade,area_atuacao);
        
        //verificar se é melhor passar tudo no constructor
        vaga.cargo = cargo;
        vaga.cidade = cidade;
        vaga.UF = UF;
        vaga.forma_contratacao = forma_contratacao;
        vaga.descricao = descricao;
        vaga.status = statusEnum.Inativo;
        vaga.id_empresa = idUsuario;


        let vagaModel = await repository.criar(vaga);
        if(vagaModel){
            res.status(201).json(vagaModel);
        }else{
            res.status(400).json('Erro ao criar a vaga, faltam informações importantes');
        }
        
    }

    async obterVagas(req:Request,res:Response){
        let id_empresa = req.userId;
        let vagas = await repository.obterVagasPostadas(id_empresa);
        return vagas.length > 0 ? res.status(200).json(vagas) : res.sendStatus(204);
    }
}

function converteData(dataString:string):Date{
    let dataSplit = dataString.split('-');
    return new Date(+dataSplit[0],+dataSplit[1]-1,+dataSplit[2]);
}

export default new vagaController();