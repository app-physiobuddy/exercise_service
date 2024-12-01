import { ExerciceUseCasesInterface } from ".";
import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";

export default function deleteExerciseUseCase (Repository: DbGatewayContract["exerciseRepository"])
: ExerciceUseCasesInterface["deleteExercise"] {

    return async (id_comp:number, id_exercise:number) => {
        console.log(id_comp, id_exercise)
        return await Repository.deleteExercise(id_comp, id_exercise)
    }
}