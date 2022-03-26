import { roles } from "../models/Usuario";

export interface IUsuario{
    id:number;
    nome: string;
    endereco: string;
    telefone: string;
    email: string;
    senha:string;
    role: roles;
    status: string;
    dataModificacao: Date;
}