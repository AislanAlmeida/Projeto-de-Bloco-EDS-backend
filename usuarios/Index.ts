import {Empresa} from './src/models/Empresa';
import {Candidato} from './src/models/Candidato';
import {Vaga} from './src/models/Vaga';
import { AreasAtuacao } from './src/models/AreasAtuacao';
import { FormasContratacao } from './src/models/FormasContratacao';
import { Competencia } from './src/models/CompetenciaVaga';
import { RespostaVaga} from './src/models/RespostaVaga'
import { RespostaCompetencia} from './src/models/RespostaCompetencia'
import { Conhecimentos } from './src/models/Conhecimentos';
import {VagaRepository} from './src/repository/VagaRepository'
import { CompetenciaRepository } from './src/repository/CompetenciaRepository';
import { RespostaVagaRepository} from './src/repository/RespostaVagaRepository';
import { UsuarioRepository} from './src/repository/UsuarioRepository';
import { RespostaCompetenciaRepository} from './src/repository/RespostaCompetenciaRepository';

let usuarioRepository = new UsuarioRepository();
let empresa = usuarioRepository.criar(new Empresa('email@empresa.com','123456','0000','minhaempresa'));
let candidato = usuarioRepository.criar(new Candidato('email@candidato.com','123','123123123'));
candidato?candidato.nome = "Josefino de Oliveira":'';
let candidato2 = usuarioRepository.criar(new Candidato('aislan.2msn@gmail.com','123','123123123'));
candidato2?candidato2.nome = "Aislan Almeida":'';

if(empresa){

    let vaga = new Vaga('Vaga Pika das Galáxia',new Date(),new Date(),AreasAtuacao.Desenvolvimento);
    vaga.formaContratacao = FormasContratacao.CLT;
    vaga.IDEmpresa = empresa.ID;
    
    let vaga2 = new Vaga('Vaga Pika das Galáxia CNPJ',new Date(),new Date(),AreasAtuacao.Gestão);
    vaga2.formaContratacao = FormasContratacao.CNPJ;
    vaga2.IDEmpresa = empresa.ID;
    
    let vagaRepository = new VagaRepository();
    vagaRepository.criar(vaga);
    vagaRepository.criar(vaga2);
    
    let c1 = new Competencia('JAVA',4,5);
    let c2 = new Competencia('INGLES',4,3);
    let c3 = new Competencia('EXCEL',1,1);
    let c4 = new Competencia('BANCO DE DADOS',4,2);
    
    vaga.adicionarCompetencia(c1);
    vaga.adicionarCompetencia(c2);
    vaga.adicionarCompetencia(c3);
    vaga.adicionarCompetencia(c4);
    
    vaga2.adicionarCompetencia(c1);
    
    console.log('###',c1,c2,c3,c4);
    if(candidato && candidato2){
    
        let respostaVaga1 = new RespostaVaga(candidato.ID,vaga.ID);
        respostaVaga1.dataResposta = new Date();
        
        let respostaVaga2= new RespostaVaga(candidato.ID,vaga2.ID);
        respostaVaga2.dataResposta = new Date();
        
        let respostaVaga3= new RespostaVaga(candidato2.ID,vaga.ID);
        respostaVaga3.dataResposta = new Date();
        
        
        let respostaVagaRepository = new RespostaVagaRepository();
        respostaVagaRepository.criar(respostaVaga1);
        respostaVagaRepository.criar(respostaVaga2);
        respostaVagaRepository.criar(respostaVaga3);
        
        let rc1 = new RespostaCompetencia(respostaVaga1.ID,vaga.competencias[0].ID,Conhecimentos.Excelente);
        let rc2 = new RespostaCompetencia(respostaVaga1.ID,vaga.competencias[1].ID,Conhecimentos.Bom);
        let rc3 = new RespostaCompetencia(respostaVaga1.ID,vaga.competencias[2].ID,Conhecimentos.Insuficiente);
        let rc4 = new RespostaCompetencia(respostaVaga1.ID,vaga.competencias[3].ID,Conhecimentos.Excelente);

        let rc5 = new RespostaCompetencia(respostaVaga2.ID,vaga2.competencias[0].ID,Conhecimentos.Excelente);
        
        let rc6 = new RespostaCompetencia(respostaVaga3.ID,vaga.competencias[0].ID,Conhecimentos.Excelente);
        let rc7 = new RespostaCompetencia(respostaVaga3.ID,vaga.competencias[1].ID,Conhecimentos.Excelente);
        let rc8 = new RespostaCompetencia(respostaVaga3.ID,vaga.competencias[2].ID,Conhecimentos.Excelente);
        let rc9 = new RespostaCompetencia(respostaVaga3.ID,vaga.competencias[3].ID,Conhecimentos.Excelente);
        
        let respostaCompetenciaRepository = new RespostaCompetenciaRepository();
        //candidato 1 vaga 1
        respostaCompetenciaRepository.criar(rc1)
        respostaCompetenciaRepository.criar(rc2)
        respostaCompetenciaRepository.criar(rc3)
        respostaCompetenciaRepository.criar(rc4)
        
        //candidato 1 vaga 2
        respostaCompetenciaRepository.criar(rc5)
        
        //candidato 2 vaga 1
        respostaCompetenciaRepository.criar(rc6)
        respostaCompetenciaRepository.criar(rc7)
        respostaCompetenciaRepository.criar(rc8)
        respostaCompetenciaRepository.criar(rc9)
        

        console.log('Todos Usuarios Criados');
        console.table(usuarioRepository.obterLista());

        console.log('Todas Competencias salvas');
        console.table(new CompetenciaRepository().obterLista());
        
        console.log('Todas Vagas salvas');
        console.table(new VagaRepository().obterLista());
        
        console.log('Todas Respostas Vagas');
        console.table(respostaVagaRepository.obterLista());
        
        console.log('Todas Respostas Competencias');
        console.table(respostaCompetenciaRepository.obterLista());
    }
}

