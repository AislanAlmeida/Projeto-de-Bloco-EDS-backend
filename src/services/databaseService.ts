//MODELO SEQUELIZE
import { Sequelize } from 'sequelize';
export const sequelize = new Sequelize('ventura','root','infnet2022',{
    host: 'localhost',
    dialect: 'mysql'
})
//MODELO PADRÃO MYSQL
// import mysql from 'mysql2';

// export const connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'infnet2022',
//   database : 'ventura'
// });
 
// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }
 
//   console.log('connected as id ' + connection.threadId);
// });