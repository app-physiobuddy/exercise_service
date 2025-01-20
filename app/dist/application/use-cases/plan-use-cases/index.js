import createPlanUseCase from "./createPlanUseCase.js";
import getPlansByPatientId from "./getPlansByPatientIdUseCase.js";
import onPlanMarkDayAsDoneUseCase from "./onPlanMarkDayAsDoneUseCase.js";
import getPlanByIdAndPatientIdUseCase from "./getPlanByIdAndPatientIdUseCase.js";
import getAllExercisesDoneUseCase from "./getAllExercisesDoneUseCase.js";
class PlanUseCases {
    constructor(Repository, Mqtt) {
        this.createPlan_use_case = createPlanUseCase(Repository, Mqtt);
        this.getPlansByPatientId_use_case = getPlansByPatientId(Repository);
        this.onPlanMarkDayAsDone_use_case = onPlanMarkDayAsDoneUseCase(Repository);
        this.getPlanByIdAndPatientId_use_case = getPlanByIdAndPatientIdUseCase(Repository);
        this.getAllExercisesDone_use_case = getAllExercisesDoneUseCase(Repository);
    }
    async createPlan(data) {
        return await this.createPlan_use_case(data);
    }
    async getPlansByPatientId(id_pac) {
        return await this.getPlansByPatientId_use_case(id_pac);
    }
    async onPlanMarkDayAsDone(data) {
        return await this.onPlanMarkDayAsDone_use_case(data);
    }
    async getPlanByIdAndPatientId(id_pac, id_plan) {
        return await this.getPlanByIdAndPatientId_use_case(id_pac, id_plan);
    }
    async getAllExercisesDone(id_pac) {
        return await this.getAllExercisesDone_use_case(id_pac);
    }
}
export default PlanUseCases;
