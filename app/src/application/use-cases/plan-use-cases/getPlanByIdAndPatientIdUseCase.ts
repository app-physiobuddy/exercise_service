//getPlanByIdAndPatientId

import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { PlanUseCasesInterface } from "../plan-use-cases/index";

export default function getPlanByIdAndPatientId (Repository: DbGatewayContract["planRepository"])
: PlanUseCasesInterface["getPlanByIdAndPatientId"]  {
    
    return async ( id_pac: number, id_plan: number) => {
        return await Repository.getPlanByIdAndPatientId(id_pac, id_plan)
    }
}
