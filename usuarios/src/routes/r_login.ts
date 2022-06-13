import { Router } from "express";
import loginController from "../controllers/loginController";
import { decodeToken } from "../middleware/validarFirebase";

const router = Router();

/**
 * @swagger
 * /login/:
 *  post:
 *      summary: Faz Login na API
 *      tags: [login]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                              description: nome usuario
 *                          password:
 *                              type: string
 *                              description: senha usuario
 *      responses:
 *          200:
 *              description: Login Efetuado com sucesso
 *          401:
 *              description: Usuário não autenticado
 *          403:
 *              description: Usuário bloqueado
 *                
 */
router.post('/',loginController.login);


export const r_login:Router = router; 
