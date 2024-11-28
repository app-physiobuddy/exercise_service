export default function updateCategoryUseCase(Repository) {
    return async (data) => {
        return await Repository.updateCategory(data);
    };
}
