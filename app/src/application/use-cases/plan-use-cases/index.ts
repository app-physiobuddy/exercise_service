import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { Category, Exercise, Plan, PatientDoesExercise } from "../../entities/Entities";
import createPlanUseCase from "./createPlanUseCase.js";
import getPlansByPatientId from "./getPlansByPatientIdUseCase.js";
import onPlanMarkDayAsDoneUseCase from "./onPlanMarkDayAsDoneUseCase.js";
import getPlanByIdAndPatientIdUseCase from "./getPlanByIdAndPatientIdUseCase.js";
import getAllExercisesDoneUseCase, { GetAllExercisesDoneResponseType } from "./getAllExercisesDoneUseCase.js";


export interface PlanUseCasesInterface {
    createPlan: (exercise: Plan) => Promise<boolean| undefined>;
    getPlansByPatientId: (id_pac: number) => Promise<Plan[] | undefined>
    onPlanMarkDayAsDone: (data: PatientDoesExercise) => Promise<boolean| undefined>
    getPlanByIdAndPatientId: (id_pac:number, id_plan:number) => Promise<Plan | undefined>
    getAllExercisesDone: (id_pac: number) => Promise<GetAllExercisesDoneResponseType[] | undefined>
  }


class PlanUseCases implements PlanUseCasesInterface {
    private createPlan_use_case: PlanUseCasesInterface["createPlan"];
    private getPlansByPatientId_use_case: PlanUseCasesInterface["getPlansByPatientId"];
    private onPlanMarkDayAsDone_use_case: PlanUseCasesInterface["onPlanMarkDayAsDone"];
    private getPlanByIdAndPatientId_use_case: PlanUseCasesInterface["getPlanByIdAndPatientId"];
    private getAllExercisesDone_use_case: PlanUseCasesInterface["getAllExercisesDone"];


    constructor(
        Repository: DbGatewayContract["planRepository"]
    ){
        this.createPlan_use_case = createPlanUseCase(Repository);
        this.getPlansByPatientId_use_case = getPlansByPatientId(Repository);
        this.onPlanMarkDayAsDone_use_case = onPlanMarkDayAsDoneUseCase(Repository);
        this.getPlanByIdAndPatientId_use_case = getPlanByIdAndPatientIdUseCase(Repository);
        this.getAllExercisesDone_use_case = getAllExercisesDoneUseCase(Repository);



    }
    async createPlan(data: Plan) {
        return await this.createPlan_use_case(data);
    }
    async getPlansByPatientId(id_pac: number) {
        return await this.getPlansByPatientId_use_case(id_pac);
    }
    async onPlanMarkDayAsDone(data: PatientDoesExercise) {
        return await this.onPlanMarkDayAsDone_use_case(data);
    }
    async getPlanByIdAndPatientId( id_pac: number, id_plan: number ) {
        return await this.getPlanByIdAndPatientId_use_case(id_pac, id_plan);
      }

    async getAllExercisesDone(id_pac: number) {
        return await this.getAllExercisesDone_use_case(id_pac);
      }

}

export default PlanUseCases