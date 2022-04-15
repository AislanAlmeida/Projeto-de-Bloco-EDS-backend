import { Request,Response } from "express";
import { CompetenciaRepository } from "../repository/CompetenciaRepository";

let repoository = new CompetenciaRepository();
class competenciaController{
    async obterCompetencias(req:Request,res:Response){
        let idVaga = req.params.idVaga;
        if(idVaga){
            let competencias = await repoository.obterCompetenciasVaga(+idVaga);
            res.status(200).json(competencias);
        }
    }
}

export default new competenciaController();