import { VagaRepository } from "../repository/VagaRepository";

let vagaRepository = new VagaRepository();
export class CronjobService{
    static async encerrarVagasVencidas(){
        console.log(`⏰ Executando tarefas agendadas -- #Encerrar-vagas-vencidas\n`);
        
        let vagas_vencidas = await vagaRepository.expirarVagasVencidas();
        console.log(`Expirando vagas vencidas: ${vagas_vencidas} vagas alteradas`);
        
    }
    static avisarVagasVencendo(){

    }
}