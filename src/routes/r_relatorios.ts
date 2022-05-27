import { Router } from "express";
import relatoriosController from "../controllers/relatoriosController";

const router = Router();

router.get('/',relatoriosController.obterRelatorios);

export const r_relatorio:Router = router; 