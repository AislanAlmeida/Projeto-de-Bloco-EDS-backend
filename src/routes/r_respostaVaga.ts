import { Router } from "express";
import respostaVagaController from "../controllers/respostaVagaController";
import { decodeToken } from "../middleware/validarFirebase";

const router = Router();

router.get('/:id_vaga',respostaVagaController.obterRespostasVaga);
router.post('/',decodeToken,respostaVagaController.responderVaga);

export const r_respostaVaga:Router = router;