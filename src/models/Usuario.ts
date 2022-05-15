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
    cidade: string = '';
    UF: string = '';
    telefone: string = '';
    status: string = 'ativo';
    email: string = '';
    role: roles;
    CPF: string = '';
    CNPJ: string = '';
    razaoSocial: string = '';
    senha: string = '';
    dataModificacao: Date = new Date();
    firebaseUID: string = '';
    instagram: string = '';
    linkedin: string = '';
    motivoBloqueio: string = '';

    constructor(email:string,senha:string,role:roles) {
        this.email = email;
        this.senha = senha;
        this.role = role;
    }
}
