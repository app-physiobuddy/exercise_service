import { ExerciceUseCasesInterface } from "../application/use-cases/exercise-use-cases";
import TypeHttp from "../framework/http.type"
import assertRole from "./helpers/assertRole.js";
import ErrorTypes from "../utils/errors/ErrorTypes.js";

import { Exercise } from "../application/entities/Entities";
class SubController{
    private exerciseUseCases: ExerciceUseCasesInterface


    constructor(exerciseUseCases: ExerciceUseCasesInterface) {
        this.exerciseUseCases = exerciseUseCases;

    }
    async createExercise(rawData:any) {

        let data = JSON.parse(rawData)

        const parsedData = {
            name : data.name,
            desc : data.desc,
            obs: data.obs,
            video_dir : data.video_dir,
            id_category : Number(data.id_category),
            id_company : Number(data.id_company), 
            id_created_by : Number(data.id_created_by),
            date_updated : new Date(),
        }




        const response = await this.exerciseUseCases.createExercise(parsedData);


    }
}

export default SubController