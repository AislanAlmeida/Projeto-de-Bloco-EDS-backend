import { IUsuario } from "../interfaces/IUsuario";
import {Model} from 'sequelize';

export enum roles{
    Empresa = 'empresa',
    Candidato = 'candidato',
    Administrador = 'adm'
}

export abstract class Usuario implements IUsuario{
    id: number = 0;
    nome: string = '';
    endereco: string = '';
    telefone: string = '';
    email: string = '';
    senha: string = '';
    role: roles;
    status: string = 'ativo';
    dataModificacao: Date = new Date();
    firebaseUID: string = '';

    constructor(email:string,senha:string,role:roles) {
        
        this.email = email;
        this.senha = senha;
        this.role = role;
    }
}
