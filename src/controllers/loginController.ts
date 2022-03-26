import { Usuario } from "../models/Usuario";
import jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import { loginFirebase } from "../services/firebaseService";
import { UsuarioRepository } from "../repository/UsuarioRepository";

class loginController{
    async login(req:Request,res:Response){
        const username = req.body.username;
        const password = req.body.password;
        
        const usuarioFirebase = await loginFirebase(username,password);
        if(usuarioFirebase){
            let uid = await new UsuarioRepository().obterUsuarioPorIdFirebase(usuarioFirebase.uid);
            if(uid){
                let token = await usuarioFirebase.getIdTokenResult();
                res.status(200).json({usuario:uid,token:token.token});
            }else{
                res.sendStatus(204);
            }
        }else{
            res.sendStatus(401);
        }
    }
    // static assinarToken(usuario:Usuario){
    //     const SECRET = process.env.SECRET;
    //     if(SECRET){   
    //         const token = jwt.sign({
    //             usuario:usuario.nome,
    //             role:usuario.role
    //         },SECRET,{
    //             expiresIn:'60m'
    //         });
    //         return token;
    //     }
    
    // }
}
export default new loginController();