import { DataTypes } from "sequelize";
import { sequelize } from "../connection";
export const UsuarioModel = sequelize.define('Usuarios',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    endereco:{
        type: DataTypes.STRING,
    },
    telefone:{
        type: DataTypes.STRING,
    },
    status:{
        type: DataTypes.STRING,
        defaultValue: 'A',
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    role:{
        type: DataTypes.STRING,
    },
    dataModificacao:{
        type: DataTypes.DATE,
        defaultValue: new Date(),
    },
    firebaseUID:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    instagram:{
        type: DataTypes.STRING
    },
    linkedin:{
        type:DataTypes.STRING
    }
})