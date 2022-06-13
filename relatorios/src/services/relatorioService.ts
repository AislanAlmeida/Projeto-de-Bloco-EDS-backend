import { VagaRepository } from "../repository/VagaRepository"

let vagaRepository = new VagaRepository();
export class RelatorioService{
    static async obterQuantidadeVagasCriadas(hoje:boolean=false):Promise<number>{
        let vagas_criadas = await vagaRepository.obterQuantidadeVagasCriadas(hoje);
        return vagas_criadas;
    }
    static async obterQuantidadeVagasRespondidas(hoje:boolean=false){
        let vagas_respondidas = await vagaRepository.obterQuantidadeVagasRespondidas(hoje);
        return vagas_respondidas;

    }
    static async obterQuantidadeUsuariosInscritos(hoje:boolean=false){
        let usuarios_inscritos = await vagaRepository.obterQuantidadeUsuariosInscritos(hoje);
        return usuarios_inscritos;
    }
}