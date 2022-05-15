require('dotenv').config();

import express, {json,urlencoded} from 'express';
import { r_login } from './routes/r_login';
import { r_usuario } from './routes/r_usuario';
import { sequelize } from './database/connection';
import { r_vaga } from './routes/r_vaga';
import cors from 'cors';
import { r_competencia } from './routes/r_competencia';
import { r_respostaVaga } from './routes/r_respostaVaga';
import {schedule} from 'node-cron';
import { CronjobService } from './services/cronjobsService';
import { UsuarioRepository } from './repository/UsuarioRepository';

var cron = require('node-cron'); 
cron.schedule('* * * * *', () => {
  CronjobService.encerrarVagasVencidas();
});

const PORT = process.env.PORT || 3000;

let app = express();

//Habilita a aplicação com bodyParser
app.use(json());
app.use(urlencoded({extended:true}));
app.use(cors());

app.use('/login',r_login);
app.use('/usuarios',r_usuario);
app.use('/vagas',r_vaga);
app.use('/competencias',r_competencia);
app.use('/responder',r_respostaVaga);

app.listen(PORT,async () => {
    // await sequelize.sync({force:true});
    // let admin = new UsuarioRepository();
    // await admin.criarUsuarioAdmin();

    await sequelize.sync({alter:true});
    
    console.log(`API funcionando na porta: ${PORT}`)
});