export default function getCategoriesByCompanyIdUseCase(Repository) {
    return async (id_comp) => {
        return await Repository.getCategoriesByCompanyId(id_comp);
    };
}
