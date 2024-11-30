export default function getExerciseByIdUseCase(Repository) {
    return async (id_comp, id_exercise) => {
        return await Repository.getExerciseById(id_comp, id_exercise);
    };
}
