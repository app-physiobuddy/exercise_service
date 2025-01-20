export default function createExerciseUseCase(Repository, mqtt) {
    return async (data) => {
        const result = await Repository.createExercise(data);
        if (result) {
            mqtt.publishNewExercise(1);
        }
        return result;
    };
}
