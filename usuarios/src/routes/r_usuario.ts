import { Router } from "express";
import usuarioController from "../controllers/usuarioController";
import {decodeToken} from '../middleware/validarFirebase';

const router = Router();

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      BearerAuth:
 *          type: http
 *          scheme: bearer
 *          in: header
 *  schemas:
 *      Usuarios:
 *          type: object
 *          required:
 *              - id
 *              - nome
 *              - endereco
 *              - telefone
 *              - email
 *          properties:
 *              id:
 *                  type: string
 *                  description: id gerado automaticamente para o usuário
 *              nome:
 *                  type: string
 *                  description: Nome do usuário
 *              endereco:
 *                  type: string
 *                  description: Endereço do usuário
 *              telefone:
 *                  type: string
 *                  description: Telefone do usuário
 *              email:
 *                  type: string
 *                  description: Email do usuário
 *          example:
 *              id: 123
 *              nome: Aislan
 *              endereco: Rua teste 123
 *              telefone: 22 988779999
 *              email: aislan.almeida@infnet.edu.br
 */

/**
 * @swagger
 * /usuarios:
 *  post:
 *      summary: Adiciona um novo usuario
 *      description: Adiciona um novo usuario
 *      tags: [usuarios]
 *      requestBody:
 *       required: true
 *       content:
 *           application/json:
 *               schema:
 *                   type: object
 *                   properties:
 *                       email:
 *                          type: string
 *                       nome:
 *                          type: string
 *                       senha:
 *                          type: string
 *                       CNPJ:
 *                          type: string
 *                       CPF:
 *                          type: string
 *                       razaoSocial:
 *                          type: string
 *                       cidade:
 *                          type: string
 *                       UF:
 *                          type: string
 *                       telefone:
 *                          type: string
 *                       endereco:
 *                          type: string
 *      responses:
 *          400:
 *              description: faltam parametros importantes
 *          201:
 *              description: Usuario cadastrado
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: number
 *                              nome:
 *                                  type: string
 *                                  example: candidato
 *                              endereco:
 *                                  type: string
 *                                  example: rua teste
 *                              cidade:
 *                                  type: string
 *                                  example: itaperuna
 *                              UF:
 *                                  type: string
 *                                  example: RJ
 *                              telefone:
 *                                  type: string
 *                                  example: 28999888855
 *                              status:
 *                                  type: string
 *                                  example: ativo
 *                              email:
 *                                  type: string
 *                                  example: candidato4@candidato4.com
 *                              CPF:
 *                                  type: string
 *                                  example: 11223333221
 *                              CNPJ:
 *                                  type: string
 *                                  example: 123123123
 *                              razaoSocial:
 *                                  type: string
 *                                  example: minha razao social
 *                              senha:
 *                                  type: string
 *                                  example: 123123
 *                              dataModificacao:
 *                                  type: string
 *                                  example: 2022-06-10T19:45:43.271Z
 *                              firebaseUID:
 *                                  type: string
 *                                  example: uwiNexioSgQ7WVpUGDM4SZ1TrPw2
 *                              instagram:
 *                                  type: string
 *                                  example: https://asdfaçsldkflçsadkf
 *                              linkedin:
 *                                  type: string
 *                                  example: https://asdlfasldkfspfeo
 *                              motivoBloqueio:
 *                                  type: string
 *                                  example: conduta indevida
 *                              role:
 *                                  type: string
 *                                  example: candidato
 *                               */

router.post('/', usuarioController.incluirUsuario)


/**
 * @swagger
 * /usuarios:
 *  get:
 *      summary: Retorna todos os usuários cadastrados
 *      security: 
 *        - BearerAuth: []
 *      description: Retorna todos os usuários cadastrados
 *      tags: [usuarios]
 *      authorizations:
 *          Bearer:
 *              description: token disponibilizado
 *      responses:
 *          401:
 *              description: Usuário não autenticado
 *          403:
 *              description: Usuário sem permissão para esta requisição
 *          200:
 *              description: Lista de clientes
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: number
 *                              nome:
 *                                  type: string
 *                                  example: candidato
 *                              endereco:
 *                                  type: string
 *                                  example: rua teste
 *                              cidade:
 *                                  type: string
 *                                  example: itaperuna
 *                              UF:
 *                                  type: string
 *                                  example: RJ
 *                              telefone:
 *                                  type: string
 *                                  example: 28999888855
 *                              status:
 *                                  type: string
 *                                  example: ativo
 *                              email:
 *                                  type: string
 *                                  example: candidato4@candidato4.com
 *                              CPF:
 *                                  type: string
 *                                  example: 11223333221
 *                              CNPJ:
 *                                  type: string
 *                                  example: 123123123
 *                              razaoSocial:
 *                                  type: string
 *                                  example: minha razao social
 *                              senha:
 *                                  type: string
 *                                  example: 123123
 *                              dataModificacao:
 *                                  type: string
 *                                  example: 2022-06-10T19:45:43.271Z
 *                              firebaseUID:
 *                                  type: string
 *                                  example: uwiNexioSgQ7WVpUGDM4SZ1TrPw2
 *                              instagram:
 *                                  type: string
 *                                  example: https://asdfaçsldkflçsadkf
 *                              linkedin:
 *                                  type: string
 *                                  example: https://asdlfasldkfspfeo
 *                              motivoBloqueio:
 *                                  type: string
 *                                  example: conduta indevida
 *                              role:
 *                                  type: string
 *                                  example: candidato
 *                              
 */
router.get('/',decodeToken,usuarioController.obterUsuarios)

router.get('/:id',decodeToken,usuarioController.obterUsuarioPorId)

router.delete('/:id',decodeToken,usuarioController.excluirUsuario)

router.put('/',decodeToken,usuarioController.atualizarUsuario);

router.put('/bloquear/:id',decodeToken,usuarioController.bloquearUsuario)
router.put('/desbloquear/:id',decodeToken,usuarioController.desbloquearUsuario)

export const r_usuario:Router = router; 