import { roles, Usuario } from "./Usuario";
export class Empresa extends Usuario {
    CNPJ: string;
    razaoSocial: string;

    constructor(email:string,senha:string,CNPJ:string,razaoSocial:string) {
        super(email,senha,roles.Empresa);
        this.CNPJ = CNPJ;
        this.razaoSocial = razaoSocial;
    }

}