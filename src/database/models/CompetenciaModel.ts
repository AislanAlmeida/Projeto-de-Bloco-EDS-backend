import { DataTypes } from "sequelize";
import { sequelize } from "../connection";
import {VagaModel} from "./VagaModel";
export const CompetenciaModel = sequelize.define('Competencias',{
    id: {
        type:DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_vaga:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: VagaModel,
            key: 'id',
        }
    },
    descricao:{
        type: DataTypes.STRING,
        allowNull: false
    },
    perfil:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    peso:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})