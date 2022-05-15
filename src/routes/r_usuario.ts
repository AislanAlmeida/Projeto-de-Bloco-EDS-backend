import { Router } from "express";
import usuarioController from "../controllers/usuarioController";
import {decodeToken} from '../middleware/validarFirebase';

const router = Router();

router.post('/', usuarioController.incluirUsuario)

router.get('/',decodeToken,usuarioController.obterUsuarios)

router.get('/:id',decodeToken,usuarioController.obterUsuarioPorId)

router.delete('/:id',decodeToken,usuarioController.excluirUsuario)

router.put('/',decodeToken,usuarioController.atualizarUsuario);

router.put('/bloquear/:id',decodeToken,usuarioController.bloquearUsuario)
router.put('/desbloquear/:id',decodeToken,usuarioController.desbloquearUsuario)

export const r_usuario:Router = router; 