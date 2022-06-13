import { Router } from "express";
import relatoriosController from "../controllers/relatoriosController";
import { decodeToken } from "../middleware/validarFirebase";

const router = Router();

router.get('/', decodeToken, relatoriosController.obterRelatorios);

export const r_relatorio:Router = router; 