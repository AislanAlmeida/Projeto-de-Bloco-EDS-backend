import { Router } from "express";
import usuarioController from "../controllers/usuarioController";
import {decodeToken} from '../middleware/validarFirebase';

const router = Router();

router.post('/', usuarioController.incluirUsuario)

router.get('/',decodeToken,usuarioController.obterUsuarios)

router.delete('/:id',decodeToken,usuarioController.excluirUsuario)
export const r_usuario:Router = router; 