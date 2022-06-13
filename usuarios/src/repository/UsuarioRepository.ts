import { UsuarioModel } from "../database/models/UsuarioModel";
import { IRepository } from "./IRepository";
import { Candidato } from "../models/Candidato";
import { Empresa } from "../models/Empresa";
import { Usuario } from "../models/Usuario";
import {criarUsuarioFirebase} from "../services/firebaseService";

export class UsuarioRepository{

    async criarUsuarioAdmin(): Promise<Usuario | undefined | string>{

        let usuarioFirebase = await criarUsuarioFirebase('administrador@venturarh.com', 'minhaSenha');
        if(usuarioFirebase.uid){
            const usuario = await UsuarioModel.create({
                nome:'Administrador',
                endereco:'Endereço do VenturaRH',
                telefone:'28999220334',
                cidade:'Bom Jesus do Itabapoana',
                UF:'RJ',
                email:'administrador@venturarh.com',
                role:'admin',
                CNPJ: '123123123123',
                razaoSocial: 'Ventura RH',
                status:'ativa',
                firebaseUID:usuarioFirebase.uid

            }).catch(err =>{
                console.log('Não foi possível criar usuário Administrador');
                return err;
            })
            
            return usuario;
        }else{
            return usuarioFirebase;
        }
    }
    
    async criar(objeto: Empresa | Candidato): Promise<Usuario | undefined | string> {
        
        let usuarioFirebase = await criarUsuarioFirebase(objeto.email, objeto.senha);
        if(usuarioFirebase.uid){
            objeto.firebaseUID = usuarioFirebase.uid;
            const usuario = await UsuarioModel.create({
                nome:objeto.nome,
                endereco:objeto.endereco,
                telefone:objeto.telefone,
                cidade:objeto.cidade,
                UF:objeto.UF,
                email:objeto.email,
                role:objeto.role,
                CNPJ: objeto instanceof Empresa ? objeto.CNPJ : '',
                razaoSocial: objeto instanceof Empresa ? objeto.razaoSocial : '',
                CPF: objeto instanceof Candidato ? objeto.CPF : '',
                status:objeto.status,
                firebaseUID:objeto.firebaseUID
            }).catch(err => {
                console.log('Erro na criação do usuario ==>', err);
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
        // console.log(id,item);
        let usuario = await UsuarioModel.update({
            'nome': item.nome,
            'endereco': item.endereco,
            'telefone': item.telefone,
            'cidade': item.cidade,
            'UF': item.UF,
            'linkedin': item.linkedin,
            'instagram': item.instagram
        },{where:{id}}).catch(err =>{
            console.log(err);
        });
        console.log('Atualizando usuario');
        return usuario ? true : false;
    }

    async bloquearUsuario(id: number,motivoBloqueio: string){
        let usuario = await UsuarioModel.update({
            status:'bloqueado',
            motivoBloqueio: motivoBloqueio
        },{where:{id}}).catch(err =>{
            console.log(err);
        })
        console.log('Usuario Bloqueado');
        return usuario ? true : false;
    }

    async desbloquearUsuario(id: number){
        let usuario = await UsuarioModel.update({
            status:'ativo',
            motivoBloqueio:''
        },{where:{id}}).catch(err =>{
            console.log(err);
        })
        console.log('Usuario Desbloqueado');
        return usuario ? true : false;
    }
    
    async excluir(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async obterLista(): Promise<Usuario[]> {
        throw new Error("Method not implemented.");
    }
    async obterItem(id: number): Promise <any> {
        let usuario = await UsuarioModel.findByPk(id)
        .catch(err =>{
            console.log(err);
        })
        return usuario;
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