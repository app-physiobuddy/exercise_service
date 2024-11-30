import { Exercise } from "../../entities/Entities";
import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { ExerciceUseCasesInterface } from "../exercise-use-cases/index";

export default function getExercisesByCompanyIdUseCase (Repository: DbGatewayContract["exerciseRepository"])
: ExerciceUseCasesInterface["getExercisesByCompanyId"]  {
    
    return async (id_comp: number) => {
        return await Repository.getExercisesByCompanyId(id_comp)
    }
}
