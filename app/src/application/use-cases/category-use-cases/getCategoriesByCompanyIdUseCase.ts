import { Category } from "../../entities/Category";
import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { CategoryUseCasesInterface } from "../category-use-cases/index";

export default function getCategoriesByCompanyIdUseCase (Repository: DbGatewayContract<Category>)
: CategoryUseCasesInterface["getCategoriesByCompanyId"]  {
    
    return async (id_comp:number) => {
        return await Repository.getCategoriesByCompanyId(id_comp)
    }
}
