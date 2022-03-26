import { Candidato } from "../models/Candidato";
import { Empresa } from "../models/Empresa";

import { UsuarioRepository } from "../repository/UsuarioRepository";
import {Request,Response} from 'express';
import {UsuarioModel} from '../database/models/UsuarioModel'

let repository = new UsuarioRepository();

class usuarioController{
    
    async incluirUsuario(req:Request,res:Response){
        const {email, nome, senha,CNPJ,CPF,razaoSocial} = req.body;
        let role = '';
        if(CPF != '' && CNPJ == ''){
            role = 'candidato';
        }else if(CPF == '' && CNPJ != ''){
            role = 'empresa';
        }else{
            return res.sendStatus(400);
        }

        if(role == 'empresa'){
            let usuario = new Empresa(email,senha,CNPJ,razaoSocial);
            usuario.nome = nome;
            const user = await repository.criar(usuario);
            console.log('user ==> ', user);
            if(user){

                return res.status(201).json(user);
            }else{
                return res.status(400).json({mensagem:'Usuário já cadastrado com este email'});
            }
            
        }else if(role == 'candidato'){
            let usuario = new Candidato(email,senha,CPF);
            usuario.nome = nome;
            const user = await repository.criar(usuario);
            console.log(user);
            if(user){
                if(typeof(user) == 'string'){

                    return res.status(400).json({mensagem: user});
                }else{

                    return res.status(201).json(user);
                }
            }else{
                return res.status(400).json({mensagem:'Usuário já cadastrado com este email'});
            }
            
        }else{
            return res.sendStatus(400);
        }
        // criarUsuarioFirebase(email,senha);
    }
    
    async obterUsuarios(req:Request,res:Response){
        let role = req.userRole;
        //APENAS EMPRESAS CONSEGUEM CONSULTAR CANDIDATOS
        if(role == 'empresa'){
            const usuarios = await UsuarioModel.findAll({
                attributes:['id','nome','endereco','telefone','email'],
                where:{
                    status:'ativo',
                    role:'candidato'
                }
            });
            return usuarios.length > 0 ? res.status(200).json(usuarios) : res.sendStatus(204);
        }else{
            return res.sendStatus(403);
        }
    }

    async obterUsuarioPorEmail(req:Request,res:Response){
        const { emailUsuario }= req.params;
        const usuario = await UsuarioModel.findOne({
            where:{
                email: emailUsuario, 
            }
        })
        return usuario ? res.status(200).json(usuario) : res.sendStatus(204); 
    }
    
    async atualizarUsuario(req:Request,res:Response){}
    
    async excluirUsuario(req:Request,res:Response){
        const id = +req.params.id;
        const user = await UsuarioModel.destroy({
            where:{
                id:id
            }
        });
        return res.sendStatus(204);
    }
}

export default new usuarioController();