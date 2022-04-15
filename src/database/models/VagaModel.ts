import { DataTypes } from "sequelize";
import { sequelize } from "../connection";
import { UsuarioModel } from "./UsuarioModel";
export const VagaModel = sequelize.define('Vagas',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:UsuarioModel,
            key:'id'
        },
    },
    cargo:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    cidade:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    UF:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    forma_contratacao:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    descricao:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    dataModificacao:{
        type: DataTypes.DATE,
        defaultValue: new Date(),
        allowNull:false,
    },
    data_validade:{
        type: DataTypes.DATE,
        allowNull:false,
    }
})