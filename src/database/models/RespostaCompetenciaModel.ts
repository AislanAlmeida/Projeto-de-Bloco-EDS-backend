import { DataTypes } from "sequelize";
import { sequelize } from "../connection";
import { CompetenciaModel } from "./CompetenciaModel";

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
        //incluir a referencia da resposta da vaga
    }
})