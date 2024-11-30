import { CategoryUseCasesInterface } from "../application/use-cases/category-use-cases";
import { ExerciceUseCasesInterface } from "../application/use-cases/exercise-use-cases";
  

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
  }



  export interface DbGatewayContract {
    categoryRepository: CategoryRepositorInterface;
    exerciseRepository: ExerciceRepositoryInterface;
  }