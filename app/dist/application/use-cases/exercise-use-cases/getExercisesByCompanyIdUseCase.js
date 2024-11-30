export default function getExercisesByCompanyIdUseCase(Repository) {
    return async (id_comp) => {
        return await Repository.getExercisesByCompanyId(id_comp);
    };
}
