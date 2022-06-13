import { Router } from "express";
import { decodeToken } from "../middleware/validarFirebase";
import vagaController from "../controllers/vagaController";


const router = Router();


/**
 * @swagger
 * /vagas:
 *  get:
 *      summary: Retorna todos as vagas cadastrados
 *      security: 
 *        - BearerAuth: []
 *      description: Retorna todos as vagas cadastradas
 *      tags: [vagas]
 *      authorizations:
 *          Bearer:
 *              description: token disponibilizado
 *      parameters:
 *      - in: query
 *        name: status
 *        type: string
 *        description: status da vaga pesquisada
 *        example: ativa
 *      - in: query
 *        name: cidade
 *        type: string
 *        description: cidade da vaga a ser buscada
 *        example: rio de janeiro
 *      responses:
 *          401:
 *              description: Usuário não autenticado
 *          200:
 *              description: Lista de vagas
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: number
 *                                  description: id da vaga
 *                                  example: 1000
 *                              id_usuario:
 *                                 type: number
 *                                 desciption: id usuario criador da vaga
 *                              cargo: 
 *                                  type: string
 *                                  description: nome do cargo
 *                              cidade:
 *                                  type: string
 *                                  description: cidade da vaga
 *                              UF: 
 *                                  type: string
 *                                  description: estado (UF) da vaga
 *                                  example: RJ
 *                              forma_contratacao:
 *                                  type: string
 *                                  description: tipo de contratação da vaga
 *                                  example: CLT
 *                              area_atuacao:
 *                                  type: string
 *                                  description: nome de atuação para a vaga em específico
 *                                  example: design
 *                              descricao:
 *                                  type: string
 *                              dataModificacao: 
 *                                  type: Date
 *                              data_validade: 
 *                                  type: date
 *                              status:
 *                                  type: string
 *                              createdAt: 
 *                                  type: Date
 *                              updatedAt:
 *                                  type: Date
 *                              Usuario:
 *                                  type: object
 *                                  properties:
 *                                      nome: 
 *                                          type: string
 *                                          description: nome do usuario criador da vaga 
 *                                      cidade: 
 *                                          type: string
 *                                          description: cidade da empresa criadora da vaga
 *                                      UF:
 *                                          type: string
 *                                          description: estado (UF) da empresa criadora da vaga
 *                                          example: RJ
 *                               */


router.get('/',decodeToken,vagaController.obterVagas);

/**
 * @swagger
 * /vagas/recentes:
 *  get:
 *      summary: Retorna todos as vagas cadastrados
 *      security: 
 *        - BearerAuth: []
 *      description: Retorna todos as vagas cadastradas
 *      tags: [vagas]
 *      authorizations:
 *          Bearer:
 *              description: token disponibilizado
 *      parameters:
 *      - in: query
 *        name: status
 *        type: string
 *        description: status da vaga pesquisada
 *        example: ativa
 *      - in: query
 *        name: cidade
 *        type: string
 *        description: cidade da vaga a ser buscada
 *        example: rio de janeiro
 *      responses:
 *          401:
 *              description: Usuário não autenticado
 *          200:
 *              description: Lista de vagas
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: number
 *                                  description: id da vaga
 *                                  example: 1000
 *                              id_usuario:
 *                                 type: number
 *                                 desciption: id usuario criador da vaga
 *                              cargo: 
 *                                  type: string
 *                                  description: nome do cargo
 *                              cidade:
 *                                  type: string
 *                                  description: cidade da vaga
 *                              UF: 
 *                                  type: string
 *                                  description: estado (UF) da vaga
 *                                  example: RJ
 *                              forma_contratacao:
 *                                  type: string
 *                                  description: tipo de contratação da vaga
 *                                  example: CLT
 *                              area_atuacao:
 *                                  type: string
 *                                  description: nome de atuação para a vaga em específico
 *                                  example: design
 *                              descricao:
 *                                  type: string
 *                              dataModificacao: 
 *                                  type: Date
 *                              data_validade: 
 *                                  type: date
 *                              status:
 *                                  type: string
 *                              createdAt: 
 *                                  type: Date
 *                              updatedAt:
 *                                  type: Date
 *                              Usuario:
 *                                  type: object
 *                                  properties:
 *                                      nome: 
 *                                          type: string
 *                                          description: nome do usuario criador da vaga 
 *                                      cidade: 
 *                                          type: string
 *                                          description: cidade da empresa criadora da vaga
 *                                      UF:
 *                                          type: string
 *                                          description: estado (UF) da empresa criadora da vaga
 *                                          example: RJ
 *                               */

