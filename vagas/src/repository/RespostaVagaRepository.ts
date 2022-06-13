
import { RespostaVaga } from "../models/RespostaVaga"
import { RespostaVagaModel } from '../database/models/RespostaVagaModel';
import { UsuarioModel } from "../database/models/UsuarioModel";
import { Candidato } from "../models/Candidato";
import { CompetenciaModel } from "../database/models/CompetenciaModel";
import { RespostaCompetenciaModel } from "../database/models/RespostaCompetenciaModel";
import { VagaModel } from "../database/models/VagaModel";
import { Vaga } from "../models/Vaga";
import { RespostaCompetencia } from "../models/RespostaCompetencia";
import { Competencia } from "../models/CompetenciaVaga";

let respostas = Array<RespostaVaga>();

export class RespostaVagaRepository{

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

    async obterItem(id: number): Promise<RespostaVaga | undefined> {
        return respostas.find(v => v.id == id);
    }
    
    async obterRespostasVaga(id_vaga:number){
        let respostas = await RespostaVagaModel.findAll({
            // logging:true,
            where:{
                id_vaga: id_vaga
            },
            include:[
                {
                    model: UsuarioModel,
                    required: true,
                },
                {
                    model: VagaModel,
                    required: true,
                    include:[
                        {
                            model: CompetenciaModel,
                            required: true,
                        },
                        
                    ]
                },
                {
                    model:RespostaCompetenciaModel,
                    required:true,
                }
            ]
        }).then(respostasVaga =>{
            return respostasVaga.map(r =>{
                let usuario = r.getDataValue('Usuario');
                let candidato = new Candidato(usuario.email,'',usuario.CPF);
                candidato.id = usuario.id;
                candidato.nome = usuario.nome;
                candidato.CPF = usuario.CPF;
                candidato.cidade = usuario.cidade;
                candidato.UF = usuario.UF;
                candidato.telefone = usuario.telefone;
                candidato.endereco = usuario.endereco;
                candidato.instagram = usuario.instagram;
                candidato.endereco = usuario.endereco;
                candidato.linkedin = usuario.linkedin;

                let vaga = r.getDataValue('Vaga');
                let respostasCompetencias = r.getDataValue('RespostasCompetencias');
                let competencias = vaga.getDataValue('Competencias');

                let resposta = new RespostaVaga(r.getDataValue('id_usuario'),r.getDataValue('id_vaga'));
                resposta.id = r.getDataValue('id');
                resposta.candidato = candidato;
                resposta.vaga = new Vaga(vaga.descricao,vaga.dataInicio,vaga.data_validade,vaga.area_atuacao,vaga.forma_contratacao);
                for (const comp of competencias) {
                    let cp = new Competencia(comp.getDataValue('nome'),comp.getDataValue('descricao'),comp.getDataValue('perfil'),comp.getDataValue('peso'));
                    cp.id = comp.getDataValue('id');
                    
                    let respostacp = respostasCompetencias.find((rs:any) => rs.id_competencia == cp.id);
                    let rcp = new RespostaCompetencia(respostacp.getDataValue('id_resposta'),respostacp.getDataValue('id_competencia'),respostacp.getDataValue('resposta'));
                    rcp.id = respostacp.getDataValue('id');
                    cp.resposta_competencia = rcp;
                    
                    resposta.vaga.competencias.push(cp);
                }

                return resposta;
            })
        })

        for (const resposta of respostas) {
            await resposta.obterRanking();
        }
        return respostas;

    }
    
    async obterRespostasVagaCandidato(id_vaga:number,id_usuario:number){
        let respostas = await RespostaVagaModel.findAll({
            logging:true,
            where:{
                id_vaga: id_vaga
            },
            include:[
                {
                    model: UsuarioModel,
                    required: true,
                    where:{
                        id:id_usuario
                    }
                },
                {
                    model: VagaModel,
                    required: true,
                    include:[
                        {
                            model: CompetenciaModel,
                            required: true,
                        },
                        
                    ]
                },
                {
                    model:RespostaCompetenciaModel,
                    required:true,
                }
            ]
        }).then(respostasVaga =>{
            return respostasVaga.map(r =>{
                let usuario = r.getDataValue('Usuario');
                let candidato = new Candidato(usuario.email,'',usuario.CPF);
                candidato.id = usuario.id;
                candidato.nome = usuario.nome;
                candidato.CPF = usuario.CPF;
                candidato.cidade = usuario.cidade;
                candidato.UF = usuario.UF;
                candidato.telefone = usuario.telefone;
                candidato.endereco = usuario.endereco;
                candidato.instagram = usuario.instagram;
                candidato.endereco = usuario.endereco;
                candidato.linkedin = usuario.linkedin;

                let vaga = r.getDataValue('Vaga');
                let respostasCompetencias = r.getDataValue('RespostasCompetencias');
                let competencias = vaga.getDataValue('Competencias');

                let resposta = new RespostaVaga(r.getDataValue('id_usuario'),r.getDataValue('id_vaga'));
                resposta.id = r.getDataValue('id');
                resposta.candidato = candidato;
                resposta.vaga = new Vaga(vaga.descricao,vaga.dataInicio,vaga.data_validade,vaga.area_atuacao,vaga.forma_contratacao);
                for (const comp of competencias) {
                    let cp = new Competencia(comp.getDataValue('nome'),comp.getDataValue('descricao'),comp.getDataValue('perfil'),comp.getDataValue('peso'));
                    cp.id = comp.getDataValue('id');
                    
                    let respostacp = respostasCompetencias.find((rs:any) => rs.id_competencia == cp.id);
                    let rcp = new RespostaCompetencia(respostacp.getDataValue('id_resposta'),respostacp.getDataValue('id_competencia'),respostacp.getDataValue('resposta'));
                    rcp.id = respostacp.getDataValue('id');
                    cp.resposta_competencia = rcp;
                    
                    resposta.vaga.competencias.push(cp);
                }

                return resposta;
            })
        })

        for (const resposta of respostas) {
            await resposta.obterRanking();
        }
        return respostas;

    }
    
}