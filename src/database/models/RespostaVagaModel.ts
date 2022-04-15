import { DataTypes } from "sequelize";
import { sequelize } from "../connection";
import { UsuarioModel } from "./UsuarioModel";
import { VagaModel } from "./VagaModel";

export const RespostaVagaModel = sequelize.define('RespostasVagas',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: UsuarioModel,
            key: 'id'
        }
    },
    id_vaga:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: VagaModel,
            key: 'id',
        }
    },
    ranking:{
        type: DataTypes.DECIMAL,
    },
    data_reposta:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    }
})