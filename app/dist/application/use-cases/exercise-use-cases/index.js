import createExerciseUseCase from "./createExerciseUseCase.js";
class ExerciseUseCases {
    constructor(Repository) {
        this.createExercise_use_case = createExerciseUseCase(Repository);
    }
    async createExercise(data) {
        return await this.createExercise_use_case(data);
    }
}
export default ExerciseUseCases;
