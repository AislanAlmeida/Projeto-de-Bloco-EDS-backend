import {Request,Response} from 'express';
import { VagaModel } from '../database/models/VagaModel';
import { Competencia } from '../models/CompetenciaVaga';
import { FormasContratacao } from '../models/FormasContratacao';
import { statusEnum, Vaga } from '../models/Vaga';
import { UsuarioRepository } from '../repository/UsuarioRepository';
import { VagaRepository } from '../repository/VagaRepository';

const vagaRepository = new VagaRepository();
const usuarioRepository = new UsuarioRepository();

class vagaController{
    
    async criarVaga(req:Request,res:Response){
        let idUsuario = req.userId;
        
        let {cargo,cidade,UF,descricao,data_validade,area_atuacao} = req.body;
        let forma_contratacao: FormasContratacao = req.body.forma_contratacao;

        let competencias: Array<Competencia> = req.body.competencias;
        
        if(!cargo && !cidade && !forma_contratacao && !UF && !descricao && !data_validade && !area_atuacao){
            return res.status(400).send('Parametros Incorretos');
        }
        
        //AQUI => IMPLEMENTAR PADRÃO DE PROJETO FACTORY
        let vaga = new Vaga(descricao,new Date(),data_validade,area_atuacao,forma_contratacao);
        vaga.cargo = cargo;
        vaga.cidade = cidade;
        vaga.UF = UF;
        vaga.forma_contratacao = forma_contratacao;
        vaga.descricao = descricao;
        vaga.status = statusEnum.Inativo;
        vaga.id_empresa = idUsuario;
        
        let vagaModel = await vagaRepository.criar(vaga);

        if(competencias.length > 0){
            competencias.forEach(element => {
                vaga.adicionarCompetencia(element);
            });
        }

        if(vagaModel){
            res.status(201).json(vagaModel);
        }else{
            res.status(400).json('Erro ao criar a vaga, faltam informações importantes');
        }
        
    }

    async obterVagas(req:Request,res:Response){
        let id_empresa = req.userId;
        let vagas = await vagaRepository.obterLista();
        return vagas.length > 0 ? res.status(200).json(vagas) : res.sendStatus(204);
    }

    async responderVaga(req:Request, res:Response){
        console.log('Controller ResponderVaga ainda não funciona');
        res.status(200).json({mensagem: 'Controller responderVaga ainda não está pronto'});
    }

}

function converteData(dataString:string):Date{
    let dataSplit = dataString.split('-');
    return new Date(+dataSplit[0],+dataSplit[1]-1,+dataSplit[2]);
}

export default new vagaController();