import { Category, Exercise } from "../../entities/Entities";
import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { CategoryUseCasesInterface } from "../category-use-cases/index";

export default function createCategoryUseCase (Repository: DbGatewayContract["categoryRepository"])
: CategoryUseCasesInterface["createCategory"]  {
    
    return async (data: Category) => {
        return await Repository.createCategory(data)
    }
}