router.get('/recentes',vagaController.obterUltimasVagas);

/**
 * @swagger
 * /vagas/respondidas:
 *  get:
 *      summary: Retorna todos as vagas cadastrados
 *      security: 
 *        - BearerAuth: []
 *      description: Retorna todos as vagas cadastradas
 *      tags: [vagas]
 *      authorizations:
 *          Bearer:
 *              description: token disponibilizado
 *      parameters:
 *      - in: query
 *        name: status
 *        type: string
 *        description: status da vaga pesquisada
 *        example: ativa
 *      - in: query
 *        name: cidade
 *        type: string
 *        description: cidade da vaga a ser buscada
 *        example: rio de janeiro
 *      responses:
 *          401:
 *              description: Usuário não autenticado
 *          200:
 *              description: Lista de vagas
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: number
 *                                  description: id da vaga
 *                                  example: 1000
 *                              id_usuario:
 *                                 type: number
 *                                 desciption: id usuario criador da vaga
 *                              cargo: 
 *                                  type: string
 *                                  description: nome do cargo
 *                              cidade:
 *                                  type: string
 *                                  description: cidade da vaga
 *                              UF: 
 *                                  type: string
 *                                  description: estado (UF) da vaga
 *                                  example: RJ
 *                              forma_contratacao:
 *                                  type: string
 *                                  description: tipo de contratação da vaga
 *                                  example: CLT
 *                              area_atuacao:
 *                                  type: string
 *                                  description: nome de atuação para a vaga em específico
 *                                  example: design
 *                              descricao:
 *                                  type: string
 *                              dataModificacao: 
 *                                  type: Date
 *                              data_validade: 
 *                                  type: date
 *                              status:
 *                                  type: string
 *                              createdAt: 
 *                                  type: Date
 *                              updatedAt:
 *                                  type: Date
 *                              Usuario:
 *                                  type: object
 *                                  properties:
 *                                      nome: 
 *                                          type: string
 *                                          description: nome do usuario criador da vaga 
 *                                      cidade: 
 *                                          type: string
 *                                          description: cidade da empresa criadora da vaga
 *                                      UF:
 *                                          type: string
 *                                          description: estado (UF) da empresa criadora da vaga
 *                                          example: RJ
 *                               */

router.get('/respondidas',decodeToken,vagaController.obterVagasRespondidas);

