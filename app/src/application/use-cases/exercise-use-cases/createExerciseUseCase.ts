import { Category, Exercise } from "../../entities/Category";
import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { ExerciceUseCasesInterface } from "../exercise-use-cases/index";

export default function createExerciseUseCase (Repository: DbGatewayContract<Category, Exercise>)
: ExerciceUseCasesInterface["createExercise"]  {
    
    return async (data: Exercise) => {
        return await Repository.createExercise(data)
    }
}
