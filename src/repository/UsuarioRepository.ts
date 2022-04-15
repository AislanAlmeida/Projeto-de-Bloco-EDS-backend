import { UsuarioModel } from "../database/models/UsuarioModel";
import { IRepository } from "./IRepository";
import { Candidato } from "../models/Candidato";
import { Empresa } from "../models/Empresa";
import { Usuario } from "../models/Usuario";
import {criarUsuarioFirebase} from "../services/firebaseService";

export class UsuarioRepository{
    
    async criar(objeto: Empresa | Candidato): Promise<Usuario | undefined | string> {
        
        let usuarioFirebase = await criarUsuarioFirebase(objeto.email, objeto.senha);
        if(usuarioFirebase.uid){
            objeto.firebaseUID = usuarioFirebase.uid;
            const usuario = await UsuarioModel.create({
                nome:objeto.nome,
                endereco:objeto.endereco,
                telefone:objeto.telefone,
                email:objeto.email,
                role:objeto.role,
                CNPJ: objeto instanceof Empresa ? objeto.CNPJ : '',
                razaoSocial: objeto instanceof Empresa ? objeto.razaoSocial : '',
                CPF: objeto instanceof Candidato ? objeto.CPF : '',
                status:objeto.status,
                firebaseUID:objeto.firebaseUID
            }).catch(err => {
                console.log('Erro aqui < ==', err);
                return err;
            });
            if(usuario){
                return objeto;
            }else{
                return usuario;
            }
        }else{
            return usuarioFirebase;
        }           
    }
    async atualizar(id: number, item: Usuario): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async excluir(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async obterLista(): Promise<Usuario[]> {
        throw new Error("Method not implemented.");
    }
    async obterItem(id: number): Promise <Usuario | undefined> {
        throw new Error("Method not implemented.");
    }

    async obterUsuarioPorIdFirebase(idFirebase: string){
        let usuarioFirebase = await UsuarioModel.findOne({
            where:{
                firebaseUID:idFirebase
            }
        });
        
        return usuarioFirebase?.toJSON() as Candidato | Empresa;
    }

    async obterNomeUsuario(id: number):Promise<string>{
        let nome = await UsuarioModel.findOne({
            attributes:['nome'],
            where:{
                id:id
            }
        })
        return nome?.getDataValue('nome');
    }

}