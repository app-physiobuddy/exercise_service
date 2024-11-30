import { Category, Exercise } from "../../entities/Entities";
import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { CategoryUseCasesInterface } from "../category-use-cases/index";

export default function getCategoriesByCompanyIdUseCase (Repository: DbGatewayContract["categoryRepository"])
: CategoryUseCasesInterface["getCategoriesByCompanyId"]  {
    
    return async (id_comp:number) => {
        console.log("CATE  USE CASE CALLES")
        return await Repository.getCategoriesByCompanyId(id_comp)
    }
}
