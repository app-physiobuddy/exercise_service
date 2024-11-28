export default function deleteCategoryUseCase(Repository) {
    return async (id_comp, category_id) => {
        return await Repository.deleteCategory(id_comp, category_id);
    };
}
