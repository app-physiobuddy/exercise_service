import { Exercise } from "../../entities/Entities";
import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { ExerciceUseCasesInterface } from "../exercise-use-cases/index";
import MqttProvider from "../../../framework/providers/MqttProvider";

export default function createExerciseUseCase (Repository: DbGatewayContract["exerciseRepository"],  mqtt: InstanceType<typeof MqttProvider>)
: ExerciceUseCasesInterface["createExercise"]  {
    
    return async (data: Exercise) => {
        const result =  await Repository.createExercise(data)
        if (result) {
            mqtt.publishNewExercise(1)
        }
        return result
    }
}
