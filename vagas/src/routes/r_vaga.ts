import { Router } from "express";
import { decodeToken } from "../middleware/validarFirebase";
import vagaController from "../controllers/vagaController";

const router = Router();

router.get('/', decodeToken, vagaController.obterVagas);

router.get('/recentes',vagaController.obterUltimasVagas);

router.get('/respondidas',decodeToken,vagaController.obterVagasRespondidas);

router.post('/',decodeToken,vagaController.criarVaga);

router.post('/encerrar',decodeToken,vagaController.encerrarVaga);

router.post('/reativar',decodeToken,vagaController.reativarVaga);
router.post('/cancelar',decodeToken,vagaController.cancelarVaga);

export const r_vaga:Router = router;