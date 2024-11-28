import createCategoryUseCase from "./createCategoryUseCase.js";
import getCategoryByIdUseCase from "./getCategoryByIdUseCase.js";
import updateCategoryUseCase from "./updateCategoryUseCase.js";
import getCategoriesByCompanyIdUseCase from "./getCategoriesByCompanyIdUseCase.js";
import deleteCategoryUseCase from "./deleteCategoryUseCase.js";
class CategoryUseCases {
    constructor(Repository) {
        this.createCategory_use_case = createCategoryUseCase(Repository);
        this.getCategoryById_use_case = getCategoryByIdUseCase(Repository);
        this.updateCategory_use_case = updateCategoryUseCase(Repository);
        this.getCategoriesByCompanyId_use_case = getCategoriesByCompanyIdUseCase(Repository);
        this.deleteCategory_use_case = deleteCategoryUseCase(Repository);
    }
    async createCategory(data) {
        return await this.createCategory_use_case(data);
    }
    async getCategoryById(id_comp, category_id) {
        return await this.getCategoryById_use_case(id_comp, category_id);
    }
    async updateCategory(data) {
        return await this.updateCategory_use_case(data);
    }
    async getCategoriesByCompanyId(id_comp) {
        return await this.getCategoriesByCompanyId_use_case(id_comp);
    }
    async deleteCategory(id_comp, category_id) {
        return await this.deleteCategory_use_case(id_comp, category_id);
    }
}
export default CategoryUseCases;
