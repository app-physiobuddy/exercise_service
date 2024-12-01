export default function deleteExerciseUseCase(Repository) {
    return async (id_comp, id_exercise) => {
        console.log(id_comp, id_exercise);
        return await Repository.deleteExercise(id_comp, id_exercise);
    };
}
