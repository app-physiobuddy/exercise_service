import { Plan } from "../../entities/Entities";
import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { PlanUseCasesInterface } from "../plan-use-cases/index";
import MqttProvider from "../../../framework/providers/MqttProvider";

export default function createPlanUseCase (Repository: DbGatewayContract["planRepository"], mqtt: InstanceType<typeof MqttProvider>)
: PlanUseCasesInterface["createPlan"]  {
    
    return async (data: Plan) => {
        const result = await Repository.createPlan(data)
        if (result) {
            mqtt.publishNewPlan2Patient(data.id_pac)
        }
        return result
    }
}
