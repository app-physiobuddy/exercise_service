import { Router } from "express";
export const router = Router();
import PrismaRepository from "../framework/database/prisma/PrismaRepository.js";
import CategoryControllers from "../adapters/CategoryControllers.js";
import ExerciseControllers from "../adapters/ExerciseControllers.js";
import PlanControllers from "../adapters/PlanControllers.js";
import CategoryUseCases from "../application/use-cases/category-use-cases/index.js";
import ExerciseUseCases from "../application/use-cases/exercise-use-cases/index.js";
import PlanUseCases from "../application/use-cases/plan-use-cases/index.js";
import MqttProvider from "../framework/providers/MqttProvider.js";
import SubController from "./SubController.js";
const prismaRepository = new PrismaRepository();
const categoryUseCases = new CategoryUseCases(prismaRepository.categoryRepository);
const categoryControllers = new CategoryControllers(categoryUseCases);
const mqttProvider = new MqttProvider();
const exerciseUseCases = new ExerciseUseCases(prismaRepository.exerciseRepository, mqttProvider);
const exerciseControllers = new ExerciseControllers(exerciseUseCases);
const planUseCases = new PlanUseCases(prismaRepository.planRepository, mqttProvider);
const planControllers = new PlanControllers(planUseCases);
const asyncHandler = (controller) => (req, res, next) => {
    Promise.resolve(controller(req, res, next)).catch(next);
};
router.get("/", asyncHandler((req, res) => res.send("App is running;")));
const subController = new SubController(exerciseUseCases);
// Async subscriptions
mqttProvider.newExerciseSubscription().then((newExercise) => {
    console.log('Subscription callback triggered');
    subController.createExercise(newExercise);
}).catch((error) => {
    console.error('Error in subscription:', error);
});
//Categorias
router.post("/companies/:user_id/categories", asyncHandler((req, res) => categoryControllers.createCategory(req, res)));
router.get("/companies/:user_id/categories", asyncHandler((req, res) => categoryControllers.getCategoriesByCompanyId(req, res)));
router.get("/companies/:user_id/categories/:category_id", asyncHandler((req, res) => categoryControllers.getCategoryById(req, res)));
router.put("/companies/:user_id/categories/:category_id", asyncHandler((req, res) => categoryControllers.updateCategory(req, res)));
router.delete("/companies/:user_id/categories/:category_id", asyncHandler((req, res) => categoryControllers.deleteCategory(req, res)));
//Exercicios
router.post("/companies/:user_id/exercises", asyncHandler((req, res) => exerciseControllers.createExercise(req, res)));
router.get("/companies/:user_id/exercises", asyncHandler((req, res) => exerciseControllers.getExercisesByCompanyId(req, res)));
router.get("/companies/:user_id/exercises/:exercise_id", asyncHandler((req, res) => exerciseControllers.getExerciseById(req, res)));
router.put("/companies/:user_id/exercises/:exercise_id", asyncHandler((req, res) => exerciseControllers.updateExercise(req, res)));
router.delete("/companies/:user_id/exercises/:exercise_id", asyncHandler((req, res) => exerciseControllers.deleteExercise(req, res)));
//Planos
router.post("/therapists/:user_id/patients/:patient_id/plans", asyncHandler((req, res) => planControllers.createPlan(req, res)));
router.get("/patients/:patient_id/plans", asyncHandler((req, res) => planControllers.getPlansByPatientId(req, res)));
router.put("/patients/:patient_id/plans/:plan_id/exercises/:exercise_id", asyncHandler((req, res) => 
//"Paciente marcar um dia do exercício de um plano como feito.
planControllers.onPlanMarkDayAsDone(req, res)));
router.get("/patients/:patient_id/plans/:plan_id", asyncHandler((req, res) => 
//res.send("Obter informação de um plano especifico de um paciente.")
planControllers.getPlanByIdAndPatientId(req, res)));
router.get("/therapists/:therapist_id/patients/:patient_id/plans/:plan_id/progress", asyncHandler((req, res) => 
//res.send("Listar os exercícios que um paciente completou e quando")
//get all, expose done and date
planControllers.getAllExercisesDone(req, res)));
