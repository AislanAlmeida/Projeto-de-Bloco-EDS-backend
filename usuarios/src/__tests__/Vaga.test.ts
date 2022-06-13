import { AreasAtuacao } from "../models/AreasAtuacao"
import { Competencia } from "../models/CompetenciaVaga"
import { FormasContratacao } from "../models/FormasContratacao"
import { RespostaCompetencia } from "../models/RespostaCompetencia"
import { RespostaVaga } from "../models/RespostaVaga"
import { Vaga } from "../models/Vaga"

describe('Testando criação de uma vaga', () =>{
    const vaga = new Vaga('descricao',new Date(),new Date(),AreasAtuacao.BancoDeDados,FormasContratacao.CLT);
    vaga.UF = 'RJ';
    vaga.cargo = 'analista';
    
    const c1 = new Competencia('c1',4,5);
    const c2 = new Competencia('c2',4,3);
    const c3 = new Competencia('c3',1,1);
    const c4 = new Competencia('c3',4,2);

    vaga.adicionarCompetencia(c1);
    vaga.adicionarCompetencia(c2);
    vaga.adicionarCompetencia(c3);
    vaga.adicionarCompetencia(c4);
    
    test('Calculando perfil de oportunidade', () =>{
        expect(vaga.obterPerfilOportunidade()).toBe('3.73');
    })

})