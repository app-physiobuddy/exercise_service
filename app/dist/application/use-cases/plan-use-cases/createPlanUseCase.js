export default function createPlanUseCase(Repository) {
    return async (data) => {
        return await Repository.createPlan(data);
    };
}
