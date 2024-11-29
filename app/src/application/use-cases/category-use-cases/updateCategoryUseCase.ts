import { Category, Exercise } from "../../entities/Entities";
import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { CategoryUseCasesInterface } from "../category-use-cases/index";

export default function updateCategoryUseCase (Repository: DbGatewayContract["categoryRepository"])
: CategoryUseCasesInterface["updateCategory"]  {
    
    return async (data: Category) => {
        return await Repository.updateCategory(data)
    }
}
