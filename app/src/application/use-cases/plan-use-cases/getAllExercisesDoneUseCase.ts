//getAllExercisesDone

import { Exercise } from "../../entities/Entities";
import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { PlanUseCasesInterface } from "./index";
import ErrorTypes from "../../../utils/errors/ErrorTypes.js";

export type GetAllExercisesDoneResponseType = {
    exercise: Exercise,
    monday_done: boolean | null,
    tuesday_done: boolean | null,
    wednesday_done: boolean | null,
    thursday_done: boolean | null,
    friday_done: boolean | null,
    saturday_done: boolean | null,
    sunday_done: boolean | null,
    data_start: Date,
    data_end: Date
}

export default function getAllExercisesDone (Repository: DbGatewayContract["planRepository"])
: PlanUseCasesInterface["getAllExercisesDone"]  {
    
    return async (id_pac: number) => {

        let exercisesDone: GetAllExercisesDoneResponseType[] = [];

        const data = await Repository.getPlansByPatientId(id_pac)
        if (!data) throw ErrorTypes.NotFoundError("No exercises found");
        if (data.length === 0) throw ErrorTypes.NotFoundError("No exercises found");

        for (let i = 0; i < data.length; i++) {
            if(!data[i].plan_exercises) throw ErrorTypes.NotFoundError("No exercises found");
            if (data[i].plan_exercises!.length === 0) throw ErrorTypes.NotFoundError("No exercises found");
            for (let j = 0; j < data[i].plan_exercises!.length; j++) {
                if(!data[i].plan_exercises![j].exercise) throw ErrorTypes.NotFoundError("No exercises found");

                let done_monday = data[i].plan_exercises![j].monday_done && data[i].plan_exercises![j].monday ? true : !data[i].plan_exercises![j].monday_done && data[i].plan_exercises![j].monday ? false : null
                let done_tuesday = data[i].plan_exercises![j].tuesday_done && data[i].plan_exercises![j].tuesday ? true : !data[i].plan_exercises![j].tuesday_done && data[i].plan_exercises![j].tuesday ? false : null
                let done_wednesday = data[i].plan_exercises![j].wednesday_done && data[i].plan_exercises![j].wednesday ? true : !data[i].plan_exercises![j].wednesday_done && data[i].plan_exercises![j].wednesday ? false : null
                let done_thursday = data[i].plan_exercises![j].thursday_done && data[i].plan_exercises![j].thursday ? true : !data[i].plan_exercises![j].thursday_done && data[i].plan_exercises![j].thursday ? false : null
                let done_friday = data[i].plan_exercises![j].friday_done && data[i].plan_exercises![j].friday ? true : !data[i].plan_exercises![j].friday_done && data[i].plan_exercises![j].friday ? false : null
                let done_saturday = data[i].plan_exercises![j].saturday_done && data[i].plan_exercises![j].saturday ? true : !data[i].plan_exercises![j].saturday_done && data[i].plan_exercises![j].saturday ? false : null
                let done_sunday = data[i].plan_exercises![j].sunday_done && data[i].plan_exercises![j].sunday ? true : !data[i].plan_exercises![j].sunday_done && data[i].plan_exercises![j].sunday ? false : null

                exercisesDone.push({
                    exercise: data[i].plan_exercises![j].exercise,
                    monday_done: done_monday,
                    tuesday_done: done_tuesday,
                    wednesday_done: done_wednesday,
                    thursday_done: done_thursday,
                    friday_done: done_friday,
                    saturday_done: done_saturday,
                    sunday_done: done_sunday,
                    data_start: data[i].date_start,
                    data_end: data[i].date_end
                })

            }
        }

        return exercisesDone ? exercisesDone : undefined
    }
}
