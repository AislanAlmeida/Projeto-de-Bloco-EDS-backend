import { Competencia } from "../models/CompetenciaVaga";
import { CompetenciaModel } from "../database/models/CompetenciaModel";
// let competencias: Array<Competencia> = Array<Competencia>();

//implementar interface
export class CompetenciaRepository {
    async criar(item: Competencia): Promise<Competencia|undefined> {
        let newItem = new Competencia(item.nome,item.descricao,item.perfil,item.peso);
        newItem.id_vaga = item.id_vaga;
 
        let competencia = await CompetenciaModel.create({
            id_vaga: item.id_vaga,
            descricao: item.descricao,
            perfil: item.perfil,
            peso: item.peso

        }).catch(err =>{
            console.log(err);
        })

        if(competencia){
            return item;
        }

    }

    async incluirVarias(itens: Competencia[]):Promise<any>{
        let competencias = await CompetenciaModel.bulkCreate(itens.map(i => {
            return {
                id_vaga: i.id_vaga,
                nome: i.nome,
                descricao: i.descricao,
                perfil: i.perfil,
                peso: i.peso
            }
        }));
        return competencias;
    }
    
    atualizar(id: number, item: Competencia): boolean {
        throw new Error("Method not implemented.");
    }
    
    excluir(id: number): boolean {
        throw new Error("Method not implemented."); 
    }
            
    obterLista(): Competencia[] {
        throw new Error("Method not implemented.");

    }
    
    async obterItem(id: number): Promise<Competencia | undefined> {
        let competencia = await CompetenciaModel.findOne({
            where:{
                id:id
            }
        })
        if(competencia){
            let c = new Competencia(competencia.getDataValue('nome'),competencia.getDataValue('descricao'),competencia.getDataValue('perfil'),competencia.getDataValue('peso'));
            c.id = competencia.getDataValue('id');
            return c;
        }
        else{
            return undefined;
        }
        // return competencias.find(c => c.ID == id);
    }

    async obterCompetenciasVaga(idVaga: number){
        let competencias = await CompetenciaModel.findAll({
            attributes:['id','nome','descricao','peso','perfil'],
            where:{
                id_vaga: idVaga
            }
        }).catch(err => {
            console.log(err);
        })
        
        return competencias;
    }
}