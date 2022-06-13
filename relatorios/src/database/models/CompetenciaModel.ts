import { DataTypes } from "sequelize";
import { sequelize } from "../connection";
import { RespostaCompetenciaModel } from "./RespostaCompetenciaModel";
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
    nome:{
        type: DataTypes.STRING,
        allowNull: false
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
VagaModel.hasMany(CompetenciaModel,{foreignKey:'id_vaga'});
CompetenciaModel.belongsTo(VagaModel,{foreignKey:'id_vaga'});
// RespostaCompetenciaModel.hasMany(CompetenciaModel,{foreignKey:'id_competencia'})
