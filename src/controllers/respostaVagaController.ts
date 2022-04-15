import { Request, Response } from "express";
import { Competencia } from "../models/CompetenciaVaga";
import { RespostaCompetencia } from "../models/RespostaCompetencia";
import { RespostaVaga } from "../models/RespostaVaga";

import { RespostaCompetenciaRepository } from "../repository/RespostaCompetenciaRepository";
import { RespostaVagaRepository } from "../repository/RespostaVagaRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { VagaRepository } from "../repository/VagaRepository";

let repositoryVaga = new RespostaVagaRepository();
let repositoryCompetencia = new RespostaCompetenciaRepository();
let repositoryUsuario = new UsuarioRepository();

class respostaVagaController{
    
    async responderVaga(req:Request,res:Response){
        let id_usuario = req.userId;
        let id_vaga:number = req.body.id_vaga;
        let competencias:Array<RespostaCompetencia> = req.body.competencias;
        
        let respostaVaga = new RespostaVaga(id_usuario,id_vaga);
        
        let vagaDB = await repositoryVaga.criar(respostaVaga);
        console.log(vagaDB);

        if(vagaDB){
            for(const competencia of competencias){
                competencia.id_resposta = vagaDB.id;
                competencia.id_competencia = competencia.id;
                console.log(competencia);
                let resposta = await repositoryCompetencia.criar(competencia);
                console.log(resposta);
                // let respostaCompetencia = new RespostaCompetencia(respostaVaga.ID,competencia.id_competencia,competencia.resposta);
            }
            res.status(200).json(vagaDB);
        }else{
            res.status(400).send('Resposta de vaga faltando parâmetros importantes');
        }
        

        
    }
    async obterRespostasVaga(req:Request, res:Response){
        let {id_vaga} = req.params;
        let respostas = await repositoryVaga.obterRespostasVaga(+id_vaga);
        if(respostas.length > 0){
            for (const resposta of respostas) {
               resposta.nome_candidato = await repositoryUsuario.obterNomeUsuario(resposta.id_candidato); 
            }
        }
        respostas.length > 0 ? res.status(200).json(respostas) : res.sendStatus(204);
    }
}

export default new respostaVagaController();