import {Request,Response} from 'express';
import { Competencia } from '../models/CompetenciaVaga';
import { FormasContratacao } from '../models/FormasContratacao';
import { statusEnum, Vaga } from '../models/Vaga';
import { VagaRepository } from '../repository/VagaRepository';

const vagaRepository = new VagaRepository();

class vagaController{
    
    async criarVaga(req:Request,res:Response){

        let idUsuario = req.userId;
        let role = req.userRole;

        let {cargo,cidade,UF,descricao,data_validade,area_atuacao} = req.body;
        let forma_contratacao: FormasContratacao = req.body.forma_contratacao;
        let competencias: Array<Competencia> = req.body.competencias;

        if(role == 'candidato'){
            return res.sendStatus(401);
        }
        
        if(!cargo && !cidade && !forma_contratacao && !UF && !descricao && !data_validade && !area_atuacao){
            return res.status(400).send('Parâmetros Incorretos');
        }
        
        //AQUI => IMPLEMENTAR PADRÃO DE PROJETO FACTORY
        let vaga = new Vaga(descricao,new Date(),data_validade,area_atuacao,forma_contratacao);
        vaga.cargo = cargo;
        vaga.cidade = cidade;
        vaga.UF = UF;
        vaga.forma_contratacao = forma_contratacao;
        vaga.descricao = descricao;
        vaga.status = statusEnum.Ativo;
        vaga.id_empresa = idUsuario;

        vagaRepository.criar(vaga).then((vaga) => {
            if(!vaga) return res.status(400).json('Erro ao criar a vaga, faltam informações importantes');
                
            vaga.adicionarMultiplasCompetencias(competencias).then(vagaCompetencias => {
                if(!vagaCompetencias){
                    res.status(400).json('Erro ao salvar competencias')
                }
                return res.status(201).json(vagaCompetencias);
            }).catch(err => {
                return res.status(400).json('Erro ao criar competencias, reveja os valores e tente novamente')
            })
            
        });
        
    }

    async obterVagas(req:Request,res:Response){
        console.log('Obtendo vagas')
        let id_usuario = req.userId;
        let vagas = await vagaRepository.obterListaQuery(req.query,id_usuario);
        return res.status(200).json(vagas);

    }

    async cancelarVaga(req:Request, res:Response){
        let role = req.userRole;
        let {id_vaga} = req.body;
        if(id_vaga && role != 'candidato'){

            let vaga = await vagaRepository.cancelarVaga(id_vaga);
            res.status(200).json(vaga);
        }else{
            res.sendStatus(400);
        }
    }

    async encerrarVaga(req:Request, res:Response){
        let role = req.userRole;
        let {id_vaga} = req.body;
        if(id_vaga && role != 'candidato'){

            let vaga = await vagaRepository.encerrarVaga(id_vaga);
            res.status(200).json(vaga);
        }else{
            res.sendStatus(400);
        }
    }

    async reativarVaga(req:Request, res:Response){
        let role = req.userRole;
        let {id_vaga} = req.body;
        if(id_vaga && role != 'candidato'){

            let vaga = await vagaRepository.reativarVaga(id_vaga);
            res.status(200).json(vaga);
        }else{
            res.sendStatus(400);
        }
    }


    async obterUltimasVagas(req:Request, res:Response){
        let ultimasVagas = await vagaRepository.obterUltimasVagas();
        return res.status(200).json(ultimasVagas);
    }

    async obterVagasRespondidas(req:Request, res:Response){
        let id_candidato = req.userId;
        let vagasRespondidas = await vagaRepository.obterVagasRespondidas(id_candidato);
        return res.status(200).json(vagasRespondidas);
    }
}

function converteData(dataString:string):Date{
    let dataSplit = dataString.split('-');
    return new Date(+dataSplit[0],+dataSplit[1]-1,+dataSplit[2]);
}

export default new vagaController();