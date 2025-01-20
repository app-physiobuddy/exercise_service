import assertRole from "./helpers/assertRole.js";
import ErrorTypes from "../utils/errors/ErrorTypes.js";
class PlanControllers {
    //EDITAR
    constructor(planUseCases_) {
        this.planUseCases = planUseCases_;
    }
    async createPlan(req, res) {
        console.log("createPlan EXERCISE SRVICE CALLED");
        if (!req.body.data)
            throw ErrorTypes.UnauthorizedAccess("data is required");
        const data = {
            id_physio: req.body.data.id_physio,
            id_pac: req.body.data.id_pac,
            date_start: req.body.data.date_start,
            date_end: req.body.data.date_end,
            plan_exercises: req.body.data.plan_exercises
        };
        console.log(data);
        for (let i = 0; i < data.plan_exercises.length; i++) {
            if (!data.plan_exercises[i].monday)
                data.plan_exercises[i].monday = false;
            if (!data.plan_exercises[i].tuesday)
                data.plan_exercises[i].tuesday = false;
            if (!data.plan_exercises[i].wednesday)
                data.plan_exercises[i].wednesday = false;
            if (!data.plan_exercises[i].thursday)
                data.plan_exercises[i].thursday = false;
            if (!data.plan_exercises[i].friday)
                data.plan_exercises[i].friday = false;
            if (!data.plan_exercises[i].saturday)
                data.plan_exercises[i].saturday = false;
            if (!data.plan_exercises[i].sunday)
                data.plan_exercises[i].sunday = false;
        }
        const response = await this.planUseCases.createPlan(data);
        return res.status(201).json({
            success: response,
            message: response ? "New plan created" : "Error creating plan"
        });
    }
    async getPlansByPatientId(req, res) {
        if (!req.params.patient_id)
            throw ErrorTypes.UnauthorizedAccess("patient_id is required");
        const id_pac = Number(req.params.patient_id);
        const response = await this.planUseCases.getPlansByPatientId(id_pac);
        return res.status(200).json({
            success: Boolean(response),
            message: response ? response : "Error getting plans"
        });
    }
    async onPlanMarkDayAsDone(req, res) {
        /*
        "/patients/:patients_id/plans/:plans_id/exercises/:exercises_id/day/:day/done"
        user.role
        user.id_pac
        data.id_plan
        data.id_exercise
        data.monday_done
        data.tueday_done
        data.wednesday_done
        data.thursday_done
        data.friday_done
        data.saturday_done
        data.sunday_done
        */
        if (!req.params.patient_id)
            throw ErrorTypes.UnauthorizedAccess("patient_id is required");
        if (!req.params.plan_id)
            throw ErrorTypes.UnauthorizedAccess("plan_id is required");
        if (!req.params.exercise_id)
            throw ErrorTypes.UnauthorizedAccess("exercise_id is required");
        const { patient_id, plan_id, exercise_id, day } = req.params;
        const data = {
            id_plan: Number(plan_id),
            id_exercise: Number(exercise_id),
            id_pac: Number(patient_id),
            monday_done: req.body.data.monday_done, // || false,
            tuesday_done: req.body.data.tuesday_done, // || false,
            wednesday_done: req.body.data.wednesday_done, // || false,
            thursday_done: req.body.data.thursday_done, // || false,
            friday_done: req.body.data.friday_done, // || false,
            saturday_done: req.body.data.saturday_done, //|| false,
            sunday_done: req.body.data.sunday_done //|| false,
        };
        const response = await this.planUseCases.onPlanMarkDayAsDone(data);
        return res.status(200).json({
            success: response,
            message: response ? "Days completed exercises updated as done" : "Error marking days as done"
        });
    }
    async getPlanByIdAndPatientId(req, res) {
        if (!req.params.patient_id || !req.params.plan_id)
            throw ErrorTypes.UnauthorizedAccess("patient_id & plan_id is required");
        const { patient_id, plan_id } = req.params;
        const response = await this.planUseCases.getPlanByIdAndPatientId(Number(patient_id), Number(plan_id));
        return res.status(200).json({
            success: Boolean(response),
            message: response ? response : "Error getting exercise"
        });
    }
    async getAllExercisesDone(req, res) {
        /*
        user.role
        data.id_pac
        */
        if (!req.body.user.role)
            throw ErrorTypes.UnauthorizedAccess("user.role is required");
        const user = req.body.user;
        if (!req.body.data.id_pac)
            throw ErrorTypes.UnauthorizedAccess("data.id_pac is required");
        const data = {
            id_pac: Number(req.body.data.id_pac),
        };
        assertRole(user.role).isPatientOrTherapist();
        const response = await this.planUseCases.getAllExercisesDone(data.id_pac);
        return res.status(200).json({
            success: Boolean(response),
            message: response ? response : "Error getting exercises done"
        });
    }
}
export default PlanControllers;
