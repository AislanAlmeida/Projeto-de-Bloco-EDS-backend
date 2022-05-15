import { Router } from "express";
import vagaController from "../controllers/vagaController";
import { decodeToken } from "../middleware/validarFirebase";

const router = Router();

router.get('/',decodeToken,vagaController.obterVagas);

router.get('/recentes',vagaController.obterUltimasVagas);

router.get('/respondidas',decodeToken,vagaController.obterVagasRespondidas);

router.post('/',decodeToken,vagaController.criarVaga);

router.post('/encerrar',decodeToken,vagaController.encerrarVaga);

router.post('/reativar',decodeToken,vagaController.reativarVaga);
router.post('/cancelar',decodeToken,vagaController.cancelarVaga);

export const r_vaga:Router = router;