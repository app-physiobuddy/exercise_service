export default function createExerciseUseCase(Repository) {
    return async (data) => {
        return await Repository.createExercise(data);
    };
}
