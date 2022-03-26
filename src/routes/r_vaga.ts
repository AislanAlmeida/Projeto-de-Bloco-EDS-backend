import { Router } from "express";
import vagaController from "../controllers/vagaController";
import { decodeToken } from "../middleware/validarFirebase";

const router = Router();

router.get('/',decodeToken,vagaController.obterVagas);
router.post('/',decodeToken,vagaController.criarVaga);

export const r_vaga:Router = router;