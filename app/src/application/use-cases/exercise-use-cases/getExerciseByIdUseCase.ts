import { Exercise } from "../../entities/Entities";
import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { ExerciceUseCasesInterface } from "../exercise-use-cases/index";

export default function getExerciseByIdUseCase (Repository: DbGatewayContract["exerciseRepository"])
: ExerciceUseCasesInterface["getExerciseById"]  {
    
    return async (id_comp: number, id_exercise: number) => {
        return await Repository.getExerciseById(id_comp, id_exercise)
    }
}
