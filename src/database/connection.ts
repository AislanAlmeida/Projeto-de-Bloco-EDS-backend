//MODELO SEQUELIZE
import { Sequelize } from 'sequelize';
export const sequelize = new Sequelize('ventura','root','infnet2022',{
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
})
