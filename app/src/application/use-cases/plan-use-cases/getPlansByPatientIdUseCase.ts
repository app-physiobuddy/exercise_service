import { Exercise } from "../../entities/Entities";
import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { PlanUseCasesInterface } from "./index";

export default function getPlansByPatientId (Repository: DbGatewayContract["planRepository"])
: PlanUseCasesInterface["getPlansByPatientId"]  {
    
    return async (id_pac: number) => {
        console.log("getPlansByPatientId use case called.")
        return await Repository.getPlansByPatientId(id_pac)
    }
}
