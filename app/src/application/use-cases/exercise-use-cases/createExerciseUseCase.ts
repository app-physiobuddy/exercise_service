import { Exercise } from "../../entities/Entities";
import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { ExerciceUseCasesInterface } from "../exercise-use-cases/index";

export default function createExerciseUseCase (Repository: DbGatewayContract["exerciseRepository"])
: ExerciceUseCasesInterface["createExercise"]  {
    
    return async (data: Exercise) => {
        return await Repository.createExercise(data)
    }
}
