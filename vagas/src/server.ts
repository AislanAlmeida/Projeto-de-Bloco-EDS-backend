require('dotenv').config();

import express, {json,urlencoded} from 'express';

import { sequelize } from './database/connection';
import { r_vaga } from './routes/r_vaga';
import { r_competencia } from './routes/r_competencia';
import { r_respostaVaga } from './routes/r_respostaVaga';
import cors from 'cors';
import morgan from 'morgan';

const PORT = process.env.PORT || 3002;

let app = express();

//Habilita a aplicação com bodyParser
app.use(json());
app.use(urlencoded({extended:true}));
app.use(cors());
app.use(morgan('tiny'));

app.use('/vagas',r_vaga);
app.use('/competencias',r_competencia);
app.use('/responder',r_respostaVaga);
//   _____ ___________ _   _ _____ _____ _____   _   _  ___  _____   ___   _____ 
//  /  ___|  ___| ___ \ | | |_   _/  __ \  _  | | | | |/ _ \|  __ \ / _ \ /  ___|
//  \ `--.| |__ | |_/ / | | | | | | /  \/ | | | | | | / /_\ \ |  \// /_\ \\ `--. 
//   `--. \  __||    /| | | | | | | |   | | | | | | | |  _  | | __ |  _  | `--. \
//  /\__/ / |___| |\ \\ \_/ /_| |_| \__/\ \_/ / \ \_/ / | | | |_\ \| | | |/\__/ /
//  \____/\____/\_| \_|\___/ \___/ \____/\___/   \___/\_| |_/\____/\_| |_/\____/ 
//                                                                               
// 
app.listen(PORT,async () => {

    await sequelize.sync({alter:true});
    
    console.log(`${imprimeBanner()  } \n API funcionando na porta: ${PORT}`)
});

function imprimeBanner(){
    return  `
    ##############################    
    # Serviço Vagas - Ventura RH #
    ##############################

    Aluno: Aislan Almeida 
    Instituto Infnet ${new Date().getFullYear()}
    -------------------------------`;
}