import {Request,Response, NextFunction } from "express";
import { UsuarioRepository } from "../repository/UsuarioRepository";

const admin = require('./firebase-config');

export const decodeToken = async (req:Request,res:Response,next:NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    try {
        const decodeToken = await admin.auth().verifyIdToken(token);
        if(decodeToken){
            let usuario = await new UsuarioRepository().obterUsuarioPorIdFirebase(decodeToken.uid)
            console.log(usuario);
            req.userRole = usuario.role;
            req.userId = usuario.id;
            next();
        }else{
            return res.sendStatus(403);
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(403);
    }
}
