import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { Category, Exercise } from "../../entities/Category";
import createExerciseUseCase from "./createExerciseUseCase";

export interface ExerciceUseCasesInterface {
    createExercise: DbGatewayContract<Category, Exercise>["createExercise"];

}


class CategoryUseCases implements ExerciceUseCasesInterface {
    private createExercise_use_case: ExerciceUseCasesInterface["createExercise"];

    constructor(
        Repository: DbGatewayContract<Category, Exercise>
    ){
        this.createExercise_use_case = createExerciseUseCase(Repository);


    }
    async createExercise(data: Exercise) {
        return await this.createExercise_use_case(data);
    }
    

}

export default CategoryUseCases