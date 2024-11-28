import { Router } from "express";
export const router = Router();
import CategoryControllers from "../adapters/CategoryControllers.js";
import { PrismaRepository } from "../framework/database/prisma/prismaRepository.js";
import CategoryUseCases from "../application/use-cases/category-use-cases/index.js";
const prismaRepository = new PrismaRepository();
const categoryUseCases = new CategoryUseCases(prismaRepository);
const categoryControllers = new CategoryControllers(categoryUseCases);
const asyncHandler = (controller) => (req, res, next) => {
    Promise.resolve(controller(req, res, next)).catch(next);
};
router.get("/", asyncHandler((req, res) => res.send("App is running;")));
//Categorias
router.post("/companies/:company_id/categories", asyncHandler((req, res) => categoryControllers.createCategory(req, res)));
router.get("/companies/:company_id/categories", asyncHandler((req, res) => categoryControllers.getCategoriesByCompanyId(req, res)));
router.get("/companies/:company_id/:category_id", asyncHandler((req, res) => categoryControllers.getCategoryById(req, res)));
router.put("/companies/:company_id/:category_id", asyncHandler((req, res) => categoryControllers.updateCategory(req, res)));
router.delete("/companies/:company_id/:category_id", asyncHandler((req, res) => categoryControllers.deleteCategory(req, res)));
//Exercicios
router.post("/companies/:company_id/exercises", asyncHandler((req, res) => res.send("Criar um exercício dessa empresa.")
/*
TODO:
Requer:
vem logado com role: therapist ou therapistAdmin
recebe o id da empresa = company_id

Ação:
recebe o video e faz upload no servidor da base de dados, e retorna o url
passa o url do video para a base de dados = video_dir
recebe o id da categoria = category_id
descricao = desc
observaloes = obs
created_by = therapist_id
*/
));
router.get("/companies/:company_id/exercises", asyncHandler((req, res) => res.send("Listar todos os exercícios da empresa.")));
router.get("/companies/:company_id/exercises/:exercise_id", asyncHandler((req, res) => res.send("Obter informação do exercicio dos parametros")));
router.put("/companies/:company_id/exercises/:exercise_id", asyncHandler((req, res) => res.send("Editar o exercicio dos parametros.")));
router.delete("/companies/:company_id/exercises/:exercise_id", asyncHandler((req, res) => res.send("Remover o exercicio dos parametros.")));
//Planos
router.post("/therapists/:therapists_id/plans", asyncHandler((req, res) => res.send("criar um plano para um paciente.")));
router.get("/patients/:patients_id/plans/:plans_id", asyncHandler((req, res) => res.send("Obter informação de um plano especifico de um paciente.")));
router.get("/therapists/:therapists_id/patients/:patients_id/plans/progress", asyncHandler((req, res) => res.send("Listar os exercícios que um paciente completou e quando")));
router.get("/patients/:patients_id/plans", asyncHandler((req, res) => res.send("Obter lista de planos de associados a esse paciente.")));
router.post("/patients/:patients_id/plans/:plans_id/exercises/:exercises_id/done", asyncHandler((req, res) => res.send("Paciente marcar um exercício de um plano como feito.")));
