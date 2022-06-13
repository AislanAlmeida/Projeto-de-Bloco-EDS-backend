require('dotenv').config();

import express, {json,urlencoded} from 'express';
import { r_login } from './routes/r_login';
import { r_usuario } from './routes/r_usuario';
import { sequelize } from './database/connection';
import { CronjobService } from './services/cronjobsService';
import cors from 'cors';
import morgan from 'morgan';

//DEPRECATED => MIGRAÇÃO PARA MICROSSERVIÇOS//
import { r_vaga } from './routes/r_vaga';
import { r_competencia } from './routes/r_competencia';
import {schedule} from 'node-cron';
import { UsuarioRepository } from './repository/UsuarioRepository';
import { r_relatorio } from './routes/r_relatorios';
import { r_respostaVaga } from './routes/r_respostaVaga';



const PORT = process.env.PORT || 3000;

var cron = require('node-cron'); 
cron.schedule('1 * * * *', () => {
  CronjobService.encerrarVagasVencidas();
});

let app = express();

import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
const swaggerOptions = {
  swaggerDefinition:{
      openapi: '3.0.0',
      info:{
          title: "API Ventura RH - Infnet",
          version: "1.0.0",
          description: "Infnet 2022",
          contact:{
              name: "Aislan Almeida",
              email: "aislan.almeida@al.infnet.edu.br"
          },
          servers:[{
              url:'http://localhost:3000',
              description: 'Ventura RH - API Swagger'
          }],
          
      },
  },
  apis:['./src/routes/*.ts']
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use(cors());

import httpProxy from 'express-http-proxy';
import url from 'url';

app.use('/vagas', httpProxy('http://localhost:3002/',{
    proxyReqPathResolver: (req) => {
       return '/vagas' + url.parse(req.url).path;
    },
}))

app.use('/competencias', httpProxy("http://localhost:3002/",{
    proxyReqPathResolver: (req) =>{
        return '/competencias'  + url.parse(req.url).path;
    }
}))

app.use('/responder', httpProxy("http://localhost:3002/",{
    proxyReqPathResolver: (req) =>{
        return '/responder'  + url.parse(req.url).path;
    }
}))

app.use('/relatorios', httpProxy("http://localhost:3001/",{
    proxyReqPathResolver: (req) =>{
        return '/relatorios';
    }
}))


//Habilita a aplicação com bodyParser
app.use(json());
app.use(urlencoded({extended:true}));
app.use(morgan('tiny'));

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs));
app.use('/login',r_login);
app.use('/usuarios',r_usuario);

app.listen(PORT,async () => {

    await sequelize.sync({alter:true});
    
    console.log(`API funcionando na porta: ${PORT}`)

});