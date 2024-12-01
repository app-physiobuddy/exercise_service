import assertRole from "./helpers/assertRole.js";
import ErrorTypes from "../utils/errors/ErrorTypes.js";
class PlanControllers {
    //EDITAR
    constructor(planUseCases_) {
        this.planUseCases = planUseCases_;
    }
    async createPlan(req, res) {
        /*
        user.role
        user.physio_id

            id_plan : req.body.data.id_plan,
            id_physio : req.body.data.id_physio,
            id_pac: req.body.data.id_pac,
            date_start : req.body.data.date_start,
            date_end : req.body.data.date_end,
        */
        if (!req.body.data)
            throw ErrorTypes.UnauthorizedAccess("data is required");
        const user = req.body.user;
        if (!user.role || !user.physio_id)
            throw ErrorTypes.UnauthorizedAccess("user.role, user.physio_id is required");
        const data = {
            id_physio: req.body.data.id_physio,
            id_pac: req.body.data.id_pac,
            date_start: req.body.data.date_start,
            date_end: req.body.data.date_end,
            plan_exercises: req.body.data.plan_exercises
        };
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
        assertRole(user.role).isTherapist();
        const response = await this.planUseCases.createPlan(data);
        return res.status(201).json({
            success: response,
            message: response ? "New plan created" : "Error creating plan"
        });
    }
    async getPlansByPatientId(req, res) {
        /*
       user.role
       user.physio_id
       data.id_pac
       */
        if (!req.body.user)
            throw ErrorTypes.UnauthorizedAccess("user.role and user.physio_id is required");
        const user = req.body.user;
        const physio_id = Number(user.physio_id);
        if (!req.body.data)
            throw ErrorTypes.UnauthorizedAccess("data.id_pac is required");
        const id_pac = Number(req.body.data.id_pac);
        assertRole(user.role).isPatientOrTherapist();
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
        if (!req.body.user.role)
            throw ErrorTypes.UnauthorizedAccess("user.role is required");
        if (!req.body.user.id_pac)
            throw ErrorTypes.UnauthorizedAccess("user.id_pac is required");
        const user = req.body.user;
        if (!req.body.data)
            throw ErrorTypes.UnauthorizedAccess("data is required");
        const data = {
            id_plan: Number(req.body.data.id_plan),
            id_exercise: Number(req.body.data.id_exercise),
            id_pac: Number(user.id_pac),
            monday_done: req.body.data.monday_done || false,
            tuesday_done: req.body.data.tueday_done || false,
            wednesday_done: req.body.data.wednesday_done || false,
            thursday_done: req.body.data.thursday_done || false,
            friday_done: req.body.data.friday_done || false,
            saturday_done: req.body.data.saturday_done || false,
            sunday_done: req.body.data.sunday_done || false,
        };
        assertRole(user.role).isPatient();
        const response = await this.planUseCases.onPlanMarkDayAsDone(data);
        return res.status(200).json({
            success: response,
            message: response ? "Days completed exercises updated as done" : "Error marking days as done"
        });
    }
    async getPlanByIdAndPatientId(req, res) {
        /*
       user.role
       data.id_pac
       data.id_plan
       */
        if (!req.body.user.role)
            throw ErrorTypes.UnauthorizedAccess("user.role is required");
        const user = req.body.user;
        if (!req.body.data.id_pac || !req.body.data.id_plan)
            throw ErrorTypes.UnauthorizedAccess("data.id_pac & data.id_plan is required");
        const data = {
            id_pac: Number(req.body.data.id_pac),
            id_plan: Number(req.body.data.id_plan)
        };
        assertRole(user.role).isPatientOrTherapist();
        const response = await this.planUseCases.getPlanByIdAndPatientId(data.id_pac, data.id_plan);
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
