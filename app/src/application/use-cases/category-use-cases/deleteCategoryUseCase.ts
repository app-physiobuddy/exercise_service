import { Category, Exercise } from "../../entities/Entities";
import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { CategoryUseCasesInterface } from "../category-use-cases/index";

export default function deleteCategoryUseCase (Repository: DbGatewayContract["categoryRepository"])
: CategoryUseCasesInterface["deleteCategory"]  {
    
    return async (id_comp: number, category_id: number) => {
        return await Repository.deleteCategory(id_comp, category_id)
    }
}
