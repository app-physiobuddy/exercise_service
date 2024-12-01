import { ExerciceUseCasesInterface } from ".";
import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { Exercise } from "../../entities/Entities";

export default function updateExerciseUseCase (Repository: DbGatewayContract["exerciseRepository"])
: ExerciceUseCasesInterface["updateExercise"] {

    return async (exercise:Exercise) => {
        return await Repository.updateExercise(exercise)
    }
}