/**
 * @swagger
 * /vagas:
 *  post:
 *      summary: Adiciona uma nova vaga
 *      security: 
 *        - BearerAuth: []
 *      description: Retorna todos as vagas cadastradas
 *      tags: [vagas]
 *      authorizations:
 *          Bearer:
 *              description: token disponibilizado
 *      requestBody:
 *       required: true
 *       content:
 *           application/json:
 *               schema:
 *                   type: object
 *                   properties:
 *                       username:
 *                           type: string
 *                           description: nome usuario
 *                       password:
 *                           type: string
 *                           description: senha usuario
 *      responses:
 *          401:
 *              description: Usuário não autenticado
 *          200:
 *              description: Lista de vagas
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: number
 *                                  description: id da vaga
 *                                  example: 1000
 *                              id_usuario:
 *                                 type: number
 *                                 desciption: id usuario criador da vaga
 *                              cargo: 
 *                                  type: string
 *                                  description: nome do cargo
 *                              cidade:
 *                                  type: string
 *                                  description: cidade da vaga
 *                              UF: 
 *                                  type: string
 *                                  description: estado (UF) da vaga
 *                                  example: RJ
 *                              forma_contratacao:
 *                                  type: string
 *                                  description: tipo de contratação da vaga
 *                                  example: CLT
 *                              area_atuacao:
 *                                  type: string
 *                                  description: nome de atuação para a vaga em específico
 *                                  example: design
 *                              descricao:
 *                                  type: string
 *                              dataModificacao: 
 *                                  type: Date
 *                              data_validade: 
 *                                  type: date
 *                              status:
 *                                  type: string
 *                              createdAt: 
 *                                  type: Date
 *                              updatedAt:
 *                                  type: Date
 *                              Usuario:
 *                                  type: object
 *                                  properties:
 *                                      nome: 
 *                                          type: string
 *                                          description: nome do usuario criador da vaga 
 *                                      cidade: 
 *                                          type: string
 *                                          description: cidade da empresa criadora da vaga
 *                                      UF:
 *                                          type: string
 *                                          description: estado (UF) da empresa criadora da vaga
 *                                          example: RJ
 *                               */


router.post('/',decodeToken,vagaController.criarVaga);

/**
 * @swagger
 * /vagas/encerrar:
 *  post:
 *      summary: Adiciona uma nova vaga
 *      security: 
 *        - BearerAuth: []
 *      description: Retorna todos as vagas cadastradas
 *      tags: [vagas]
 *      authorizations:
 *          Bearer:
 *              description: token disponibilizado
 *      requestBody:
 *       required: true
 *       content:
 *           application/json:
 *               schema:
 *                   type: object
 *                   properties:
 *                       username:
 *                           type: string
 *                           description: nome usuario
 *                       password:
 *                           type: string
 *                           description: senha usuario
 *      responses:
 *          401:
 *              description: Usuário não autenticado
 *          200:
 *              description: Lista de vagas
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: number
 *                                  description: id da vaga
 *                                  example: 1000
 *                              id_usuario:
 *                                 type: number
 *                                 desciption: id usuario criador da vaga
 *                              cargo: 
 *                                  type: string
 *                                  description: nome do cargo
 *                              cidade:
 *                                  type: string
 *                                  description: cidade da vaga
 *                              UF: 
 *                                  type: string
 *                                  description: estado (UF) da vaga
 *                                  example: RJ
 *                              forma_contratacao:
 *                                  type: string
 *                                  description: tipo de contratação da vaga
 *                                  example: CLT
 *                              area_atuacao:
 *                                  type: string
 *                                  description: nome de atuação para a vaga em específico
 *                                  example: design
 *                              descricao:
 *                                  type: string
 *                              dataModificacao: 
 *                                  type: Date
 *                              data_validade: 
 *                                  type: date
 *                              status:
 *                                  type: string
 *                              createdAt: 
 *                                  type: Date
 *                              updatedAt:
 *                                  type: Date
 *                              Usuario:
 *                                  type: object
 *                                  properties:
 *                                      nome: 
 *                                          type: string
 *                                          description: nome do usuario criador da vaga 
 *                                      cidade: 
 *                                          type: string
 *                                          description: cidade da empresa criadora da vaga
 *                                      UF:
 *                                          type: string
 *                                          description: estado (UF) da empresa criadora da vaga
 *                                          example: RJ
 *                               */
router.post('/encerrar',decodeToken,vagaController.encerrarVaga);

