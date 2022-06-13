import { Router } from "express";
import { decodeToken } from "../middleware/validarFirebase";
import httpProxy from 'express-http-proxy';
// import relatoriosController from "../controllers/relatoriosController";

const relatoriosProxy = httpProxy('http://localhost:3001/');

const router = Router();

router.get('/', decodeToken,(req,res,next) => relatoriosProxy(req,res,next));
// router.get('/',relatoriosController.obterRelatorios);

export const r_relatorio:Router = router; 