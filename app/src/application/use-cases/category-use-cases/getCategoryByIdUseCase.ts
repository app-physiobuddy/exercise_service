import { Category, Exercise } from "../../entities/Entities";
import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { CategoryUseCasesInterface } from "../category-use-cases/index";

export default function getCategoryByIdUseCase (Repository: DbGatewayContract["categoryRepository"])
: CategoryUseCasesInterface["getCategoryById"]  {
    
    return async (id_comp:number, category_id:number) => {
        return await Repository.getCategoryById(id_comp, category_id)
    }
}
