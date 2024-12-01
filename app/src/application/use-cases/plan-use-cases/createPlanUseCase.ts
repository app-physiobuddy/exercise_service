import { Plan } from "../../entities/Entities";
import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { PlanUseCasesInterface } from "../plan-use-cases/index";

export default function createPlanUseCase (Repository: DbGatewayContract["planRepository"])
: PlanUseCasesInterface["createPlan"]  {
    
    return async (data: Plan) => {
        return await Repository.createPlan(data)
    }
}
