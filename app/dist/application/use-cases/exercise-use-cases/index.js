import createExerciseUseCase from "./createExerciseUseCase.js";
import getExercisesByCompanyIdUseCase from "./getExercisesByCompanyIdUseCase.js";
import getExerciseByIdUseCase from "./getExerciseByIdUseCase.js";
import updateExerciseUseCase from "./updateExerciseUseCase.js";
import deleteExerciseUseCase from "./deleteExerciseUseCase.js";
class ExerciseUseCases {
    constructor(Repository) {
        this.createExercise_use_case = createExerciseUseCase(Repository);
        this.getExercisesByCompanyId_use_case = getExercisesByCompanyIdUseCase(Repository);
        this.getExerciseById_use_case = getExerciseByIdUseCase(Repository);
        this.updateExercise_use_case = updateExerciseUseCase(Repository);
        this.deleteExercise_use_case = deleteExerciseUseCase(Repository);
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
    async updateExercise(exercise) {
        return await this.updateExercise_use_case(exercise);
    }
    async deleteExercise(id_comp, id_exercise) {
        return await this.deleteExercise_use_case(id_comp, id_exercise);
    }
}
export default ExerciseUseCases;
