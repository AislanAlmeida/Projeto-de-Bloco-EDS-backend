import { UsuarioModel } from "../database/models/UsuarioModel";

export class UsuarioRepository{


    async obterUsuarioPorIdFirebase(idFirebase: string){
        let usuarioFirebase = await UsuarioModel.findOne({
            where:{
                firebaseUID:idFirebase
            }
        });
        
        return usuarioFirebase?.toJSON();
    }


}