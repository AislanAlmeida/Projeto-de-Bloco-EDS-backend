require('dotenv').config();

import express, {json,urlencoded} from 'express';
import { sequelize } from './database/connection';
import cors from 'cors';
import { r_relatorio } from './routes/r_relatorios';


const PORT = process.env.PORT || 3001;

let app = express();

app.use(json());
app.use(urlencoded({extended:true}));
app.use(cors());

app.use('/relatorios',r_relatorio);

//   _____ ___________ _   _ _____ _____ _____  ______ _____ _       ___ _____ ___________ _____ _____ _____ 
//  /  ___|  ___| ___ \ | | |_   _/  __ \  _  | | ___ \  ___| |     / _ \_   _|  _  | ___ \_   _|  _  /  ___|
//  \ `--.| |__ | |_/ / | | | | | | /  \/ | | | | |_/ / |__ | |    / /_\ \| | | | | | |_/ / | | | | | \ `--. 
//   `--. \  __||    /| | | | | | | |   | | | | |    /|  __|| |    |  _  || | | | | |    /  | | | | | |`--. \
//  /\__/ / |___| |\ \\ \_/ /_| |_| \__/\ \_/ / | |\ \| |___| |____| | | || | \ \_/ / |\ \ _| |_\ \_/ /\__/ /
//  \____/\____/\_| \_|\___/ \___/ \____/\___/  \_| \_\____/\_____/\_| |_/\_/  \___/\_| \_|\___/ \___/\____/ 
//                                                                                                           
// 
app.listen(PORT,async () => {

    await sequelize.sync();
    
    console.log(`${imprimeBanner()} \n API funcionando na porta: ${PORT}`);
});

function imprimeBanner(){
    return `    
    ##############################    
    # Serviço Relatórios - Ventura RH #
    ##############################

    Aluno: Aislan Almeida 
    Instituto Infnet ${new Date().getFullYear()}
    -------------------------------`;
}