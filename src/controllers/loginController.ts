// import { Usuario } from "../models/Usuario";
// import jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import { loginFirebase } from "../services/firebaseService";
import { UsuarioRepository } from "../repository/UsuarioRepository";

class loginController{
    async login(req:Request,res:Response){
        let ua = req.header('user-agent');

        const username = req.body.username;
        const password = req.body.password;
        
        const usuarioFirebase = await loginFirebase(username,password);
        
        if(usuarioFirebase){
            let uid = await new UsuarioRepository().obterUsuarioPorIdFirebase(usuarioFirebase.uid);
            
            if(uid && uid.status == 'ativo'){
                
                let token = await usuarioFirebase.getIdTokenResult();
                
                if(/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(ua ? ua : '')) {        
                    if(uid.role == 'empresa'){
                         res.status(403).send('Usuarios do tipo empresa não podem realizar login via dispositivos móveis');
                    }else{
                        res.status(200).json({usuario:uid,token:token.token});
                    }
                        
                } else {
                    res.status(200).json({usuario:uid,token:token.token});
                }
            }else if(uid.status == 'bloqueado'){
            
                res.status(403).send(`Usuário bloqueado \nMotivo: ${uid.motivoBloqueio}`);
            }else{
                res.sendStatus(404);
            }
        }else{
            res.sendStatus(401);
        }
    }
}
export default new loginController();