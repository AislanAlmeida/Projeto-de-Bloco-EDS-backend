import { Candidato } from "../models/Candidato";
import { Empresa } from "../models/Empresa";

import { UsuarioRepository } from "../repository/UsuarioRepository";
import {Request,Response} from 'express';
import {UsuarioModel} from '../database/models/UsuarioModel'
import { Usuario } from "../models/Usuario";
import {Op} from "sequelize";

let repository = new UsuarioRepository();

class usuarioController{
    
    async incluirUsuario(req:Request,res:Response){
        const {email, nome, senha,CNPJ,CPF,razaoSocial,cidade,UF,telefone,endereco} = req.body;
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
            usuario.endereco = endereco;
            usuario.telefone = telefone;
            usuario.cidade = cidade;
            usuario.UF = UF;
            const user = await repository.criar(usuario);
            console.log('user ==> ', user);
            if(user){
                if(typeof(user) == 'string'){

                    return res.status(400).json({mensagem: user});
                }else{

                    return res.status(201).json(user);
                }
            }else{
                return res.status(400).json({mensagem:'Usuário já cadastrado com este email'});
            }
            
        }else if(role == 'candidato'){
            let usuario = new Candidato(email,senha,CPF);
            usuario.nome = nome;
            usuario.endereco = endereco;
            usuario.telefone = telefone;
            usuario.cidade = cidade;
            usuario.UF = UF;
            
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
        }else if(role == 'admin'){
            const usuarios = await UsuarioModel.findAll({
                where:{
                    role:{[Op.not]:'admin'}
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
    
    async obterUsuarioPorId(req:Request, res:Response){
        const idUser = req.userId;
        const id = req.params.id;
        console.log(idUser,id);
        if(id && +id === idUser){
            const usuario = await repository.obterItem(+id);
            return res.status(200).json(usuario);
        }else{
            return res.sendStatus(401);
        }
    }

    async atualizarUsuario(req:Request,res:Response){
        const {id,email, nome, senha,CNPJ,CPF,razaoSocial,cidade,UF,telefone,endereco,linkedin,instagram} = req.body;
        console.log(linkedin,instagram);
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
            usuario.id = id;
            usuario.nome = nome;
            usuario.endereco = endereco;
            usuario.telefone = telefone;
            usuario.cidade = cidade;
            usuario.UF = UF;
            usuario.linkedin = linkedin;
            usuario.instagram = instagram;

            const user = await repository.atualizar(usuario.id,usuario);

            if(user){
                return res.status(201).json(user);
            }else{
                return res.status(400).json({mensagem:'Usuário já cadastrado com este email'});
            }
            
        }else if(role == 'candidato'){
            let usuario = new Candidato(email,senha,CPF);
            usuario.id = id;
            usuario.nome = nome;
            usuario.endereco = endereco;
            usuario.telefone = telefone;
            usuario.cidade = cidade;
            usuario.UF = UF;
            usuario.linkedin = linkedin;
            usuario.instagram = instagram;

            const user = await repository.atualizar(usuario.id,usuario);
            if(user){
                if(typeof(user) == 'string'){
                    return res.status(400).json({mensagem: user});
                }else{
                    return res.status(200).json(user);
                }
            }else{
                return res.status(400).json({mensagem:'Usuário já cadastrado com este email'});
            }
            
        }else{
            return res.sendStatus(400);
        }

    }

    async excluirUsuario(req:Request,res:Response){
        const id = +req.params.id;
        const user = await UsuarioModel.destroy({
            where:{
                id:id
            }
        });
        return res.sendStatus(204);
    }

    async bloquearUsuario(req:Request, res:Response){
        const id = +req.params.id;
        const motivoBloqueio = req.body.motivoBloqueio;
        const user = await repository.bloquearUsuario(id,motivoBloqueio);
        return res.sendStatus(200);
    }

    async desbloquearUsuario(req:Request, res:Response){
        const id = +req.params.id;
        const user = await repository.desbloquearUsuario(id);
        return res.sendStatus(200);
    }
}

export default new usuarioController();