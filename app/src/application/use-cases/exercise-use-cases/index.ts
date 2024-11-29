import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { Category, Exercise } from "../../entities/Entities";
import createExerciseUseCase from "./createExerciseUseCase.js";


export interface ExerciceUseCasesInterface {
    createExercise: (exercise: Exercise) => Promise<boolean| undefined>;
  }


class ExerciseUseCases implements ExerciceUseCasesInterface {
    private createExercise_use_case: ExerciceUseCasesInterface["createExercise"];

    constructor(
        Repository: DbGatewayContract["exerciseRepository"]
    ){
        this.createExercise_use_case = createExerciseUseCase(Repository);


    }
    async createExercise(data: Exercise) {
        return await this.createExercise_use_case(data);
    }
    

}

export default ExerciseUseCases