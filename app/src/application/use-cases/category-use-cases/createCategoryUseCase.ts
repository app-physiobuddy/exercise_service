import { Category, Exercise } from "../../entities/Category";
import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { CategoryUseCasesInterface } from "../category-use-cases/index";

export default function createCategoryUseCase (Repository: DbGatewayContract<Category, Exercise>)
: CategoryUseCasesInterface["createCategory"]  {
    
    return async (data: Category) => {
        return await Repository.createCategory(data)
    }
}