/**
 * @swagger
 * /vagas/reativar:
 *  post:
 *      summary: Adiciona uma nova vaga
 *      security: 
 *        - BearerAuth: []
 *      description: Retorna todos as vagas cadastradas
 *      tags: [vagas]
 *      authorizations:
 *          Bearer:
 *              description: token disponibilizado
 *      requestBody:
 *       required: true
 *       content:
 *           application/json:
 *               schema:
 *                   type: object
 *                   properties:
 *                       username:
 *                           type: string
 *                           description: nome usuario
 *                       password:
 *                           type: string
 *                           description: senha usuario
 *      responses:
 *          401:
 *              description: Usuário não autenticado
 *          200:
 *              description: Lista de vagas
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: number
 *                                  description: id da vaga
 *                                  example: 1000
 *                              id_usuario:
 *                                 type: number
 *                                 desciption: id usuario criador da vaga
 *                              cargo: 
 *                                  type: string
 *                                  description: nome do cargo
 *                              cidade:
 *                                  type: string
 *                                  description: cidade da vaga
 *                              UF: 
 *                                  type: string
 *                                  description: estado (UF) da vaga
 *                                  example: RJ
 *                              forma_contratacao:
 *                                  type: string
 *                                  description: tipo de contratação da vaga
 *                                  example: CLT
 *                              area_atuacao:
 *                                  type: string
 *                                  description: nome de atuação para a vaga em específico
 *                                  example: design
 *                              descricao:
 *                                  type: string
 *                              dataModificacao: 
 *                                  type: Date
 *                              data_validade: 
 *                                  type: date
 *                              status:
 *                                  type: string
 *                              createdAt: 
 *                                  type: Date
 *                              updatedAt:
 *                                  type: Date
 *                              Usuario:
 *                                  type: object
 *                                  properties:
 *                                      nome: 
 *                                          type: string
 *                                          description: nome do usuario criador da vaga 
 *                                      cidade: 
 *                                          type: string
 *                                          description: cidade da empresa criadora da vaga
 *                                      UF:
 *                                          type: string
 *                                          description: estado (UF) da empresa criadora da vaga
 *                                          example: RJ
 *                               */
router.post('/reativar',decodeToken,vagaController.reativarVaga);

/**
 * @swagger
 * /vagas/cancelar:
 *  post:
 *      summary: Adiciona uma nova vaga
 *      security: 
 *        - BearerAuth: []
 *      description: Retorna todos as vagas cadastradas
 *      tags: [vagas]
 *      authorizations:
 *          Bearer:
 *              description: token disponibilizado
 *      requestBody:
 *       required: true
 *       content:
 *           application/json:
 *               schema:
 *                   type: object
 *                   properties:
 *                       username:
 *                           type: string
 *                           description: nome usuario
 *                       password:
 *                           type: string
 *                           description: senha usuario
 *      responses:
 *          401:
 *              description: Usuário não autenticado
 *          200:
 *              description: Lista de vagas
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: number
 *                                  description: id da vaga
 *                                  example: 1000
 *                              id_usuario:
 *                                 type: number
 *                                 desciption: id usuario criador da vaga
 *                              cargo: 
 *                                  type: string
 *                                  description: nome do cargo
 *                              cidade:
 *                                  type: string
 *                                  description: cidade da vaga
 *                              UF: 
 *                                  type: string
 *                                  description: estado (UF) da vaga
 *                                  example: RJ
 *                              forma_contratacao:
 *                                  type: string
 *                                  description: tipo de contratação da vaga
 *                                  example: CLT
 *                              area_atuacao:
 *                                  type: string
 *                                  description: nome de atuação para a vaga em específico
 *                                  example: design
 *                              descricao:
 *                                  type: string
 *                              dataModificacao: 
 *                                  type: Date
 *                              data_validade: 
 *                                  type: date
 *                              status:
 *                                  type: string
 *                              createdAt: 
 *                                  type: Date
 *                              updatedAt:
 *                                  type: Date
 *                              Usuario:
 *                                  type: object
 *                                  properties:
 *                                      nome: 
 *                                          type: string
 *                                          description: nome do usuario criador da vaga 
 *                                      cidade: 
 *                                          type: string
 *                                          description: cidade da empresa criadora da vaga
 *                                      UF:
 *                                          type: string
 *                                          description: estado (UF) da empresa criadora da vaga
 *                                          example: RJ
 *                               */
router.post('/cancelar',decodeToken,vagaController.cancelarVaga);

export const r_vaga:Router = router;