import createExerciseUseCase from "./createExerciseUseCase.js";
import getExercisesByCompanyIdUseCase from "./getExercisesByCompanyIdUseCase.js";
import getExerciseByIdUseCase from "./getExerciseByIdUseCase.js";
class ExerciseUseCases {
    constructor(Repository) {
        this.createExercise_use_case = createExerciseUseCase(Repository);
        this.getExercisesByCompanyId_use_case = getExercisesByCompanyIdUseCase(Repository);
        this.getExerciseById_use_case = getExerciseByIdUseCase(Repository);
    }
    async createExercise(data) {
        return await this.createExercise_use_case(data);
    }
    async getExercisesByCompanyId(id_comp) {
        return await this.getExercisesByCompanyId_use_case(id_comp);
    }
    async getExerciseById(id_comp, id_exercise) {
        return await this.getExerciseById_use_case(id_comp, id_exercise);
    }
}
export default ExerciseUseCases;
