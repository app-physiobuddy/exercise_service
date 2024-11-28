import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { Category, Exercise } from "../../entities/Category";
import createCategoryUseCase from "./createCategoryUseCase.js";
import getCategoryByIdUseCase from "./getCategoryByIdUseCase.js";
import updateCategoryUseCase from "./updateCategoryUseCase.js";
import getCategoriesByCompanyIdUseCase from "./getCategoriesByCompanyIdUseCase.js";
import deleteCategoryUseCase from "./deleteCategoryUseCase.js";

export interface CategoryUseCasesInterface {
    createCategory: DbGatewayContract<Category, Exercise>["createCategory"];
    getCategoryById: DbGatewayContract<Category, Exercise>["getCategoryById"];
    getCategoriesByCompanyId: DbGatewayContract<Category, Exercise>["getCategoriesByCompanyId"];
    updateCategory: DbGatewayContract<Category, Exercise>["updateCategory"];
    deleteCategory: DbGatewayContract<Category, Exercise>["deleteCategory"];
}


class CategoryUseCases implements CategoryUseCasesInterface {
    private createCategory_use_case: CategoryUseCasesInterface["createCategory"];
    private getCategoryById_use_case: CategoryUseCasesInterface["getCategoryById"];
    private updateCategory_use_case: CategoryUseCasesInterface["updateCategory"];
    private getCategoriesByCompanyId_use_case: CategoryUseCasesInterface["getCategoriesByCompanyId"];
    private deleteCategory_use_case: CategoryUseCasesInterface["deleteCategory"];
    constructor(
        Repository: DbGatewayContract<Category, Exercise>
    ){
        this.createCategory_use_case = createCategoryUseCase(Repository);
        this.getCategoryById_use_case = getCategoryByIdUseCase(Repository);
        this.updateCategory_use_case = updateCategoryUseCase(Repository);
        this.getCategoriesByCompanyId_use_case = getCategoriesByCompanyIdUseCase(Repository);
        this.deleteCategory_use_case = deleteCategoryUseCase(Repository);

    }
    async createCategory(data: Category) {
        return await this.createCategory_use_case(data);
    }
    async getCategoryById(id_comp: number, category_id: number) {
        return await this.getCategoryById_use_case(id_comp, category_id);
    }
    async updateCategory(data: Category) {
        return await this.updateCategory_use_case(data);
    }
    async getCategoriesByCompanyId(id_comp: number) {
        return await this.getCategoriesByCompanyId_use_case(id_comp);
    }
    async deleteCategory(id_comp: number, category_id: number) {
        return await this.deleteCategory_use_case(id_comp, category_id);
    }
    

}

export default CategoryUseCases