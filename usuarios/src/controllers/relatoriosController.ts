import { Request,Response } from "express";
import { RelatorioService } from "../services/relatorioService"

class Relatorio{
    quantidade_vagas_criadas:number = 0;
    quantidade_vagas_respondidas:number = 0;
    quantidade_usuarios_inscritos:any;

    quantidade_vagas_criadas_hoje:number = 0;
    quantidade_vagas_respondidas_hoje:number = 0;
    quantidade_usuarios_inscritos_hoje:any;
}
class RelatoriosController{
    async obterRelatorios(req:Request,res:Response){
        let relatorio = new Relatorio();

        relatorio.quantidade_vagas_criadas = await RelatorioService.obterQuantidadeVagasCriadas();
        relatorio.quantidade_vagas_criadas_hoje = await RelatorioService.obterQuantidadeVagasCriadas(true);
        relatorio.quantidade_usuarios_inscritos = await RelatorioService.obterQuantidadeUsuariosInscritos();
        relatorio.quantidade_usuarios_inscritos_hoje = await RelatorioService.obterQuantidadeUsuariosInscritos(true);
        relatorio.quantidade_vagas_respondidas = await RelatorioService.obterQuantidadeVagasRespondidas();
        relatorio.quantidade_vagas_respondidas_hoje = await RelatorioService.obterQuantidadeVagasRespondidas(true);

        res.status(200).json(relatorio);

    }
}

export default new RelatoriosController();