import { CategoryUseCasesInterface } from "../application/use-cases/category-use-cases";
import { ExerciceUseCasesInterface } from "../application/use-cases/exercise-use-cases";
import { PlanUseCasesInterface } from "../application/use-cases/plan-use-cases";
  

export interface CategoryRepositorInterface {
    createCategory: CategoryUseCasesInterface["createCategory"];
    updateCategory: CategoryUseCasesInterface["updateCategory"];
    deleteCategory: CategoryUseCasesInterface["deleteCategory"];
    getCategoryById: CategoryUseCasesInterface["getCategoryById"];
    getCategoriesByCompanyId: CategoryUseCasesInterface["getCategoriesByCompanyId"];
  }

  export interface ExerciceRepositoryInterface {
    createExercise: ExerciceUseCasesInterface["createExercise"];
    getExercisesByCompanyId: ExerciceUseCasesInterface["getExercisesByCompanyId"];
    getExerciseById: ExerciceUseCasesInterface["getExerciseById"];
    updateExercise: ExerciceUseCasesInterface["updateExercise"];
    deleteExercise: ExerciceUseCasesInterface["deleteExercise"];
  }

  export interface PlanRepositoryInterface {
    createPlan: PlanUseCasesInterface["createPlan"];
    getPlansByPatientId: PlanUseCasesInterface["getPlansByPatientId"];
    updateSpecificPlanExercise: PlanUseCasesInterface["onPlanMarkDayAsDone"];
    getPlanByIdAndPatientId: PlanUseCasesInterface["getPlanByIdAndPatientId"];

  }



  export interface DbGatewayContract {
    categoryRepository: CategoryRepositorInterface;
    exerciseRepository: ExerciceRepositoryInterface;
    planRepository: PlanRepositoryInterface
  }