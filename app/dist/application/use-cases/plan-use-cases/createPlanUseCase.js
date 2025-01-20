export default function createPlanUseCase(Repository, mqtt) {
    return async (data) => {
        const result = await Repository.createPlan(data);
        if (result) {
            mqtt.publishNewPlan2Patient(data.id_pac);
        }
        return result;
    };
}
