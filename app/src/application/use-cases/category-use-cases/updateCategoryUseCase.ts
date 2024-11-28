import { Category, Exercise } from "../../entities/Category";
import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { CategoryUseCasesInterface } from "../category-use-cases/index";

export default function updateCategoryUseCase (Repository: DbGatewayContract<Category, Exercise>)
: CategoryUseCasesInterface["updateCategory"]  {
    
    return async (data: Category) => {
        return await Repository.updateCategory(data)
    }
}
