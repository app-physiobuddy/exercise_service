export default function getCategoryByIdUseCase(Repository) {
    return async (id_comp, category_id) => {
        return await Repository.getCategoryById(id_comp, category_id);
    };
}
