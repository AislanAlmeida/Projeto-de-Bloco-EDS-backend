import { Usuario,roles } from "./Usuario";
export class Candidato extends Usuario {
    CPF: string;
    instagram: string = '';
    linkedin: string = '';

    constructor(email:string,senha:string,CPF:string) {
        super(email,senha,roles.Candidato);
        this.CPF = CPF;
    }

}