export default function createCategoryUseCase(Repository) {
    return async (data) => {
        return await Repository.createCategory(data);
    };
}
