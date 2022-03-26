export class Competencia{
    ID: number = 0;
    IDVaga: number = 0;
    descricao: string;
    perfil: number;
    peso: number;

    constructor(descricao:string,perfil:number,peso:number){
        this.descricao = descricao;
        this.perfil = perfil;
        this.peso = peso;
    }   
}