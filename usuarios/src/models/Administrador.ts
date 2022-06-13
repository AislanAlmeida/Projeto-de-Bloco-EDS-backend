import { Usuario } from "./Usuario";

export class Administrador extends Usuario{
    desbloquearUsuario(usuario: Usuario): void {
        console.log('Desbloqueando Usuario');
    }
    obterEstatisticas(): void {
        console.log('Obtendo Estatisticas');
    }
    emitirRelatorio(): void {
        console.log('Emitindo relatírio');
    }
    bloquearUsuario(usuario: Usuario): void {
        if(usuario instanceof Administrador){
            throw new Error('Não é possível bloquear usuário Administrador');
        }else{
            usuario.status = 'inativo'
        }
    }

}