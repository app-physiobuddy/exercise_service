export default function getCategoriesByCompanyIdUseCase(Repository) {
    return async (id_comp) => {
        console.log("CATE  USE CASE CALLES");
        return await Repository.getCategoriesByCompanyId(id_comp);
    };
}
