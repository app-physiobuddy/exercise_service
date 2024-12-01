export default function updateExerciseUseCase(Repository) {
    return async (exercise) => {
        return await Repository.updateExercise(exercise);
    };
}
