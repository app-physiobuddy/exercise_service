export default function onPlanMarkDayAsDone(Repository) {
    return async (data) => {
        return await Repository.updateSpecificPlanExercise(data);
    };
}
