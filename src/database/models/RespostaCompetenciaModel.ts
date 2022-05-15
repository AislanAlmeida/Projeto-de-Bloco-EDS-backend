import { DataTypes } from "sequelize";
import { sequelize } from "../connection";
import { CompetenciaModel } from "./CompetenciaModel";
import { RespostaVagaModel } from "./RespostaVagaModel";

export const RespostaCompetenciaModel = sequelize.define('RespostasCompetencias',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    resposta:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    id_competencia:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: CompetenciaModel,
            key: 'id'
        }
    },
    id_resposta:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: RespostaVagaModel,
            key: 'id'
        }
    }
})
CompetenciaModel.hasMany(RespostaCompetenciaModel,{foreignKey:'id_competencia'})
RespostaCompetenciaModel.belongsTo(CompetenciaModel,{foreignKey:'id_competencia'})
RespostaVagaModel.hasMany(RespostaCompetenciaModel,{foreignKey:'id_resposta'})
RespostaCompetenciaModel.belongsTo(RespostaVagaModel,{foreignKey:'id_resposta'})