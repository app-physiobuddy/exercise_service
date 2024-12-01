import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { Category, Exercise } from "../../entities/Entities";
import createExerciseUseCase from "./createExerciseUseCase.js";
import getExercisesByCompanyIdUseCase from "./getExercisesByCompanyIdUseCase.js";
import getExerciseByIdUseCase from "./getExerciseByIdUseCase.js";
import updateExerciseUseCase from "./updateExerciseUseCase.js";
import deleteExerciseUseCase from "./deleteExerciseUseCase.js"

export interface ExerciceUseCasesInterface {
    createExercise: (exercise: Exercise) => Promise<boolean| undefined>;
    getExercisesByCompanyId: (id_comp: number) => Promise<Exercise[] | undefined>;
    getExerciseById: (id_comp: number, id_exercise: number) => Promise<Exercise | undefined>;
    updateExercise: (exercise: Exercise) => Promise<Exercise | undefined>;
    deleteExercise: (id_comp: number, id_exercise: number) => Promise<boolean | undefined>
  }


class ExerciseUseCases implements ExerciceUseCasesInterface {
    private createExercise_use_case: ExerciceUseCasesInterface["createExercise"];
    private getExercisesByCompanyId_use_case: ExerciceUseCasesInterface["getExercisesByCompanyId"];
    private getExerciseById_use_case: ExerciceUseCasesInterface["getExerciseById"];
    private updateExercise_use_case: ExerciceUseCasesInterface["updateExercise"];
    private deleteExercise_use_case: ExerciceUseCasesInterface["deleteExercise"]

    constructor(
        Repository: DbGatewayContract["exerciseRepository"]
    ){
        this.createExercise_use_case = createExerciseUseCase(Repository);
        this.getExercisesByCompanyId_use_case = getExercisesByCompanyIdUseCase(Repository);
        this.getExerciseById_use_case = getExerciseByIdUseCase(Repository);
        this.updateExercise_use_case = updateExerciseUseCase(Repository);
        this.deleteExercise_use_case = deleteExerciseUseCase(Repository)


    }
    async createExercise(data: Exercise) {
        return await this.createExercise_use_case(data);
    }
    async getExercisesByCompanyId(id_comp: number) {
        return await this.getExercisesByCompanyId_use_case(id_comp);
    }

    async getExerciseById(id_comp: number, id_exercise: number) {
        return await this.getExerciseById_use_case(id_comp, id_exercise);
    }

    async updateExercise(exercise: Exercise) {
        return await this.updateExercise_use_case(exercise);
    }
    
    async deleteExercise(id_comp: number, id_exercise: number) {
        return await this.deleteExercise_use_case(id_comp, id_exercise)
    }

}

export default ExerciseUseCases