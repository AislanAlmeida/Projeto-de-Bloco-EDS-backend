require('dotenv').config();

import express, {json,urlencoded} from 'express';
import { r_login } from './routes/r_login';
import { r_usuario } from './routes/r_usuario';
import { sequelize } from './database/connection';
import { r_vaga } from './routes/r_vaga';
import cors from 'cors';
const PORT = process.env.PORT || 3000;

let app = express();

//Habilita a aplicação com bodyParser
app.use(json());
app.use(urlencoded({extended:true}));
app.use(cors());

app.use('/login',r_login);
app.use('/usuarios',r_usuario);
app.use('/vagas',r_vaga);

app.listen(PORT,async () => {
    // await sequelize.sync({force:true});
    await sequelize.sync();
    console.log(`API funcionando na porta: ${PORT}`)
});