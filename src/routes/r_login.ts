import { Router } from "express";
import loginController from "../controllers/loginController";
import { decodeToken } from "../middleware/validarFirebase";

const router = Router();

router.post('/',loginController.login);


export const r_login:Router = router; 
