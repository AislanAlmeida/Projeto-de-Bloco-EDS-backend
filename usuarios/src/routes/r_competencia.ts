import { Router } from "express";
import competenciaController from "../controllers/competenciaController";

const router = Router();

router.get('/:idVaga',competenciaController.obterCompetencias);

export const r_competencia:Router = router;