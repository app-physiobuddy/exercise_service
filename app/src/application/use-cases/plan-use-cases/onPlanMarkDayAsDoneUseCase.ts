
import { Exercise, PatientDoesExercise } from "../../entities/Entities";
import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { PlanUseCasesInterface } from "../plan-use-cases/index";

export default function onPlanMarkDayAsDone (Repository: DbGatewayContract["planRepository"])
: PlanUseCasesInterface["onPlanMarkDayAsDone"]  {
    
    return async (data: PatientDoesExercise) => {
        return await Repository.updateSpecificPlanExercise(data)
    }
}
